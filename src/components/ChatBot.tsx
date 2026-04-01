import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, MessageCircle, X } from "lucide-react";

const N8N_WEBHOOK = "https://n8n.srv1062687.hstgr.cloud/webhook/61842f10-db21-4447-8bee-24e8615b2449";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
  ts: number;
}

const quickQuestions = [
  "Tell me about Ashikur's experience",
  "What are his top skills?",
  "Suggest meeting slots",
  "What projects has he built?",
];

function getSessionId() {
  let id = localStorage.getItem("ashik_session_id");
  if (!id) {
    id = "sess_" + Math.random().toString(36).slice(2, 11) + "_" + Date.now();
    localStorage.setItem("ashik_session_id", id);
  }
  return id;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(getSessionId());

  const chatKey = "ashik_chat_" + sessionId.current;
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(chatKey) || "[]");
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    localStorage.setItem(chatKey, JSON.stringify(messages));
  }, [messages, chatKey]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ChatMessage = { role: "user", text: text.trim(), ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        body: {
          user_email: email || "visitor@portfolio.com",
          user_question: text.trim(),
          session_id: sessionId.current,
        },
      };

      const resp = await fetch(N8N_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      let botText = "";

      if (Array.isArray(data) && data[0]?.json?.output) {
        botText = data[0].json.output;
      } else if (data?.output) {
        botText = data.output;
      } else if (data?.message_clean) {
        botText = data.message_clean;
      } else if (typeof data === "string") {
        botText = data;
      } else {
        botText = JSON.stringify(data);
      }

      botText = botText.replace(/\\n/g, "\n");

      const botMsg: ChatMessage = { role: "bot", text: botText, ts: Date.now() };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Sorry, I couldn't reach the AI agent. Please try again.", ts: Date.now() },
      ]);
    } finally {
      setLoading(false);
    }
  }, [email, loading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-105 transition-transform"
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] glass rounded-2xl overflow-hidden glow-cyan shadow-2xl shadow-background/60 flex flex-col"
            style={{ maxHeight: "min(520px, calc(100vh - 140px))" }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 p-4 border-b border-border shrink-0">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles size={18} className="text-primary" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Ashikur's AI Assistant</p>
                <p className="text-xs text-muted-foreground">Online — Ask me anything</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <Bot size={28} className="text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Ask about my experience, skills, or request a meeting!
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-2"}`}>
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={14} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={msg.role === "bot" ? { __html: msg.text } : undefined}>
                      {msg.role === "user" ? msg.text : undefined}
                    </div>
                    <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60 text-right" : "text-muted-foreground"}`}>
                      {formatTime(msg.ts)}
                    </p>
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={14} className="text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-primary" />
                  </div>
                  <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="typing-dots">
                      <span /><span /><span />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Email + Input */}
            <div className="border-t border-border p-3 space-y-2 shrink-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email (optional — for meeting requests)"
                className="w-full text-xs px-3 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your question..."
                  className="flex-1 px-3 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={loading || !input.trim()}
                  className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

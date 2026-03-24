<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>AI Assistant</title>
  <meta name="description" content="Md Ashikur Rahman — Software Developer & Fintech Specialist. Backend, APIs, Laravel, PHP, Java, Spring Boot, AI-assisted development, cloud, e-commerce automation." />

  <!-- Inter font + Tailwind CDN (JIT) -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>

  <style>
    /* small theme tweak using Tailwind CSS variables */
    :root { --accent:#0ea5e9; --accent-2:#2563eb; }
    html,body { font-family: 'Inter', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }
    /* typing dots */
    .typing-dots > span {
      display:inline-block;
      width:6px;height:6px;margin:0 2px;border-radius:999px;background:#9aa6b2;opacity:0;
      animation: blink 1s infinite;
    }
    .typing-dots > span:nth-child(1){ animation-delay: 0s; }
    .typing-dots > span:nth-child(2){ animation-delay: .15s; }
    .typing-dots > span:nth-child(3){ animation-delay: .3s; }
    @keyframes blink {
      0%{opacity:0.15; transform: translateY(0);}
      50%{opacity:1; transform: translateY(-4px);}
      100%{opacity:0.15; transform: translateY(0);}
    }
    /* small scrollbar for chat */
    #chatBox::-webkit-scrollbar { width:8px; }
    #chatBox::-webkit-scrollbar-thumb { background: rgba(15,23,42,0.12); border-radius:999px; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900">

  <div class="max-w-6xl mx-auto p-6">
   
    <main class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
    

      <!-- Right: AI Assistant Card -->
      <aside class="space-y-4">
        <div class="bg-white rounded-2xl p-4 shadow flex flex-col">
          <div class="flex items-start gap-3">
            <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <svg class="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h4 class="text-sm font-semibold">Chat With My Autonomous AI Assistant</h4>
              <p class="text-xs text-slate-500 mt-1">Live demo — integrated with OpenAI, RAG knowledge retrieval & n8n automation (calendar, email, Slack, Telegram).</p>
            </div>
          </div>

          <!-- chat container -->
          <div id="chatBox" class="mt-4 h-64 overflow-auto p-3 rounded-lg bg-gradient-to-b from-white to-slate-50 border border-slate-100"></div>

          
          <!-- controls -->
          <div class="mt-3 flex gap-2 items-center">
            <input id="userInput" placeholder="Type your question..." class="flex-1 p-2 rounded-lg border border-slate-200 text-sm" />
            <button id="sendBtn" class="px-4 py-2 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700">Send</button>
          </div>

          <div class="mt-2 flex gap-2 flex-wrap">
            <button onclick="quickMsg('What will I learn?')" class="px-3 py-1 bg-slate-100 rounded">📘 What will I learn?</button>
            <button onclick="quickMsg('How can I earn?')" class="px-3 py-1 bg-slate-100 rounded">💰 How can I earn?</button>
            <button onclick="quickMsg('Is this beginner friendly?')" class="px-3 py-1 bg-slate-100 rounded">🧠 Beginner?</button>
            <button onclick="quickMsg('Book a call')" class="px-3 py-1 bg-sky-100 rounded">📅 Book Call</button>
          </div>
          <!-- email input -->
          <input id="userInputEmail" type="email" placeholder="Please provide your email (optional)" class="mt-3 p-2 rounded-md border border-slate-200 text-sm" />


          <!-- quick helper -->
          <div class="mt-3 text-xs text-slate-400">
            Tip: Ask about my experience, request a meeting, or say "suggest slots" to get availability.
          </div>
        </div>

      
      </aside>
    </main>

    <footer class="text-center text-xs text-slate-400 mt-8">
      © 2025 Md Ashikur Rahman • London • <a class="text-sky-600" href="https://www.linkedin.com/in/ashikurrahmanshuvo/" target="_blank">LinkedIn</a>
    </footer>
  </div>

<script>
// ---------------------------
// Session & Chat Persistence
// ---------------------------
let sessionId = localStorage.getItem("ashik_session_id");
if (!sessionId) {
  sessionId = "sess_" + Math.random().toString(36).slice(2,11) + "_" + Date.now();
  localStorage.setItem("ashik_session_id", sessionId);
  console.log("New session:", sessionId);
} else {
  console.log("Existing session:", sessionId);
}

// load chat history for this session (keyed by session)
const CHAT_KEY = "ashik_chat_" + sessionId;
let chatHistory = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]");

// DOM refs
const chatBox = document.getElementById("chatBox");
const inputEl = document.getElementById("userInput");
const emailEl = document.getElementById("userInputEmail");
const sendBtn = document.getElementById("sendBtn");

function quickMsg(text){
  inputEl.value = text;
  sendMessage();
}

// Utility: format timestamp
function nowLabel() {
  const d = new Date();
  return d.toLocaleString(undefined, { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });
}

// render chat history to DOM
function renderHistory() {
  chatBox.innerHTML = "";
  chatHistory.forEach(item => {
    if (item.role === 'user') renderUserBubble(item.text, item.ts);
    else renderBotBubble(item.text, item.ts);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}
renderHistory();

// helpers to push and persist
function pushHistory(role, text) {
  const entry = { role, text, ts: Date.now() };
  chatHistory.push(entry);
  localStorage.setItem(CHAT_KEY, JSON.stringify(chatHistory));
  return entry;
}

// append user bubble
function renderUserBubble(text, ts) {
  const t = ts ? new Date(ts) : new Date();
  const html = `
    <div class="flex justify-end">
      <div class="max-w-[85%] break-words bg-sky-50 text-sky-900 px-4 py-2 rounded-2xl rounded-br-md shadow-sm mt-2">
        <div class="text-sm">${escapeHtml(text)}</div>
        <div class="text-[11px] text-slate-400 mt-1 text-right">${new Date(t).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</div>
      </div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', html);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// append bot bubble (html allowed because backend returns message_clean with <br/>)
function renderBotBubble(htmlText, ts) {
  const t = ts ? new Date(ts) : new Date();
  const html = `
    <div class="flex items-start gap-3 mt-3">
      <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">AR</div>
      <div class="max-w-[85%] break-words bg-slate-100 text-slate-800 px-4 py-2 rounded-2xl rounded-bl-md shadow-sm">
        <div class="text-sm bot-content">${htmlText}</div>
        <div class="text-[11px] text-slate-400 mt-2">${new Date(t).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'})}</div>
      </div>
    </div>`;
  chatBox.insertAdjacentHTML('beforeend', html);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// escape user text to prevent accidental HTML injection
function escapeHtml(unsafe) {
  return unsafe
       .replaceAll("&","&amp;")
       .replaceAll("<","&lt;")
       .replaceAll(">","&gt;")
       .replaceAll('"',"&quot;")
       .replaceAll("'", "&#039;");
}

// typing indicator
let typingNode = null;
function showTyping() {
  if (typingNode) return;
  typingNode = document.createElement("div");
  typingNode.className = "flex items-start gap-3 mt-3";
  typingNode.innerHTML = `
    <div class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-semibold">AR</div>
    <div class="max-w-[60%] px-4 py-2 rounded-2xl rounded-bl-md bg-slate-100 shadow-sm">
      <div class="typing-dots inline-block">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  chatBox.appendChild(typingNode);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function hideTyping() {
  if (!typingNode) return;
  typingNode.remove();
  typingNode = null;
}

// -----------------------------
// Send message to submit.php
// -----------------------------
sendBtn.addEventListener('click', sendMessage);
inputEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });

let inflight = false;
function sendMessage() {
  const text = inputEl.value.trim();
  if (!text) return;

  // append user locally & persist
  const userEntry = pushHistory('user', text);
  renderUserBubble(text, userEntry.ts);
  inputEl.value = '';

  // ensure email fallback
  const email = (emailEl.value || '').trim() || 'shuvo133@gmail.com';

  // show typing
  showTyping();

  // payload for n8n webhook
  const payload = {
    user_email: email,
    user_question: text,
    session_id: sessionId,
    client_meta: { page: window.location.href, ts: new Date().toISOString() }
  };

  // POST (AJAX fetch)
  inflight = true;
  fetch('submit.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(async resp => {
    hideTyping();
    inflight = false;
    // parse JSON safely
    let data;
    try { data = await resp.json(); } catch(e) { data = { message: resp.statusText || 'No response' }; }

    // expected shapes:
    // { message_clean: "<p>...</p>" } or { message: "..."} or { raw: ... }
    let botHtml = '';
    if (data.message_clean) {
      // message_clean is already HTML-friendly (we trust server sanitized)
      botHtml = data.message_clean;
    } else if (data.message) {
      botHtml = escapeHtml(String(data.message)).replaceAll('\n','<br>');
    } else if (data.raw) {
      botHtml = escapeHtml(JSON.stringify(data.raw, null, 2)).replaceAll('\n','<br>');
    } else {
      botHtml = 'No response from AI agent.';
    }

    // push to history and render
    const botEntry = pushHistory('bot', botHtml);
    renderBotBubble(botHtml, botEntry.ts);

    // if booking object exists, show structured info (optional)
    if (data.booking) {
      const b = data.booking;
      const bookingHtml = `<div class="mt-2 text-xs bg-sky-50 text-sky-700 p-2 rounded">${escapeHtml(b.summary || 'Meeting')}<br/>Start: ${escapeHtml(b.start || '-')}</div>`;
      pushHistory('bot', bookingHtml);
      renderBotBubble(bookingHtml, Date.now());
    }

  })
  .catch(err => {
    hideTyping();
    inflight = false;
    const errText = '❌ Error contacting AI Agent.';
    const botEntry = pushHistory('bot', escapeHtml(errText));
    renderBotBubble(escapeHtml(errText), botEntry.ts);
    console.error('send error', err);
  });
}

// allow clearing history for dev (press ALT+R)
window.addEventListener('keydown', (e) => {
  if (e.altKey && (e.key === 'r' || e.key === 'R')) {
    if (confirm('Clear chat history for this session?')) {
      localStorage.removeItem(CHAT_KEY);
      chatHistory = [];
      renderHistory();
    }
  }
});
</script>

</body>
</html>

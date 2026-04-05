import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Monitor, GitBranch, Github, Server, Globe, CheckCircle,
  ArrowRight, Bot, Database, Brain, Search, MessageSquare,
  FileText, Cpu, Zap, Shield, RefreshCw, ZoomIn, X
} from "lucide-react";
import ragWorkflow1 from "@/assets/rag-workflow-1.png";
import ragWorkflow2 from "@/assets/rag-workflow-2.png";

/* ─── CI/CD Pipeline Steps ─── */
const cicdSteps = [
  {
    id: 1,
    icon: Monitor,
    label: "Local Dev",
    color: "from-blue-500 to-cyan-500",
    border: "border-blue-500/40",
    detail: "Code development on local machine with hot-reload, linting, and unit tests using VS Code, Docker Compose for local services.",
  },
  {
    id: 2,
    icon: GitBranch,
    label: "Git Push",
    color: "from-cyan-500 to-teal-500",
    border: "border-cyan-500/40",
    detail: "Changes committed and pushed to feature branch. Pre-commit hooks run linting, formatting, and type checks automatically.",
  },
  {
    id: 3,
    icon: Github,
    label: "GitHub Actions",
    color: "from-teal-500 to-emerald-500",
    border: "border-teal-500/40",
    detail: "CI pipeline triggers: runs unit tests, integration tests, builds Docker image, and pushes to container registry.",
  },
  {
    id: 4,
    icon: Shield,
    label: "Quality Gate",
    color: "from-emerald-500 to-green-500",
    border: "border-emerald-500/40",
    detail: "Security scanning, code quality analysis, and test coverage validation. Pipeline fails if thresholds aren't met.",
  },
  {
    id: 5,
    icon: Server,
    label: "VPS Deploy",
    color: "from-green-500 to-lime-500",
    border: "border-green-500/40",
    detail: "Docker container deployed to VPS via SSH. Blue-green deployment ensures zero-downtime updates with automatic rollback.",
  },
  {
    id: 6,
    icon: Globe,
    label: "Live Site",
    color: "from-lime-500 to-yellow-500",
    border: "border-lime-500/40",
    detail: "Production site live with SSL, CDN caching, and health monitoring. Uptime checks and alerts configured.",
  },
];

/* ─── RAG Chatbot Steps ─── */
const ragSteps = [
  {
    id: 1,
    icon: MessageSquare,
    label: "User Query",
    color: "from-violet-500 to-purple-500",
    border: "border-violet-500/40",
    detail: "Visitor types a question in the AI chatbot widget. The query is sent to the n8n webhook along with session context.",
  },
  {
    id: 2,
    icon: Cpu,
    label: "n8n Orchestrator",
    color: "from-purple-500 to-fuchsia-500",
    border: "border-purple-500/40",
    detail: "n8n workflow receives the request, manages conversation memory, and orchestrates the RAG pipeline steps.",
  },
  {
    id: 3,
    icon: FileText,
    label: "Document Retrieval",
    color: "from-fuchsia-500 to-pink-500",
    border: "border-fuchsia-500/40",
    detail: "Relevant documents (CV, portfolio, experience data) are fetched from the vector store using semantic similarity search.",
  },
  {
    id: 4,
    icon: Search,
    label: "Vector Search",
    color: "from-pink-500 to-rose-500",
    border: "border-pink-500/40",
    detail: "Query is embedded and matched against document embeddings in the vector database to find the most relevant context chunks.",
  },
  {
    id: 5,
    icon: Brain,
    label: "LLM Processing",
    color: "from-rose-500 to-orange-500",
    border: "border-rose-500/40",
    detail: "Retrieved context + user query are sent to GPT model. The LLM generates a contextual, accurate response grounded in real data.",
  },
  {
    id: 6,
    icon: Bot,
    label: "AI Response",
    color: "from-orange-500 to-amber-500",
    border: "border-orange-500/40",
    detail: "Formatted response streamed back to the chatbot UI. Conversation history is stored for context continuity.",
  },
];

/* ─── Animated connector arrow ─── */
const Connector = ({ index, total, active }: { index: number; total: number; active: boolean }) => {
  if (index >= total - 1) return null;
  return (
    <div className="hidden md:flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0.3, scale: 0.8 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.8 }}
        transition={{ duration: 0.4 }}
      >
        <ArrowRight size={20} className={active ? "text-primary" : "text-muted-foreground/30"} />
      </motion.div>
    </div>
  );
};

/* ─── Step Node ─── */
const StepNode = ({
  step,
  index,
  activeStep,
  onClick,
}: {
  step: typeof cicdSteps[0];
  index: number;
  activeStep: number;
  onClick: () => void;
}) => {
  const isActive = activeStep === index;
  const isPast = activeStep > index;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all cursor-pointer min-w-[100px] ${
        isActive
          ? `${step.border} bg-gradient-to-br ${step.color} shadow-lg`
          : isPast
          ? "border-primary/20 bg-primary/5"
          : "border-border bg-card/50 hover:border-muted-foreground/30"
      }`}
    >
      {isPast && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center"
        >
          <CheckCircle size={12} className="text-white" />
        </motion.div>
      )}
      <step.icon size={22} className={isActive ? "text-white" : isPast ? "text-primary" : "text-muted-foreground"} />
      <span className={`text-xs font-semibold text-center leading-tight ${isActive ? "text-white" : isPast ? "text-foreground" : "text-muted-foreground"}`}>
        {step.label}
      </span>
    </motion.button>
  );
};

/* ─── Flow Diagram ─── */
const FlowDiagram = ({
  steps,
  autoPlay = true,
}: {
  steps: typeof cicdSteps;
  autoPlay?: boolean;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  // Auto-advance using useEffect
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
  };

  // Start/stop auto-play
  React.useEffect(() => {
    if (isPlaying && isInView) {
      startInterval();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, isInView]);

  const handleClick = (index: number) => {
    setActiveStep(index);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleReplay = () => {
    setActiveStep(0);
    setIsPlaying(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2500);
  };

  return (
    <div ref={ref} className="space-y-6">
      {/* Steps Row */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-1">
        {steps.map((step, i) => (
          <div key={step.id} className="contents">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <StepNode step={step} index={i} activeStep={activeStep} onClick={() => handleClick(i)} />
            </motion.div>
            <Connector index={i} total={steps.length} active={activeStep > i} />
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`glass rounded-xl p-5 border ${steps[activeStep].border}`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${steps[activeStep].color} shrink-0`}>
              {(() => {
                const Icon = steps[activeStep].icon;
                return <Icon size={24} className="text-white" />;
              })()}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">
                  Step {activeStep + 1}: {steps[activeStep].label}
                </h4>
                <button
                  onClick={handleReplay}
                  className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <RefreshCw size={12} /> Replay
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {steps[activeStep].detail}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1.5 mt-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= activeStep ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Section ─── */
const WorkflowSection = () => {
  const [activeTab, setActiveTab] = useState<"cicd" | "rag">("cicd");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const tabs = [
    { id: "cicd" as const, label: "CI/CD Pipeline", icon: Zap, desc: "Automated deployment workflow" },
    { id: "rag" as const, label: "RAG AI Chatbot", icon: Brain, desc: "Retrieval-augmented generation" },
  ];

  return (
    <section id="workflows" className="section-padding" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Architecture</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Click on each step to explore the workflow, or let it auto-play to see the full pipeline in action.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex gap-3"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "glass text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <tab.icon size={16} />
              <div className="text-left">
                <p>{tab.label}</p>
                <p className={`text-[10px] ${activeTab === tab.id ? "text-primary-foreground/70" : "opacity-60"}`}>
                  {tab.desc}
                </p>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <AnimatePresence mode="wait">
            {activeTab === "cicd" ? (
              <motion.div key="cicd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FlowDiagram steps={cicdSteps} />
              </motion.div>
            ) : (
              <motion.div key="rag" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FlowDiagram steps={ragSteps} />
                {/* RAG Architecture Screenshots */}
                <RagArchitectureGallery />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── RAG Architecture Gallery ─── */
const RagArchitectureGallery = () => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  const images = [
    {
      src: ragWorkflow1,
      title: "RAG Document Pipeline",
      desc: "Documents from Google Drive are extracted, chunked via Recursive Text Splitter, embedded with OpenAI, and stored in a Vector Store for semantic retrieval.",
    },
    {
      src: ragWorkflow2,
      title: "AI Agent Orchestration",
      desc: "Webhook receives queries → AI Agent uses OpenAI Chat Model with Simple Memory, RAG retrieval, Google Calendar, Gmail, Telegram & Slack integrations.",
    },
  ];

  return (
    <>
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-primary" />
          <h4 className="text-sm font-semibold text-foreground">n8n Workflow Architecture</h4>
          <span className="text-[10px] text-muted-foreground ml-1">(click to enlarge)</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => setLightbox(img.src)}
              whileHover={{ scale: 1.02 }}
              className="group relative glass rounded-xl overflow-hidden border border-border hover:border-primary/40 transition-all text-left"
            >
              <div className="relative overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-48 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-card/70 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={14} className="text-primary" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-foreground">{img.title}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{img.desc}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <X size={16} className="text-foreground" />
              </button>
              <img src={lightbox} alt="Workflow architecture" className="w-full rounded-xl border border-border shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkflowSection;
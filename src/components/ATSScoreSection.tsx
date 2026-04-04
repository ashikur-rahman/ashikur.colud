import { useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FileText, Target, BarChart3, CheckCircle, XCircle, AlertTriangle, Sparkles, RotateCcw } from "lucide-react";

/* ─── Profile Data (based on Ashikur's CV) ─── */
const PROFILE = {
  title: "Senior Software Engineer / Backend Engineer",
  yearsExperience: 12,
  skills: [
    "java", "spring boot", "spring", "python", "php", "laravel", "codeigniter",
    "javascript", "typescript", "node.js", "nodejs", "node", "express", "react",
    "sql", "mysql", "postgresql", "postgres", "mongodb", "dynamodb", "redis",
    "aws", "ec2", "s3", "lambda", "rds", "cloudwatch", "ecs", "fargate",
    "docker", "kubernetes", "k8s", "terraform", "ansible",
    "ci/cd", "github actions", "jenkins", "gitlab",
    "rest", "restful", "api", "microservices", "graphql",
    "git", "linux", "bash", "shell",
    "agile", "scrum", "jira", "confluence",
    "openai", "gpt", "ai", "machine learning", "ml", "langchain", "rag",
    "n8n", "automation", "workflow",
    "unit testing", "integration testing", "tdd", "junit", "pytest",
    "system design", "architecture", "scalable", "high availability",
    "oauth", "jwt", "authentication", "security",
    "html", "css", "bootstrap", "tailwind",
    "ajax", "json", "xml", "soap",
    "power bi", "data analysis",
    "oop", "design patterns", "solid", "clean code",
    "payment", "stripe", "fintech",
  ],
  certifications: [
    "aws", "cloud", "devops", "python", "machine learning",
  ],
  education: ["bsc", "computer science", "engineering", "degree", "university"],
  softSkills: [
    "leadership", "team", "communication", "problem solving", "mentoring",
    "collaboration", "stakeholder", "cross-functional", "documentation",
  ],
  locations: ["london", "uk", "united kingdom", "remote", "hybrid"],
};

/* ─── Scoring Engine ─── */
interface ScoreResult {
  overall: number;
  categories: {
    name: string;
    score: number;
    maxScore: number;
    matched: string[];
    missing: string[];
    icon: typeof Target;
  }[];
  summary: string;
  recommendation: "strong" | "good" | "moderate" | "low";
}

function analyzeJobDescription(text: string): ScoreResult {
  const lower = text.toLowerCase();
  const words = lower.split(/[\s,;./()\-–—]+/).filter(Boolean);

  // Build bigrams/trigrams for multi-word matching
  const phrases: string[] = [];
  for (let i = 0; i < words.length; i++) {
    phrases.push(words[i]);
    if (i + 1 < words.length) phrases.push(`${words[i]} ${words[i + 1]}`);
    if (i + 2 < words.length) phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  const phraseSet = new Set(phrases);

  // Technical skills (40% weight)
  const techMatched: string[] = [];
  const techMissing: string[] = [];
  const jobKeywords = extractKeywords(lower);

  for (const kw of jobKeywords) {
    if (PROFILE.skills.some((s) => s.includes(kw) || kw.includes(s))) {
      techMatched.push(kw);
    } else {
      techMissing.push(kw);
    }
  }
  const techScore = jobKeywords.length > 0
    ? Math.min(100, Math.round((techMatched.length / jobKeywords.length) * 100))
    : 0;

  // Experience match (25% weight)
  const expMatched: string[] = [];
  const expMissing: string[] = [];
  const yearsMatch = lower.match(/(\d+)\+?\s*(?:years?|yrs?)/);
  const requiredYears = yearsMatch ? parseInt(yearsMatch[1]) : 0;
  if (requiredYears > 0) {
    if (PROFILE.yearsExperience >= requiredYears) {
      expMatched.push(`${PROFILE.yearsExperience}+ years (meets ${requiredYears}+ requirement)`);
    } else {
      expMissing.push(`${requiredYears}+ years required (have ${PROFILE.yearsExperience})`);
    }
  }
  // Check for seniority keywords
  const seniorityTerms = ["senior", "lead", "principal", "staff", "architect", "manager"];
  for (const term of seniorityTerms) {
    if (lower.includes(term)) {
      if (["senior", "lead", "architect"].includes(term)) {
        expMatched.push(`${term} level experience`);
      } else {
        expMissing.push(`${term} level mentioned`);
      }
    }
  }
  const expScore = expMatched.length + expMissing.length > 0
    ? Math.round((expMatched.length / (expMatched.length + expMissing.length)) * 100)
    : 80;

  // Soft skills (15% weight)
  const softMatched: string[] = [];
  const softMissing: string[] = [];
  const softTermsInJob = PROFILE.softSkills.filter((s) => lower.includes(s));
  const allSoftInJob = extractSoftSkills(lower);
  for (const s of allSoftInJob) {
    if (PROFILE.softSkills.some((ps) => ps.includes(s) || s.includes(ps))) {
      softMatched.push(s);
    } else {
      softMissing.push(s);
    }
  }
  const softScore = allSoftInJob.length > 0
    ? Math.min(100, Math.round((softMatched.length / allSoftInJob.length) * 100))
    : 75;

  // Location/logistics (10% weight)
  const locMatched: string[] = [];
  const locMissing: string[] = [];
  for (const loc of PROFILE.locations) {
    if (lower.includes(loc)) locMatched.push(loc);
  }
  if (lower.includes("visa") || lower.includes("sponsorship")) {
    locMissing.push("visa/sponsorship requirements");
  }
  const locScore = locMatched.length > 0 ? 100 : lower.includes("location") ? 50 : 70;

  // Education/certs (10% weight)
  const eduMatched: string[] = [];
  const eduMissing: string[] = [];
  for (const e of PROFILE.education) {
    if (lower.includes(e)) eduMatched.push(e);
  }
  for (const c of PROFILE.certifications) {
    if (lower.includes(c)) eduMatched.push(`${c} certification`);
  }
  if (lower.includes("certification") && eduMatched.filter((e) => e.includes("certification")).length === 0) {
    eduMissing.push("specific certification may be required");
  }
  const eduScore = eduMatched.length > 0 ? Math.min(100, 60 + eduMatched.length * 10) : 60;

  // Weighted overall
  const overall = Math.round(
    techScore * 0.40 + expScore * 0.25 + softScore * 0.15 + locScore * 0.10 + eduScore * 0.10
  );

  const recommendation: ScoreResult["recommendation"] =
    overall >= 80 ? "strong" : overall >= 65 ? "good" : overall >= 50 ? "moderate" : "low";

  const summaries = {
    strong: "Excellent match! This role aligns very well with Ashikur's experience and technical expertise. A strong candidate for this position.",
    good: "Good match. Most key requirements are met. A few areas could be highlighted or addressed in a tailored cover letter.",
    moderate: "Moderate match. There are some gaps, but transferable skills and experience may bridge them. Consider a targeted application.",
    low: "Limited match with current profile. Significant upskilling or experience gaps exist for this particular role.",
  };

  return {
    overall,
    recommendation,
    summary: summaries[recommendation],
    categories: [
      { name: "Technical Skills", score: techScore, maxScore: 40, matched: techMatched, missing: techMissing, icon: Target },
      { name: "Experience Level", score: expScore, maxScore: 25, matched: expMatched, missing: expMissing, icon: BarChart3 },
      { name: "Soft Skills", score: softScore, maxScore: 15, matched: softMatched, missing: softMissing, icon: Sparkles },
      { name: "Location Fit", score: locScore, maxScore: 10, matched: locMatched, missing: locMissing, icon: Target },
      { name: "Education & Certs", score: eduScore, maxScore: 10, matched: eduMatched, missing: eduMissing, icon: FileText },
    ],
  };
}

function extractKeywords(text: string): string[] {
  const techTerms = [
    "java", "spring boot", "spring", "python", "django", "flask", "fastapi",
    "php", "laravel", "codeigniter", "symfony",
    "javascript", "typescript", "react", "angular", "vue", "next.js", "nextjs",
    "node.js", "nodejs", "express", "nestjs",
    "c#", ".net", "dotnet", "c++", "go", "golang", "rust", "ruby", "rails",
    "sql", "mysql", "postgresql", "postgres", "mongodb", "dynamodb", "redis",
    "elasticsearch", "kafka", "rabbitmq",
    "aws", "azure", "gcp", "google cloud", "ec2", "s3", "lambda", "ecs",
    "docker", "kubernetes", "k8s", "terraform", "ansible", "helm",
    "ci/cd", "github actions", "jenkins", "gitlab", "circleci",
    "rest", "restful", "api", "graphql", "grpc", "microservices",
    "git", "linux", "bash",
    "agile", "scrum", "jira",
    "openai", "gpt", "ai", "machine learning", "ml", "deep learning",
    "langchain", "rag", "llm", "nlp",
    "unit testing", "tdd", "junit", "pytest", "jest",
    "oauth", "jwt", "security", "authentication",
    "html", "css", "tailwind", "bootstrap",
    "power bi", "tableau", "data analysis",
    "stripe", "payment", "fintech",
    "system design", "architecture", "scalable",
    "serverless", "sqs", "sns", "cloudformation",
    "nginx", "apache", "load balancer",
  ];

  return [...new Set(techTerms.filter((term) => text.includes(term)))];
}

function extractSoftSkills(text: string): string[] {
  const terms = [
    "leadership", "team", "communication", "problem solving", "mentoring",
    "collaboration", "stakeholder", "cross-functional", "documentation",
    "analytical", "proactive", "self-motivated", "detail-oriented",
    "time management", "negotiation", "presentation",
  ];
  return terms.filter((t) => text.includes(t));
}

/* ─── Score Ring ─── */
const ScoreRing = ({ score, size = 160 }: { score: number; size?: number }) => {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color =
    score >= 80 ? "text-emerald-500" : score >= 65 ? "text-primary" : score >= 50 ? "text-amber-500" : "text-rose-500";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="8"
          fill="none" className="text-muted/30" />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} stroke="currentColor" strokeWidth="8"
          fill="none" strokeLinecap="round" className={color}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={`text-4xl font-bold ${color}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground">out of 100</span>
      </div>
    </div>
  );
};

/* ─── Category Bar ─── */
const CategoryBar = ({
  category,
  index,
}: {
  category: ScoreResult["categories"][0];
  index: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const barColor =
    category.score >= 80 ? "bg-emerald-500" : category.score >= 65 ? "bg-primary" : category.score >= 50 ? "bg-amber-500" : "bg-rose-500";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
      className="space-y-2"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left group"
      >
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground font-medium group-hover:text-primary transition-colors">
            {category.name}
          </span>
          <span className="text-muted-foreground">
            {category.score}% <span className="text-[10px]">(weight: {category.maxScore}%)</span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted mt-1 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${category.score}%` }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
          />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pl-2 space-y-1 py-2">
              {category.matched.map((m) => (
                <div key={m} className="flex items-center gap-2 text-xs">
                  <CheckCircle size={12} className="text-emerald-500 shrink-0" />
                  <span className="text-foreground/80">{m}</span>
                </div>
              ))}
              {category.missing.map((m) => (
                <div key={m} className="flex items-center gap-2 text-xs">
                  <XCircle size={12} className="text-rose-400 shrink-0" />
                  <span className="text-muted-foreground">{m}</span>
                </div>
              ))}
              {category.matched.length === 0 && category.missing.length === 0 && (
                <p className="text-xs text-muted-foreground italic">No specific keywords detected for this category</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Main Section ─── */
const ATSScoreSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = useCallback(() => {
    if (!jobText.trim() || jobText.trim().length < 50) return;
    setAnalyzing(true);
    // Simulate brief processing for UX
    setTimeout(() => {
      setResult(analyzeJobDescription(jobText));
      setAnalyzing(false);
    }, 1200);
  }, [jobText]);

  const handleReset = () => {
    setResult(null);
    setJobText("");
  };

  const badgeColor = {
    strong: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    good: "bg-primary/15 text-primary border-primary/30",
    moderate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    low: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  const badgeIcon = {
    strong: CheckCircle,
    good: CheckCircle,
    moderate: AlertTriangle,
    low: XCircle,
  };

  return (
    <section id="ats-score" className="section-padding" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Job Match</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            ATS <span className="text-gradient">Score Checker</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            Paste a job description below to instantly see how well it matches my profile. 
            Uses keyword analysis similar to real Applicant Tracking Systems.
          </p>
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass rounded-xl p-6 border border-border h-full flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <FileText size={18} className="text-primary" />
                <h3 className="font-semibold text-foreground">Job Description</h3>
              </div>
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste the full job description here... (minimum 50 characters)"
                className="flex-1 min-h-[280px] w-full resize-none rounded-lg bg-muted/50 border border-border p-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-muted-foreground">
                  {jobText.length} characters
                  {jobText.length > 0 && jobText.length < 50 && " (need at least 50)"}
                </span>
                <div className="flex gap-2">
                  {result && (
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:border-muted-foreground/30 transition-all"
                    >
                      <RotateCcw size={14} /> Reset
                    </button>
                  )}
                  <button
                    onClick={handleAnalyze}
                    disabled={analyzing || jobText.trim().length < 50}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity"
                  >
                    {analyzing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Target size={16} />
                        </motion.div>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Target size={16} /> Analyze Match
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-xl p-6 border border-border space-y-6"
                >
                  {/* Score + Badge */}
                  <div className="flex items-center gap-6">
                    <ScoreRing score={result.overall} />
                    <div className="flex-1 space-y-3">
                      {(() => {
                        const BadgeIcon = badgeIcon[result.recommendation];
                        return (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor[result.recommendation]}`}>
                            <BadgeIcon size={12} />
                            {result.recommendation.charAt(0).toUpperCase() + result.recommendation.slice(1)} Match
                          </span>
                        );
                      })()}
                      <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">Detailed Breakdown</h4>
                    <p className="text-[11px] text-muted-foreground">Click each category to see matched & missing keywords</p>
                    {result.categories.map((cat, i) => (
                      <CategoryBar key={cat.name} category={cat} index={i} />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-xl p-6 border border-border h-full flex flex-col items-center justify-center text-center min-h-[400px]"
                >
                  <BarChart3 size={48} className="text-muted-foreground/20 mb-4" />
                  <h3 className="text-lg font-semibold text-foreground/60">ATS Score Results</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                    Paste a job description on the left and click "Analyze Match" to see a detailed compatibility breakdown.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ATSScoreSection;

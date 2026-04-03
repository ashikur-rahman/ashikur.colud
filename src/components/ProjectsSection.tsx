import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Database, Globe, Bot, CreditCard } from "lucide-react";

const projects = [
  {
    icon: Database,
    title: "Agrani RMS",
    subtitle: "Enterprise Remittance Engine",
    desc: "Java Spring Boot remittance platform processing ~$10M USD/day. Engineered secure auth with Spring Security, optimized backend with JPA & MySQL indexing for high-volume transactions.",
    tags: ["Java", "Spring Boot", "MySQL", "Microservices", "Spring Security"],
    link: null,
  },
  {
    icon: Globe,
    title: "Postgraduate-Funding.com",
    subtitle: "UK Education CMS",
    desc: "Custom CMS with CodeIgniter 4.1 for UK postgraduate funding. Integrated PayPal API for secure payments. Advanced search & user management for growing traffic.",
    tags: ["PHP", "CodeIgniter", "MySQL", "PayPal API", "REST APIs"],
    link: "https://postgraduate-funding.com",
  },
  {
    icon: Bot,
    title: "AI Agent & RAG Integration",
    subtitle: "Intelligent Automation Framework",
    desc: "RAG knowledge retrieval + OpenAI + n8n orchestration for conversational AI. Features include email sentiment analysis, Google Sheets logging, and automated task categorization.",
    tags: ["OpenAI", "n8n", "RAG", "LangChain", "Vector DB"],
    link: null,
  },
  {
    icon: Globe,
    title: "i-Probono.com",
    subtitle: "Legal NGO Platform",
    desc: "Bespoke PHP CMS connecting NGOs with legal volunteers. High-traffic platform with custom content workflows and secure data handling.",
    tags: ["PHP", "MySQL", "Custom CMS", "REST APIs"],
    link: null,
  },
  {
    icon: CreditCard,
    title: "FreeMarkAlexander.org",
    subtitle: "WordPress + Payments",
    desc: "WordPress CMS with third-party API integrations (Google Maps, PayPal) for geo-location features and secure payment processing.",
    tags: ["WordPress", "PayPal", "Google Maps API"],
    link: null,
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding bg-card/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="glass rounded-xl p-6 hover:border-glow transition-all group flex flex-col"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <project.icon size={20} className="text-primary" />
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground mt-4">{project.title}</h3>
              <p className="text-xs text-primary font-medium mt-1">{project.subtitle}</p>
              <p className="text-sm text-muted-foreground mt-3 flex-1">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded bg-muted text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
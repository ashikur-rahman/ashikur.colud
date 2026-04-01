import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    color: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/30",
    skills: ["Java (Spring Boot)", "PHP (Laravel)", "PHP (CodeIgniter)", "Python", "JavaScript (ES6+)", "Node.js / Express"],
  },
  {
    title: "Databases",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    skills: ["AWS (EC2, S3, Lambda)", "Docker", "Kubernetes", "Terraform", "CI/CD (GitHub Actions)", "Git"],
  },
  {
    title: "AI & Automation",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-500/30",
    skills: ["OpenAI / GPT", "LangChain", "n8n Orchestration", "RAG Pipelines", "Machine Learning", "Power BI"],
  },
  {
    title: "Tools & Practices",
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
    skills: ["RESTful APIs", "Microservices", "System Design", "Unit & Integration Testing", "Jira / Confluence", "OOP & Clean Code"],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Technical <span className="text-gradient">Skills</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`glass rounded-xl p-6 border ${cat.borderColor} hover:border-primary/40 transition-colors`}
            >
              <h3 className="font-semibold text-foreground mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r ${cat.color} text-foreground/80`}
                  >
                    {skill}
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

export default SkillsSection;

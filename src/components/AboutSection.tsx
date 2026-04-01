import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Server, Brain } from "lucide-react";

const highlights = [
  { icon: Server, label: "12+ Years", desc: "Backend & API Engineering" },
  { icon: Zap, label: "99.99%", desc: "System Availability" },
  { icon: Shield, label: "$10M+/day", desc: "Transactions Processed" },
  { icon: Brain, label: "AI-Driven", desc: "Automation & Orchestration" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">About Me</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Engineering <span className="text-gradient">Scalable Solutions</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <p className="text-secondary-foreground leading-relaxed">
              Senior backend engineer with 12+ years delivering scalable, secure APIs and microservices on cloud platforms. 
              Led AWS teams running millions of requests/day, cut API latency by up to 40% and raised availability to 99.99%.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Strong in Java Spring Boot, Python, PHP (Laravel/CodeIgniter), containerization and CI/CD. I drive automation, 
              cost-efficiency and sustainable engineering practices. I integrate AI agents and workflow orchestration (n8n) 
              to automate business processes and customer interactions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Fast learner who adopts new technologies to build secure, highly available systems and streamline operations. 
              Based in London, open to hybrid and on-site opportunities across the UK and worldwide.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => (
              <div
                key={item.label}
                className="glass rounded-xl p-5 hover:border-glow transition-colors group"
              >
                <item.icon size={24} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-xl font-bold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

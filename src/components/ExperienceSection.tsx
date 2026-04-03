import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Globe, Briefcase } from "lucide-react";

const experiences = [
  {
    icon: Building2,
    title: "Principal Officer — Software Development & API Integration",
    company: "Agrani Bank PLC",
    location: "Dhaka, Bangladesh",
    period: "Dec 2024 — Present",
    points: [
      "Directed development of Agrani RMS — a secure Spring Boot backend processing $10M+ daily remittances across 49 exchange partners.",
      "Architected microservice REST APIs improving integration throughput and reducing service latency.",
      "Implemented Spring Security role-based access controls, strengthening compliance and reducing unauthorized access risk.",
      "Built Power BI and MySQL dashboards delivering real-time insights to executives.",
      "Applied AI-assisted tools (n8n, Copilot, ChatGPT) to refactor legacy modules and create unit tests.",
    ],
  },
  {
    icon: Building2,
    title: "Senior Officer (ICT) — Software Development & Data Analytics",
    company: "Agrani Bank PLC",
    location: "Dhaka, Bangladesh",
    period: "Apr 2018 — May 2025",
    points: [
      "Led modernization of enterprise apps supporting 30–40K daily remittances and 125K+ beneficiary database.",
      "Optimized MySQL schema and queries with indexing, reducing query latency and improving throughput.",
      "Integrated data encryption and security controls to protect a 50M+ record database.",
      "Redesigned file-based remittance workflows to cut processing time by 50%.",
      "Coordinated scalable backend deployments across 974 branches and ~10M customers.",
    ],
  },
  {
    icon: Globe,
    title: "Freelance Software Developer",
    company: "Upwork",
    location: "Remote",
    period: "Jan 2015 — Present",
    points: [
      "Delivered full-stack web apps and CMS platforms for UK and international clients.",
      "Built a UK CMS (postgraduate-funding.com) serving thousands of users with REST APIs.",
      "Developed Laravel, CodeIgniter & WordPress apps with secure payment and API integrations.",
    ],
  },
  {
    icon: Briefcase,
    title: "Lead Developer",
    company: "Inspire Creative IT (DEFINEXTEND LTD)",
    location: "London, United Kingdom",
    period: "Aug 2012 — Feb 2018",
    points: [
      "Led international full-stack projects, improving availability and automating CI/CD pipelines.",
      "Architected PHP backends (CodeIgniter, Laravel, osCommerce) for high availability.",
      "Managed high-traffic sites: Postgraduate-Funding.com, i-Probono.com, Banglalion4G.com.",
      "Established Git-based CI/CD pipelines across distributed Scrum teams.",
    ],
  },
  {
    icon: Briefcase,
    title: "Software Developer",
    company: "SAASCO Communications Ltd",
    location: "Dhaka, Bangladesh",
    period: "Jan 2012 — Aug 2012",
    points: [
      "Designed and developed Attendance, Payroll, and HR management modules as part of an ERP system for garments industries using CodeIgniter.",
      "Built web APIs for biometric attendance devices using PHP, integrating with the SAASCO Time Attendance System.",
      "Developed a popular Payroll management system linked with bio-metric devices, sold to numerous garments industries and schools in Bangladesh.",
      "Worked with MySQL, REST APIs, jQuery, Bootstrap, and AJAX for modular full-stack development.",
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding bg-card/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Career</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Professional <span className="text-gradient">Experience</span>
          </h2>
        </motion.div>

        <div className="mt-12 relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-primary/20 border-2 border-primary" />

                <div className="glass rounded-xl p-6 hover:border-glow transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-primary text-sm font-medium mt-1 flex items-center gap-1.5">
                        <exp.icon size={14} />
                        {exp.company} · {exp.location}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink } from "lucide-react";

const certifications = [
  "Zend Certified PHP Engineer — Zend by Perforce (Oct 2025)",
  "DAIBB — Institute of Bankers, Bangladesh (May 2020)",
  "JAIBB — Institute of Bankers, Bangladesh (Sep 2019)",
  "Infosys Training (Java/POJO) — Infosys Limited, Mysore (Mar 2015)",
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-card/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-xl p-6 space-y-5"
          >
            <h3 className="text-lg font-semibold text-foreground">Contact Details</h3>
            <div className="space-y-4">
              <a href="mailto:im.md.ashikur.rahman@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={16} className="text-primary" />
                </div>
                im.md.ashikur.rahman@gmail.com
              </a>
              <a href="tel:+447353215427" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={16} className="text-primary" />
                </div>
                +44 7353 215427
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin size={16} className="text-primary" />
                </div>
                79 Belgrave Road, London, E13 8RT, UK
              </div>
              <div className="flex gap-3 pt-2">
                <a href="https://www.linkedin.com/in/ashikurrahmanshuvo/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                  <Github size={16} />
                </a>
                <a href="https://www.upwork.com/freelancers/~0110cec7419da70f09" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Certifications + Education */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-5"
          >
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Education</h3>
              <div>
                <p className="text-sm font-medium text-foreground">BSc in Computer Science & Telecom Engineering</p>
                <p className="text-xs text-primary mt-1">Noakhali Science & Technology University</p>
                <p className="text-xs text-muted-foreground mt-1">CGPA 3.71/4.00 (Third Position) · Merit Scholarship</p>
              </div>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Certifications</h3>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

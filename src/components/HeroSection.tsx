import { motion } from "framer-motion";
import { ArrowDown, MapPin, Mail, Linkedin, Github, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/40 shadow-lg shadow-primary/20">
              <img src={profilePhoto} alt="Md Ashikur Rahman" className="w-full h-full object-cover" />
            </div>
            <span className="absolute bottom-2 right-2 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background" />
            </span>
          </div>
        </motion.div>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
        >
          <span className="text-sm text-muted-foreground">Open to hybrid & on-site roles</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="text-foreground">Md Ashikur</span>{" "}
          <span className="text-gradient">Rahman</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light"
        >
          Full-Stack Developer &amp; Fintech API Specialist
          <br />
          <span className="text-primary">12+ years</span> building scalable backends, AI-driven automation &amp; secure APIs
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" /> London, United Kingdom
          </span>
          <a href="mailto:im.md.ashikur.rahman@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail size={14} /> Email
          </a>
          <a href="https://www.linkedin.com/in/ashikurrahmanshuvo/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href="https://github.com/ashikur-rahman" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Github size={14} /> GitHub
          </a>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <a href="#projects" className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity glow-cyan">
            View My Work
          </a>
          <a href="/resume_md_ashikur_rahman.pdf" download className="px-8 py-3 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-colors inline-flex items-center gap-2">
            <Download size={16} /> Download CV
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="animate-float inline-block text-muted-foreground hover:text-primary transition-colors">
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

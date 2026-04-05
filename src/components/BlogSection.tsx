import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, BookOpen, Calendar, ArrowRight, Linkedin } from "lucide-react";

const articles = [
  {
    title: "Laravel Migration Made Simple: Step-by-Step Guide for Beginners & Intermediate Developers",
    excerpt: "If you're learning Laravel, migrations are one of the MOST IMPORTANT things to master. Think of migrations as version control for your database — instead of manually creating tables in phpMyAdmin, you define everything in code.",
    tags: ["Laravel", "PHP", "Database", "Backend"],
    date: "2025",
    url: "https://www.linkedin.com/pulse/laravel-migration-made-simple-step-by-step-guide-beginners-rahman-xomxe",
    coverGradient: "from-orange-500/20 to-red-500/20",
    icon: "🚀",
  },
  {
    title: "Laravel Folder Structure & How Routing Actually Works (Made Simple)",
    excerpt: "When beginners open a fresh Laravel project, the first reaction is usually: 'Why are there so many folders?' But Laravel's folder structure is beautifully organized — and once you understand it, everything becomes predictable and powerful.",
    tags: ["Laravel", "PHP", "Architecture", "Routing"],
    date: "2025",
    url: "https://www.linkedin.com/pulse/laravel-folder-structure-how-routing-actually-works-made-rahman-leaee",
    coverGradient: "from-blue-500/20 to-purple-500/20",
    icon: "📁",
  },
  {
    title: "Getting Started with Web Development: A Beginner's Guide",
    excerpt: "In today's digital age, having a presence on the web is essential. Web development involves two key components: Frontend Development (HTML, CSS, JavaScript) and Backend Development (databases, server-side scripts).",
    tags: ["Web Development", "HTML", "CSS", "JavaScript"],
    date: "2024",
    url: "https://www.linkedin.com/pulse/getting-started-web-development-beginners-guide-ashikur-rahman-g1ivc",
    coverGradient: "from-emerald-500/20 to-teal-500/20",
    icon: "🌐",
  },
  {
    title: "JavaScript Guideline: ফুলস্ট্যাক জাভাস্ক্রিপ্ট ডেভেলপার গাইড লাইন",
    excerpt: "A comprehensive guideline for aspiring full-stack JavaScript developers, covering the complete roadmap from fundamentals to advanced concepts in both Bengali and English.",
    tags: ["JavaScript", "Full Stack", "Guide", "Bengali"],
    date: "2024",
    url: "https://www.linkedin.com/pulse/javascript-guideline-%E0%A6%AB%E0%A6%B2%E0%A6%B8%E0%A6%9F%E0%A6%AF%E0%A6%95-%E0%A6%9C%E0%A6%AD%E0%A6%B8%E0%A6%95%E0%A6%B0%E0%A6%AA%E0%A6%9F-%E0%A6%A1%E0%A6%AD%E0%A6%B2%E0%A6%AA%E0%A6%B0-%E0%A6%97%E0%A6%87%E0%A6%A1-%E0%A6%B2%E0%A6%87%E0%A6%A8-ashikur-rahman",
    coverGradient: "from-yellow-500/20 to-amber-500/20",
    icon: "📘",
  },
  {
    title: "Link Building Fundamentals",
    excerpt: "Understanding the core principles of link building for SEO — strategies, best practices, and techniques to build high-quality backlinks that improve search engine rankings.",
    tags: ["SEO", "Link Building", "Digital Marketing"],
    date: "2023",
    url: "https://www.linkedin.com/pulse/link-building-fundamentals-md-ashikur-rahman",
    coverGradient: "from-cyan-500/20 to-blue-500/20",
    icon: "🔗",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="blog" className="section-padding" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3 flex items-center gap-2">
              <BookOpen size={14} /> Blog & Articles
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Technical <span className="text-gradient">Writing</span>
            </h2>
            <p className="text-muted-foreground mt-2 max-w-lg text-sm">
              I share my knowledge and experience through in-depth technical articles on LinkedIn, covering web development, frameworks, and best practices.
            </p>
          </div>
          <a
            href="https://www.linkedin.com/in/ashikur-fullstack-dev/recent-activity/articles/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors shrink-0"
          >
            <Linkedin size={16} />
            View All on LinkedIn
            <ArrowRight size={14} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.a
              key={article.title}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass rounded-xl overflow-hidden flex flex-col hover:border-glow transition-all group cursor-pointer"
            >
              {/* Cover gradient header */}
              <div className={`relative h-28 bg-gradient-to-br ${article.coverGradient} flex items-center justify-center overflow-hidden`}>
                <motion.span
                  className="text-5xl"
                  animate={hoveredIndex === i ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {article.icon}
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: hoveredIndex === i ? 0.3 : 0.5 }}
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar size={12} />
                  <span>{article.date}</span>
                </div>

                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-muted-foreground mt-2 flex-1 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      +{article.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Article <ExternalLink size={12} />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
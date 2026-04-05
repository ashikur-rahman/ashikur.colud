import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, BookOpen, Calendar, ArrowLeft, Linkedin, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { articles, Article } from "@/data/articles";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const categories = [
  { key: "all", label: "All Articles" },
  { key: "development", label: "Development" },
  { key: "seo", label: "SEO" },
  { key: "marketing", label: "Marketing" },
];

const BlogPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card/30">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <a
              href="https://www.linkedin.com/in/ashikur-fullstack-dev/recent-activity/articles/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pt-28 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-3 flex items-center justify-center gap-2">
            <BookOpen size={14} /> Blog & Articles
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Writing</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I share my knowledge and experience through in-depth technical articles on LinkedIn, covering web development, frameworks, SEO, and digital marketing best practices.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
        >
          <Filter size={14} className="text-muted-foreground mr-1" />
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Articles count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-muted-foreground mb-6 text-center"
        >
          Showing {filtered.length} article{filtered.length !== 1 ? "s" : ""}
        </motion.p>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, i) => (
            <motion.a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass rounded-xl overflow-hidden flex flex-col hover:border-glow transition-all group cursor-pointer"
            >
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
                  <span className="ml-auto px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-mono capitalize">
                    {article.category}
                  </span>
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
    </div>
  );
};

export default BlogPage;
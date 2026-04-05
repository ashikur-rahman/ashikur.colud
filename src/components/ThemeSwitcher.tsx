import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "lucide-react";

type Theme = {
  id: string;
  label: string;
  icon: string;
  description: string;
};

const themes: Theme[] = [
  { id: "default", label: "Professional", icon: "🔵", description: "Clean blue on dark navy" },
  { id: "light", label: "Light", icon: "☀️", description: "Clean light background" },
  { id: "emerald", label: "Emerald", icon: "🟢", description: "Green tones, nature feel" },
  { id: "amber", label: "Amber Gold", icon: "🟡", description: "Warm gold accents" },
  { id: "rose", label: "Rose", icon: "🔴", description: "Soft rose & pink tones" },
  { id: "terminal", label: "Terminal", icon: "💻", description: "Hacker-style monospace" },
];

const ThemeSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("default");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) {
      setActiveTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectTheme = (id: string) => {
    setActiveTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    localStorage.setItem("portfolio-theme", id);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
        aria-label="Change theme"
      >
        <Palette size={16} />
        <span className="hidden lg:inline">Theme</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-56 rounded-xl glass p-2 shadow-xl z-50"
          >
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => selectTheme(theme.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  activeTheme === theme.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <span className="text-base">{theme.icon}</span>
                <div>
                  <p className="text-sm font-medium">{theme.label}</p>
                  <p className="text-[10px] opacity-60">{theme.description}</p>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
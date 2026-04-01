const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6 text-center">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Md Ashikur Rahman · London, UK ·{" "}
        <a href="https://www.linkedin.com/in/ashikurrahmanshuvo/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          LinkedIn
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;

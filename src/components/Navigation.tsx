import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Ventures", href: "#ventures" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-2 bg-background/95 backdrop-blur-md border-b border-border/50' 
        : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo - only show when scrolled */}
        <a 
          href="#" 
          className={`flex items-center gap-2 transition-all duration-300 ${
            scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <img src={logo} alt="Devansh Logo" className="h-8 w-auto" />
        </a>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center gap-8 transition-all duration-300 ${
          scrolled ? '' : 'ml-auto'
        }`}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-accent transition-colors border-reveal"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-accent/20">
          <div className="px-8 py-10 space-y-2">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-4 py-4 border-b border-border/30 last:border-b-0 transition-all duration-300 hover:pl-2"
              >
                <span className="text-mono text-xs text-accent/60 group-hover:text-accent transition-colors">
                  0{index + 1}
                </span>
                <span className="text-display text-4xl font-medium tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
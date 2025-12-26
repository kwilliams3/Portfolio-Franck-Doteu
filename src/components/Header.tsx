import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Accueil", href: "#home" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Expérience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "py-4 glass shadow-lg"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-2xl font-bold gradient-text"
          whileHover={{ scale: 1.05 }}
        >
          FD
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              {item.name}
              <motion.span
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-premium rounded-full"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-secondary/50 border border-border/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass mt-4 mx-6 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

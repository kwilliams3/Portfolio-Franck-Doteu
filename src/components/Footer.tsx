import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/kwilliams3", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/franck-doteu-5206b334b", label: "LinkedIn" },
  { icon: Mail, href: "mailto:franckdoteu3@gmail.com", label: "Email" },
];

const navLinks = [
  { name: "Accueil", href: "#home" },
  { name: "Compétences", href: "#skills" },
  { name: "Projets", href: "#projects" },
  { name: "Expérience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.a
              href="#home"
              className="text-2xl font-bold gradient-text inline-block mb-2"
              whileHover={{ scale: 1.05 }}
            >
              Franck Doteu
            </motion.a>
            <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-start gap-1">
              &copy; <?= date('Y') ?>  • Fait avec <Heart className="w-4 h-4 text-destructive" /> par Franck Doteu
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-3 rounded-full bg-secondary/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5 text-foreground" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

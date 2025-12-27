import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Download,
  MessageCircle,
  Terminal,
  Braces,
  Database,
  Server,
  Globe,
  Code2,
} from "lucide-react";
import { useEffect, useState } from "react";

import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import profile5 from "@/assets/profile-5.jpg";

const profilePhotos = [profile1, profile2, profile3, profile4, profile5];

const codeLines = [
  "const developer = {",
  '  name: "Franck Doteu",',
  "  role: 'Full-Stack Engineer',",
  "  skills: ['React', 'Node.js', 'TypeScript'],",
  "  passion: 'Building great products'",
  "};",
];

export function Hero() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);

  /* Mouse parallax */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* Code typing effect */
  useEffect(() => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prev => [...prev, codeLines[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      // Reset after all lines displayed
      const resetTimer = setTimeout(() => {
        setDisplayedCode([]);
        setCurrentLine(0);
      }, 4000);
      return () => clearTimeout(resetTimer);
    }
  }, [currentLine]);

  /* Photo carousel */
  useEffect(() => {
    const interval = setInterval(() => setPhotoIndex((p) => (p + 1) % profilePhotos.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/kwilliams3", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/franck-doteu-5206b334b", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://wa.me/237655497331", label: "WhatsApp" },
    { icon: Mail, href: "mailto:franckdoteu3@gmail.com", label: "Email" },
  ];

  const floatingTechs = [
    { icon: Braces, label: "React", color: "from-cyan-400 to-cyan-600" },
    { icon: Server, label: "Node.js", color: "from-green-400 to-green-600" },
    { icon: Database, label: "PostgreSQL", color: "from-blue-400 to-blue-600" },
    { icon: Globe, label: "TypeScript", color: "from-blue-500 to-blue-700" },
    { icon: Terminal, label: "Docker", color: "from-sky-400 to-sky-600" },
    { icon: Code2, label: "GraphQL", color: "from-pink-400 to-pink-600" },
  ];

  // Generate positions for floating particles - left and right sides, avoiding center (photo area)
  const particlePositions = floatingTechs.map((_, idx) => ({
    x: idx % 2 === 0 ? 3 + (idx * 5) % 20 : 80 + (idx * 3) % 15,  // Left (0-25%) or Right (80-95%)
    y: 8 + (idx * 12) % 75,
    delay: idx * 0.4,
    duration: 14 + (idx * 2),
  }));

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pb-32 md:pb-8">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Code grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Floating Tech Particles */}
      {floatingTechs.map((tech, idx) => (
        <motion.div
          key={tech.label}
          className="absolute z-20 pointer-events-none hidden sm:block" // Masqué sur mobile
          style={{
            left: `${particlePositions[idx].x}%`,
            top: `${particlePositions[idx].y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.9, 0.4],
            scale: [0.9, 1.1, 0.9],
            x: [0, Math.sin(idx) * 60, -Math.cos(idx) * 40, 0],
            y: [0, Math.cos(idx) * 50, Math.sin(idx) * 30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: particlePositions[idx].duration,
            repeat: Infinity,
            delay: particlePositions[idx].delay,
            ease: "easeInOut",
          }}
        >
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br ${tech.color} shadow-lg backdrop-blur-sm border border-white/10`}>
            <tech.icon className="w-4 h-4 text-white" />
            <span className="text-xs font-bold text-white tracking-wide">{tech.label}</span>
          </div>
        </motion.div>
      ))}

      {/* Animated gradient orbs - réduits sur mobile */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-primary/15 rounded-full blur-[80px] md:blur-[150px]"
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-accent/15 rounded-full blur-[60px] md:blur-[120px]"
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Left side - Content */}
          <motion.div
            className="text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Developer badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Full-Stack Developer</span>
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-foreground">Je suis </span>
              <span className="gradient-text">Franck Doteu</span>
            </motion.h1>

            {/* Code block preview */}
            <motion.div
              className="mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm font-mono text-xs sm:text-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3 pb-2 sm:pb-3 border-b border-border/30">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive/70" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/70" />
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-muted-foreground text-xs">developer.ts</span>
              </div>
              <div className="space-y-1 min-h-[120px] sm:min-h-[140px]">
                {displayedCode.map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-muted-foreground"
                  >
                    <span className="text-muted-foreground/50 mr-3 sm:mr-4">{idx + 1}</span>
                    <span dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/const|let|var/g, '<span class="text-purple-400">$&</span>')
                        .replace(/"[^"]*"/g, '<span class="text-green-400">$&</span>')
                        .replace(/'[^']*'/g, '<span class="text-green-400">$&</span>')
                        .replace(/\[|\]|\{|\}|:|,/g, '<span class="text-primary">$&</span>')
                    }} />
                  </motion.div>
                ))}
                <motion.span
                  className="inline-block w-2 h-4 bg-primary ml-6"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Ingénieur logiciel passionné par le développement d'applications web 
              <span className="text-foreground font-medium"> modernes, performantes et scalables</span>. 
              Actuellement en stage chez <span className="text-primary font-semibold">SOREPCO SA</span>.
            </motion.p>

            {/* Tech stack hint */}
            <motion.p
              className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8 flex items-center gap-2 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Technologies en orbite autour de vous
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="#contact"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg shadow-primary/25 overflow-hidden text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Démarrer un projet
                </span>
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1y5K0yImD0DbBCYbItzgKXhrQVU8p4GNW/view"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-border hover:border-primary/50 font-semibold hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Mon CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex gap-2 sm:gap-3 justify-center lg:justify-start mb-16 sm:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group p-2 sm:p-3 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <link.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side - Photo */}
          <motion.div
            className="relative flex justify-center order-1 lg:order-2 mb-4 sm:mb-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ x: mousePosition.x * 0.05, y: mousePosition.y * 0.05 }}
          >
            {/* Decorative elements - réduits sur mobile */}
            <motion.div
              className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-24 h-24 sm:w-32 sm:h-32 border-2 border-primary/20 rounded-2xl"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-24 sm:h-24 border-2 border-accent/20 rounded-2xl"
              animate={{ rotate: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            />

            {/* Main photo container */}
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-r from-primary/40 via-accent/40 to-primary/40 blur-xl sm:blur-2xl opacity-60"
                animate={{ 
                  opacity: [0.4, 0.7, 0.4],
                  scale: [0.95, 1.02, 0.95],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Photo frame - MODIFIÉ POUR CENTRER LES PHOTOS */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden border-4 border-background shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photoIndex}
                    src={profilePhotos[photoIndex]}
                    alt="Franck Doteu - Développeur Full-Stack"
                    className="w-full h-full object-cover object-center" // MODIFICATION ICI
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>
              </div>

              {/* Photo indicators */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                {profilePhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPhotoIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === photoIndex 
                        ? "bg-primary w-6 sm:w-8" 
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -right-2 sm:-right-4 top-6 sm:top-8 px-3 py-1 sm:px-4 sm:py-2 rounded-xl bg-card border border-border shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium">Disponible</span>
                </div>
              </motion.div>

              {/* Experience badge */}
              <motion.div
                className="absolute -left-2 sm:-left-4 bottom-12 sm:bottom-16 px-3 py-2 sm:px-4 sm:py-3 rounded-xl bg-card border border-border shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - Optimisé pour éviter tout chevauchement */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#skills"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs tracking-[0.2em] uppercase font-medium hidden sm:block">
            Explorer
          </span>
          <div className="w-14 h-14 sm:w-12 sm:h-12 md:w-10 md:h-10 rounded-full border-2 border-current flex items-center justify-center 
                        bg-background/95 backdrop-blur-md shadow-2xl hover:bg-primary/10 
                        hover:border-primary/50 transition-all duration-300">
            <ArrowDown className="w-6 h-6 sm:w-5 sm:h-5 md:w-4 md:h-4" />
          </div>
        </motion.a>
      </motion.div>
    </section>
  );
}

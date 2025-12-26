import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Download,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiReact, SiTypescript, SiNodedotjs, SiTailwindcss, SiPostgresql } from "react-icons/si";

import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import profile5 from "@/assets/profile-5.jpg";

const profilePhotos = [profile1, profile2, profile3, profile4, profile5];
const titles = ["Ingénieur Logiciel", "Développeur Web Full-Stack", "Architecte Web", "Créateur de Solutions Numériques"];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /* Mouse parallax */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* Typing effect */
  useEffect(() => {
    const current = titles[titleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTitleIndex((i) => (i + 1) % titles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, titleIndex]);

  /* Photo carousel */
  useEffect(() => {
    const interval = setInterval(() => setPhotoIndex((p) => (p + 1) % profilePhotos.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { icon: Github, href: "https://github.com/kwilliams3" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/franck-doteu-5206b334b" },
    { icon: MessageCircle, href: "https://wa.me/237655497331" },
    { icon: Mail, href: "mailto:franckdoteu3@gmail.com" },
  ];

  const techLogos = [
    { component: SiReact, color: "text-cyan-400", top: "12%", left: "8%", duration: 6 },
    { component: SiTypescript, color: "text-blue-600", top: "18%", right: "10%", duration: 7 },
    { component: SiNodedotjs, color: "text-green-600", bottom: "30%", left: "12%", duration: 8 },
    { component: SiTailwindcss, color: "text-sky-400", bottom: "22%", right: "16%", duration: 6.5 },
    { component: SiPostgresql, color: "text-blue-500", top: "45%", right: "4%", duration: 7.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Floating tech logos */}
      <div className="absolute inset-0 pointer-events-none">
        {techLogos.map((logo, idx) => (
          <motion.div
            key={idx}
            className={`absolute ${logo.color}`}
            style={{ top: logo.top, left: logo.left, bottom: logo.bottom, right: logo.right }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: logo.duration, repeat: Infinity, ease: "easeInOut" }}
          >
            <logo.component size={40} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Profile photo */}
        <motion.div
          className="relative inline-block mb-16"
          style={{ x: mousePosition.x * 0.05, y: mousePosition.y * 0.05 }}
        >
          <div className="w-60 h-60 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-background shadow-2xl shadow-primary/20">
            <AnimatePresence mode="wait">
              <motion.img
                key={photoIndex}
                src={profilePhotos[photoIndex]}
                alt="Franck Doteu"
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Franck{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Doteu
          </span>
        </h1>

        {/* Animated titles */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-xl md:text-2xl text-muted-foreground font-light">
            {displayText}
            <motion.span
              className="inline-block w-px h-6 bg-primary ml-1 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </span>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-muted-foreground mb-4 leading-relaxed text-lg md:text-xl">
          Ingénieur logiciel spécialisé dans la conception et le développement
          d’applications web modernes, performantes et maintenables.
        </p>

        <p className="max-w-xl mx-auto text-sm md:text-base text-muted-foreground/80 mb-12">
          Actuellement en stage chez <strong>SOREPCO SA</strong>, où j’apporte mon expertise
          à des projets innovants et orientés performance.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl bg-primary text-white font-medium shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Me contacter
          </a>

          <a
            href="https://drive.google.com/file/d/1y5K0yImD0DbBCYbItzgKXhrQVU8p4GNW/view"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl border border-primary font-medium hover:bg-primary/10 transition-colors duration-300"
          >
            <div className="flex items-center gap-2 justify-center">
              <Download className="w-4 h-4" />
              Télécharger CV
            </div>
          </a>
        </div>

        {/* Social links */}
        <div className="mb-32 flex justify-center gap-6">
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full border border-border hover:border-primary hover:scale-110 transition-transform duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Explorer indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <motion.a
          href="#skills"
          className="flex flex-col items-center gap-2 text-muted-foreground"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs tracking-widest">EXPLORER</span>
          <div className="w-10 h-10 rounded-full border flex items-center justify-center">
            <ArrowDown className="w-4 h-4" />
          </div>
        </motion.a>
      </div>
    </section>
  );
}

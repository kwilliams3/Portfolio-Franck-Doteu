import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Stagiaire Professionnel",
    company: "SOREPCO SA",
    location: "Douala, Cameroun",
    date: "Déc. 2025 - Présent",
    description: "Développement d'applications métier pour l'entreprise. Conception et implémentation de solutions web modernes.",
    technologies: ["React", "TypeScript", "Node.js", "Supabase"],
    current: true,
  },
  {
    type: "work",
    title: "Développeur Stagiaire",
    company: "KMS Entreprises",
    location: "Douala, Cameroun",
    date: "2025 - 5 mois",
    description: "Développement d'applications web avec React et Node.js. Participation à la création d'une plateforme de communication en masse. Collaboration avec une équipe agile.",
    technologies: ["React", "Node.js", "JavaScript", "Agile"],
    current: false,
  },
  {
    type: "work",
    title: "Stagiaire en Développement",
    company: "TIC AFRIK",
    location: "Douala, Cameroun",
    date: "2023 - 2 mois",
    description: "Initiation au développement web et mobile. Découverte des technologies modernes (React, Flutter). Participation à des projets réels.",
    technologies: ["React", "Flutter", "Web", "Mobile"],
    current: false,
  },
];

const education = [
  {
    type: "education",
    title: "Ingénieur en Génie Logiciel",
    company: "ENSPD (École Nationale Supérieure Polytechnique de Douala)",
    location: "Douala, Cameroun",
    date: "2020 - 2025",
    description: "Spécialisation en développement logiciel et architecture systèmes. Projets avancés en algorithmique et structures de données. Gestion de projet agile et méthodes DevOps.",
    technologies: ["Algorithmique", "Architecture Systèmes", "DevOps", "Agile"],
    current: false,
  },
];

function TimelineItem({ item, index, side }: { item: typeof experiences[0]; index: number; side: "left" | "right" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isWork = item.type === "work";
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`flex items-start gap-6 ${side === "right" ? "md:flex-row-reverse" : ""}`}
    >
      {/* Content Card */}
      <motion.div
        className={`flex-1 ${side === "right" ? "md:text-right" : ""}`}
        whileHover={{ scale: 1.02 }}
      >
        <div className={`p-6 rounded-2xl glass border ${item.current ? "border-primary/50 glow-sm" : "border-border/50"} hover:border-primary/30 transition-all duration-500`}>
          {/* Badge */}
          {item.current && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium mb-3">
              En cours
            </span>
          )}

          {/* Title & Company */}
          <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
          <p className="text-primary font-semibold mb-3">{item.company}</p>

          {/* Meta */}
          <div className={`flex gap-4 text-sm text-muted-foreground mb-4 ${side === "right" ? "md:justify-end" : ""} flex-wrap`}>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {item.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {item.date}
            </span>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-4">{item.description}</p>

          {/* Technologies */}
          <div className={`flex flex-wrap gap-2 ${side === "right" ? "md:justify-end" : ""}`}>
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Timeline Dot */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            item.current
              ? "bg-gradient-premium animate-pulse-glow"
              : "bg-secondary border-2 border-border"
          }`}
        >
          <Icon className={`w-5 h-5 ${item.current ? "text-primary-foreground" : "text-foreground"}`} />
        </motion.div>
        <div className="w-0.5 h-full bg-border/50 flex-1 min-h-[40px]" />
      </div>

      {/* Mobile Icon */}
      <div className="md:hidden">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          item.current ? "bg-gradient-premium" : "bg-secondary border-2 border-border"
        }`}>
          <Icon className={`w-4 h-4 ${item.current ? "text-primary-foreground" : "text-foreground"}`} />
        </div>
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

export function Experience() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Parcours
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Mon <span className="gradient-text">Expérience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Mon parcours professionnel et académique qui m'a façonné en tant que développeur
          </motion.p>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-2xl font-bold mb-8 flex items-center gap-3"
          >
            <Briefcase className="w-6 h-6 text-primary" />
            Expériences Professionnelles
          </motion.h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={exp.title + exp.company}
                item={exp}
                index={index}
                side={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-2xl font-bold mb-8 flex items-center gap-3"
          >
            <GraduationCap className="w-6 h-6 text-primary" />
            Formation
          </motion.h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <TimelineItem
                key={edu.title + edu.company}
                item={edu}
                index={index}
                side={index % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

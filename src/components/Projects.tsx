import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronRight } from "lucide-react";

/* =======================
   Données des projets
   ======================= */
const projects = [
  {
    title: "Portfolio Personnel",
    description:
      "Portfolio professionnel présentant mes compétences, projets et expériences en développement web.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/kwilliams3/Portfolio",
    demo: "https://portfolio-tan-gamma-65.vercel.app/",
    category: "Portfolio",
  },
  {
    title: "Gestionnaire d’Impression",
    description:
      "Application complète pour la gestion des commandes d’impression, du suivi et des clients.",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "React", "Node.js"],
    github: "https://github.com/kwilliams3/projet-gestinnaire-impression",
    demo: null,
    category: "Fullstack",
  },
  {
    title: "Dashboard Client – Impression",
    description:
      "Tableau de bord client permettant le suivi en temps réel des commandes d’impression.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "React"],
    github:
      "https://github.com/kwilliams3/Dashboard-client-gestion-d-impression",
    demo: null,
    category: "Dashboard",
  },
  {
    title: "Pagesse Shoot",
    description:
      "Application web permettant la capture et la gestion de pages web via une interface moderne.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "React"],
    github: "https://github.com/kwilliams3/Pagesse-Shoot",
    demo: null,
    category: "Web",
  },
  {
    title: "Site Web Moderne",
    description:
      "Projet de site web moderne et responsive développé avec React et TypeScript.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    technologies: ["TypeScript", "React"],
    github: "https://github.com/kwilliams3/site-web",
    demo: null,
    category: "Web",
  },
  {
    title: "Portfolio – Ancienne Version",
    description:
      "Ancienne version de mon portfolio personnel, utilisée comme base d’évolution.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    technologies: ["TypeScript"],
    github: "https://github.com/kwilliams3/Portfolio-Franck-Doteu",
    demo: null,
    category: "Portfolio",
  },
];

const categories = ["Tous", "Portfolio", "Web", "Dashboard", "Fullstack"];

/* =======================
   Carte Projet
   ======================= */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden glass border border-border/50 hover:border-primary/30 transition-all duration-500"
        whileHover={{ y: -10 }}
      >
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
            {project.category}
          </span>

          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-primary text-primary-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>

            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-card border border-border"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-6 h-6" />
              </motion.a>
            )}
          </motion.div>
        </div>

        {/* Contenu */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
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
    </motion.div>
  );
}

/* =======================
   Section Projets
   ======================= */
export function Projects() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProjects = projects.filter(
    (p) => activeCategory === "Tous" || p.category === activeCategory
  );

  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Portfolio
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Mes <span className="gradient-text">Projets</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Une sélection de mes réalisations en développement web et applicatif
          </motion.p>
        </div>

        {/* Filtres */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grille */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Lien GitHub */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/kwilliams3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border hover:border-primary"
          >
            Voir tous mes projets
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

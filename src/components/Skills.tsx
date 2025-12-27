import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Database,
  Layout,
  Server,
  Terminal,
  GitBranch,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend",
    icon: Layout,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "Python / Django", level: 75 },
      { name: "Java / Spring", level: 70 },
      { name: "API REST", level: 90 },
    ],
  },
  {
    title: "Base de données",
    icon: Database,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Supabase", level: 85 },
      { name: "MySQL", level: 80 },
    ],
  },
  {
    title: "Versioning",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "GitLab", level: 75 },
    ],
  },
  {
    title: "Outils",
    icon: Terminal,
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 70 },
      { name: "Postman", level: 85 },
      { name: "Jira", level: 75 },
    ],
  },
];

function SkillCard({
  category,
  index,
}: {
  category: typeof skillCategories[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      className="relative group"
    >
      {/* Halo */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.color} blur-3xl opacity-10`}
      />

      <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="relative h-full p-6 rounded-3xl glass border border-border/50 backdrop-blur-xl overflow-hidden"
      >
        {/* Icône */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${category.color} mb-5`}
        >
          <category.icon className="w-6 h-6 text-white" />
        </motion.div>

        <h3 className="text-xl font-bold mb-5">
          {category.title}
        </h3>

        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium">
                  {skill.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>

              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{
                    duration: 1.3,
                    delay: 0.5 + skillIndex * 0.12,
                    ease: "easeOut",
                  }}
                  className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Reflet */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section
      id="skills"
      className="relative section-padding overflow-hidden"
    >
      {/* ===== FOND IDENTIQUE AU HERO ===== */}

      {/* Gradient sombre */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Motif code */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Orbes animés */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px]"
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] bg-accent/15 rounded-full blur-[130px]"
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ===== CONTENU ===== */}
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-5"
          >
            Expertise technique
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Mes <span className="gradient-text">Compétences</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Technologies et outils que j’utilise pour concevoir
            des applications modernes et performantes.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Code2, 
  Database, 
  Layout, 
  Server, 
  Terminal,
  GitBranch
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

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"
        style={{ 
          backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` 
        }}
      />
      <motion.div
        className="relative h-full p-6 rounded-2xl glass border border-border/50 group-hover:border-primary/30 transition-all duration-500 overflow-hidden"
        whileHover={{ y: -8, scale: 1.02 }}
      >
        {/* Icon */}
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
          <category.icon className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-foreground">{category.title}</h3>

        {/* Skills */}
        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : {}}
                  transition={{ duration: 1, delay: 0.5 + skillIndex * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2" />
      </motion.div>
    </motion.div>
  );
}

export function Skills() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Mes <span className="gradient-text">Compétences</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Technologies et outils que je maîtrise pour créer des applications web et mobiles modernes
          </motion.p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

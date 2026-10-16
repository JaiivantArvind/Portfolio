import { motion } from "framer-motion";
import { skills } from "../data/resume";

function SkillItem({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ color: "var(--color-accent)", x: 5 }}
      transition={{ duration: 0.3 }}
      className="text-muted text-sm font-light cursor-default py-1 flex items-center gap-2"
    >
      <span className="w-1 h-1 rounded-full bg-border group-hover:bg-accent transition-colors" />
      {name}
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section id="skills" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Capabilities
          </p>
          <h2 className="text-4xl md:text-6xl mb-6">
            The <br />
            <span className="italic font-light">Arsenal.</span>
          </h2>
          <p className="text-muted text-lg font-light leading-relaxed">
            A deep commitment to technical excellence, ranging from low-level systems
            to modern distributed architectures.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col"
            >
              <h3 className="text-xl font-heading mb-6 pb-2 border-b border-border inline-block w-fit">
                {group.category}
              </h3>
              <div className="flex flex-col gap-1">
                {group.skills.map((skill) => (
                  <SkillItem key={skill} name={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

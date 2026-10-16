import { motion } from "framer-motion";
import { experience } from "../data/resume";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Legacy & Impact
          </p>
          <h2 className="text-4xl md:text-6xl mb-6">
            Leadership <br />
            <span className="italic font-light">& Contribution.</span>
          </h2>
        </div>

        <div className="space-y-20">
          {experience.map((item, index) => (
            <motion.div
              key={item.role}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "150px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="grid md:grid-cols-4 gap-8 items-start"
            >
              <div className="md:col-span-1">
                <span className="text-muted text-sm font-light tabular-nums">
                  {item.period}
                </span>
              </div>
              <div className="md:col-span-3">
                <h3 className="text-2xl md:text-3xl font-heading mb-2 group-hover:text-accent transition-colors">
                  {item.role}
                </h3>
                <p className="text-accent text-sm font-medium mb-6 uppercase tracking-widest">
                  {item.org}
                </p>
                <ul className="space-y-4">
                  {item.bullets.map((bullet, i) => (
                    <li key={i} className="text-muted text-sm leading-relaxed flex gap-3">
                      <span className="text-border shrink-0">○</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { education } from "../data/resume";

export function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Education
          </p>
          <h2 className="text-4xl md:text-6xl mb-6">
            The <br />
            <span className="italic font-light">Foundation.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.5 }}
          className="relative p-8 md:p-16 border border-border bg-surface-2"
        >
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <h3 className="text-3xl md:text-5xl font-heading mb-4">
                {education.institution}
              </h3>
              <p className="text-accent text-xl font-light italic mb-6">
                {education.degree}
              </p>
            </div>
            <div className="text-right md:text-right">
              <p className="text-muted text-sm uppercase tracking-widest mb-2">
                {education.location}
              </p>
              <p className="text-text font-medium tabular-nums">
                {education.period}
              </p>
            </div>
          </div>

          {/* Subtle architectural corner detail */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-accent opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Award, CheckCircle, GraduationCap } from "lucide-react";
import { education, certifications } from "../data/resume";

export function Education() {
  return (
    <section id="education" className="py-24 px-6 bg-surface">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Education & Certifications
          </p>
          <h2 className="text-4xl md:text-6xl mb-6">
            The <br />
            <span className="italic font-light">Foundation.</span>
          </h2>
        </div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.5 }}
          className="relative p-8 md:p-14 border border-border bg-surface-2 mb-8"
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
                <GraduationCap size={15} />
                <span>Academic Degree</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading text-text font-semibold">
                {education.institution}
              </h3>
              <p className="text-accent text-lg sm:text-xl font-light italic">
                {education.degree}
              </p>
            </div>
            <div className="text-left md:text-right space-y-2 border-t md:border-t-0 pt-4 md:pt-0 border-border/60">
              <p className="text-muted text-xs uppercase tracking-widest font-mono">
                {education.location}
              </p>
              <p className="text-text font-medium text-sm tabular-nums font-mono">
                {education.period}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/15 border border-accent/40 rounded-full text-xs font-mono text-accent font-semibold mt-2">
                <span>CGPA:</span>
                <span>{education.cgpa}</span>
              </div>
            </div>
          </div>

          {/* Subtle architectural corner detail */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-accent opacity-30" />
        </motion.div>

        {/* Certifications Showcase */}
        {certifications && certifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "150px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 md:p-8 border border-border bg-surface-2/60 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              <Award size={16} />
              <span>Professional Certifications & Accreditations</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.title}
                  className="p-5 rounded-lg bg-surface border border-border/80 flex items-start gap-4 hover:border-accent/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
                    <CheckCircle size={18} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/15 px-2 py-0.5 rounded">
                        {cert.issuer} Verified
                      </span>
                      <span className="text-[10px] font-mono text-muted-2">
                        {cert.year}
                      </span>
                    </div>
                    <h4 className="text-sm font-heading font-semibold text-text leading-snug">
                      {cert.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}


import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { personalInfo } from "../data/resume";

export function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 max-w-2xl">
          <p className="text-accent text-xs tracking-[0.3em] uppercase font-medium mb-4">
            Connection
          </p>
          <h2 className="text-4xl md:text-6xl mb-6">
            Let's <br />
            <span className="italic font-light">Collaborate.</span>
          </h2>
          <p className="text-muted text-lg font-light leading-relaxed">
            Currently open to internships, collaborations, and interesting conversations about
            systems, blockchain, and AI.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "150px" }}
          transition={{ duration: 0.5 }}
          className="relative grid md:grid-cols-3 gap-12"
        >
          <div className="md:col-span-2 group">
            <p className="text-muted text-sm uppercase tracking-widest mb-4 font-medium">Direct Access</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-3xl md:text-5xl font-heading transition-all duration-500 group-hover:text-accent"
            >
              {personalInfo.email}
            </a>
          </div>
          <div className="flex flex-col gap-6 justify-end">
            <div className="space-y-6">
              {[
                { icon: <Github size={16} />, label: "GitHub", href: personalInfo.github },
                { icon: <Linkedin size={16} />, label: "LinkedIn", href: personalInfo.linkedin },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted hover:text-text transition-colors duration-300 group"
                >
                  <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all">
                    {icon}
                  </span>
                  <span className="text-sm font-light uppercase tracking-widest">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

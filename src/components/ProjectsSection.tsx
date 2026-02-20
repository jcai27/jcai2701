import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const ProjectsSection = () => {
  const {
    data: { projects },
  } = usePortfolio();

  return (
    <section id="projects" className="px-6 py-20">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Portfolio</p>
          <h2 className="section-title">Selected Work</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Case studies focused on practical product and engineering outcomes.</p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={`${project.title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="paper-card group p-7 transition-transform hover:-translate-y-1"
            >
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 text-3xl font-semibold text-card-foreground">{project.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="border border-border bg-background px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-4 border-t border-border pt-4">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground">
                  <Github size={15} /> Code
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground">
                    <ExternalLink size={15} /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

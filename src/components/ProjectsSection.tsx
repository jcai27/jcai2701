import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const ProjectsSection = () => {
  const {
    data: { projects },
  } = usePortfolio();

  const formatNarrative = (description: string) => {
    const parts = description
      .split(".")
      .map((part) => part.trim())
      .filter(Boolean);

    const problem = parts[0] || description;
    const result = parts.slice(1).join(". ") || parts[0] || description;

    return { problem, result };
  };

  return (
    <section id="projects" className="bg-secondary/25 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Projects</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Selected Work</h2>
          <p className="mt-2 text-muted-foreground">A selection of things I&apos;ve built.</p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={`${project.title}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group rounded-xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${
                i === 0 ? "border-primary/35 shadow-[0_14px_30px_hsl(222_20%_14%_/_0.12)] sm:col-span-2" : "border-border"
              }`}
            >
              {(() => {
                const { problem, result } = formatNarrative(project.description);
                return (
                  <>
                    <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
                    <div className="mt-3 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Problem</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{problem}.</p>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Result</p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{result}{result.endsWith(".") ? "" : "."}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex gap-4">
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                        <Github size={15} /> Code
                      </a>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                          <ExternalLink size={15} /> Live Demo
                        </a>
                      )}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

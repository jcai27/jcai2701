import { ArrowDown, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const HeroSection = () => {
  const {
    data: { personalInfo },
    resumeUrl,
  } = usePortfolio();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="px-6 pb-16 pt-36 sm:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="section-shell"
      >
        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-end">
          <div>
            <p className="eyebrow">{personalInfo.title}</p>
            <h1 className="mt-4 max-w-3xl text-6xl font-semibold leading-[0.92] text-foreground sm:text-7xl lg:text-8xl">
              {personalInfo.name}
            </h1>
            <p className="mt-8 max-w-2xl border-l border-border pl-5 text-xl leading-relaxed text-muted-foreground">
              {personalInfo.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wider text-background transition-opacity hover:opacity-90"
              >
                Selected Work <ArrowDown size={16} />
              </button>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
              >
                <FileText size={16} /> Resume
              </a>
            </div>
          </div>

          <aside className="paper-card p-6">
            <p className="eyebrow">Location</p>
            <p className="mt-2 text-xl text-foreground">{personalInfo.location}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Available for internships, software engineering roles, and product-focused collaborations.
            </p>
          </aside>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

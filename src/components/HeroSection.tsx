import { ArrowDown, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const HeroSection = () => {
  const {
    data: { personalInfo, projects, experience },
    resumeUrl,
  } = usePortfolio();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-3xl text-center"
      >
        <p className="section-label mb-3">
          {personalInfo.title}
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {personalInfo.name}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {personalInfo.tagline}
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="soft-card px-4 py-3">
            <p className="text-2xl font-semibold text-foreground">{projects.length}+</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Projects Delivered</p>
          </div>
          <div className="soft-card px-4 py-3">
            <p className="text-2xl font-semibold text-foreground">{experience.length}+</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Experience Roles</p>
          </div>
          <div className="soft-card px-4 py-3">
            <p className="text-2xl font-semibold text-foreground">100%</p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Product Focused</p>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("projects")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-90"
          >
            View Projects <ArrowDown size={16} />
          </button>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary"
          >
            <FileText size={16} /> Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

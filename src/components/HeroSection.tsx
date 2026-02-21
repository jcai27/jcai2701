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
    <section id="hero" className="flex min-h-screen items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="section-shell max-w-3xl text-center"
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
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("projects")}
            className="cta-primary"
          >
            View Projects <ArrowDown size={16} />
          </button>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-secondary"
          >
            <FileText size={16} /> Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

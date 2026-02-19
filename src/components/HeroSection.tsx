import { ArrowDown, FileText } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl text-center"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          {personalInfo.title}
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {personalInfo.name}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {personalInfo.tagline}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => scrollTo("projects")}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View Projects <ArrowDown size={16} />
          </button>
          <a
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <FileText size={16} /> Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const AboutSection = () => {
  const {
    data: { personalInfo, skills },
  } = usePortfolio();

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">About</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">About Me</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-[200px_1fr]">
            <div className="soft-card flex flex-col items-center gap-3 p-5">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="h-40 w-40 rounded-full border-2 border-border object-cover bg-secondary"
              />
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin size={14} /> {personalInfo.location}
              </span>
            </div>

            <div>
              <p className="text-base leading-relaxed text-muted-foreground">{personalInfo.bio}</p>
              <div className="mt-8">
                <h3 className="section-label mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const AboutSection = () => {
  const {
    data: { personalInfo, skills },
  } = usePortfolio();

  return (
    <section id="about" className="px-6 py-20">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Profile</p>
          <h2 className="section-title">About</h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
            <div className="paper-card flex flex-col items-center gap-4 p-6">
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="h-40 w-40 rounded-full border border-border object-cover bg-secondary"
              />
              <span className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                <MapPin size={14} /> {personalInfo.location}
              </span>
            </div>

            <div className="paper-card p-8">
              <p className="text-lg leading-relaxed text-muted-foreground">{personalInfo.bio}</p>
              <div className="mt-10 border-t border-border pt-6">
                <h3 className="eyebrow">Tech Stack</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground"
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

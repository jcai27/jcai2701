import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const InterestsSection = () => {
  const {
    data: { personalInterests },
  } = usePortfolio();

  if (!personalInterests.length) return null;

  return (
    <section id="interests" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Beyond Work</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">A Bit About Me</h2>
          <p className="mt-2 text-muted-foreground">What I enjoy outside of building software.</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {personalInterests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-secondary-foreground"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InterestsSection;

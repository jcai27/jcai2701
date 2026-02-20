import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, GraduationCap, Download } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const Resume = () => {
  const {
    data: { personalInfo, skills, experience, education },
    resumeUrl,
  } = usePortfolio();

  return (
    <>
      <Navbar />
      <main className="px-6 pb-16 pt-28">
        <div className="section-shell max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Resume</p>
            <div className="mt-3 flex items-center justify-between border-b border-border pb-8">
              <div>
                <h1 className="text-5xl font-semibold text-foreground sm:text-6xl">{personalInfo.name}</h1>
                <p className="mt-2 text-xl text-muted-foreground">{personalInfo.title}</p>
              </div>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-background transition-opacity hover:opacity-90"
              >
                <Download size={16} /> Download PDF
              </a>
            </div>

            <div className="paper-card mt-10 p-7">
              <h2 className="eyebrow">Skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="paper-card mt-10 p-7">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Briefcase size={16} /> Experience
              </h2>
              <div className="mt-6 space-y-8 border-l-2 border-border pl-6">
                {experience.map((exp, idx) => (
                  <div key={`${exp.role}-${exp.company}-${idx}`} className="relative">
                    <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-foreground bg-background" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{exp.period}</p>
                    <h3 className="mt-1 text-3xl font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-base font-semibold text-muted-foreground">{exp.company}</p>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="paper-card mt-10 p-7">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <GraduationCap size={16} /> Education
              </h2>
              <div className="mt-6 space-y-8 border-l-2 border-border pl-6">
                {education.map((edu, idx) => (
                  <div key={`${edu.degree}-${edu.school}-${idx}`} className="relative">
                    <div className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-foreground bg-background" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{edu.period}</p>
                    <h3 className="mt-1 text-3xl font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-base font-semibold text-muted-foreground">{edu.school}</p>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Resume;

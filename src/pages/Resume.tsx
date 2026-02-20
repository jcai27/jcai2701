import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, GraduationCap, Download } from "lucide-react";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const initials = (value: string) =>
  value
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Resume = () => {
  const {
    data: { personalInfo, skills, experience, education },
    resumeUrl,
  } = usePortfolio();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">{personalInfo.name}</h1>
                <p className="mt-1 text-lg text-muted-foreground">{personalInfo.title}</p>
              </div>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <Download size={16} /> Download PDF
              </a>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-card/70 p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                <Briefcase size={16} /> Experience
              </h2>
              <div className="mt-6 space-y-4">
                {experience.map((exp, idx) => (
                  <div key={`${exp.role}-${exp.company}-${idx}`} className="rounded-lg border border-border bg-background/70 p-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-secondary/50">
                        {exp.logoUrl ? (
                          <img src={exp.logoUrl} alt={`${exp.company} logo`} className="h-full w-full object-contain p-1" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
                            {initials(exp.company)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">{exp.period}</p>
                        <h3 className="mt-1 text-base font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground">{exp.company}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 rounded-xl border border-border bg-card/70 p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                <GraduationCap size={16} /> Education
              </h2>
              <div className="mt-6 space-y-4">
                {education.map((edu, idx) => (
                  <div key={`${edu.degree}-${edu.school}-${idx}`} className="rounded-lg border border-border bg-background/70 p-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-secondary/50">
                        {edu.logoUrl ? (
                          <img src={edu.logoUrl} alt={`${edu.school} logo`} className="h-full w-full object-contain p-1" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-muted-foreground">
                            {initials(edu.school)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">{edu.period}</p>
                        <h3 className="mt-1 text-base font-semibold text-foreground">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.school}</p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
                      </div>
                    </div>
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

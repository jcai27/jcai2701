import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, GraduationCap, Download, Mail, Github, Linkedin, MapPin } from "lucide-react";
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
      <main className="px-6 pb-16 pt-24">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-xl border border-border bg-card/80 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="section-label">Resume</p>
                  <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{personalInfo.name}</h1>
                  <p className="mt-2 text-lg text-muted-foreground">{personalInfo.title}</p>
                </div>
                <div className="flex flex-col items-start gap-3 sm:items-end">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-foreground">
                      <Mail size={15} /> {personalInfo.email}
                    </a>
                    <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
                      <Github size={15} /> GitHub
                    </a>
                    <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
                      <Linkedin size={15} /> LinkedIn
                    </a>
                  </div>
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Download size={16} /> Download PDF
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
              <aside className="space-y-6">
                <section className="rounded-xl border border-border bg-card/70 p-5">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    <GraduationCap size={16} /> Education
                  </h2>
                  <div className="mt-4 divide-y divide-border">
                    {education.map((edu, idx) => (
                      <div key={`${edu.degree}-${edu.school}-${idx}`} className="py-3 first:pt-0 last:pb-0">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-secondary/50">
                            {edu.logoUrl ? (
                              <img src={edu.logoUrl} alt={`${edu.school} logo`} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[10px] font-semibold text-muted-foreground">
                                {initials(edu.school)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-medium text-muted-foreground">{edu.period}</p>
                            <h3 className="mt-0.5 text-sm font-semibold text-foreground">{edu.degree}</h3>
                            <p className="text-xs text-muted-foreground">{edu.school}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-border bg-card/70 p-5">
                  <h2 className="section-label">Skills</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </aside>

              <div className="space-y-6">
                <section className="rounded-xl border border-border bg-card/70 p-6">
                  <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    <Briefcase size={16} /> Experience
                  </h2>
                  <div className="mt-6 divide-y divide-border">
                    {experience.map((exp, idx) => (
                      <div key={`${exp.role}-${exp.company}-${idx}`} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex gap-4">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border bg-secondary/50">
                            {exp.logoUrl ? (
                              <img src={exp.logoUrl} alt={`${exp.company} logo`} className="h-full w-full object-cover" />
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
                </section>
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

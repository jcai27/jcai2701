import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { usePortfolio } from "@/context/PortfolioContext";

const ContactSection = () => {
  const {
    data: { personalInfo },
  } = usePortfolio();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="px-6 py-20">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Let&apos;s Connect</h2>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">Have a role or project in mind? Send a note and I&apos;ll respond quickly.</p>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
            <form onSubmit={handleSubmit} className="paper-card space-y-4 p-7">
              <input
                type="text" required placeholder="Your name"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="email" required placeholder="Your email"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <textarea
                required placeholder="Your message" rows={5}
                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-6 py-3 text-sm font-semibold uppercase tracking-wide text-background transition-opacity hover:opacity-90"
              >
                <Send size={16} /> Send Message
              </button>
            </form>

            <aside className="paper-card p-6">
              <p className="eyebrow">Profiles</p>
              <div className="mt-5 flex flex-col gap-4">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground">
                  <Github size={17} /> GitHub
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground">
                  <Linkedin size={17} /> LinkedIn
                </a>
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground">
                  <Mail size={17} /> Email
                </a>
              </div>
            </aside>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

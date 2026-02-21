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
      <div className="section-shell max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Contact</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Get In Touch</h2>
          <p className="mt-2 text-muted-foreground">Have a question or want to work together? Drop me a message.</p>

          <form onSubmit={handleSubmit} className="soft-card mt-8 space-y-4 p-6">
            <input
              type="text" required placeholder="Your name"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              type="email" required placeholder="Your email"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <textarea
              required placeholder="Your message" rows={5}
              value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button type="submit" className="cta-primary">
              <Send size={16} /> Send Message
            </button>
          </form>

          <div className="mt-12 flex items-center gap-6">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <Github size={20} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground transition-colors hover:text-foreground">
              <Mail size={20} />
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

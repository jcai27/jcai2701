import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePortfolio } from "@/context/PortfolioContext";
import { defaultPortfolioData, type Education, type Experience, type PortfolioData, type Project } from "@/data/portfolio";
import { useToast } from "@/hooks/use-toast";
import { uploadAsset } from "@/lib/portfolioServer";

const emptyProject: Project = {
  title: "",
  description: "",
  tech: [],
  github: "",
  live: "",
};

const emptyExperience: Experience = {
  role: "",
  company: "",
  period: "",
  description: "",
  logoUrl: "",
};

const emptyEducation: Education = {
  degree: "",
  school: "",
  period: "",
  description: "",
  logoUrl: "",
};

const moveItem = <T,>(items: T[], from: number, to: number) => {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};

const Admin = () => {
  const { data, saveData, resetData, isServerConfigured } = usePortfolio();
  const { toast } = useToast();
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [newSkill, setNewSkill] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [draggingProjectIndex, setDraggingProjectIndex] = useState<number | null>(null);
  const [draggingExperienceIndex, setDraggingExperienceIndex] = useState<number | null>(null);
  const [draggingEducationIndex, setDraggingEducationIndex] = useState<number | null>(null);

  useEffect(() => {
    setDraft(data);
  }, [data]);

  const resumeName = useMemo(() => {
    return draft.resume?.fileName || "Using default resume file";
  }, [draft.resume]);

  const setPersonalField = (field: keyof PortfolioData["personalInfo"], value: string) => {
    setDraft((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const saveChanges = async () => {
    try {
      setIsSaving(true);
      await saveData(draft);
      toast({
        title: "Saved",
        description: isServerConfigured
          ? "Your website content has been saved to Supabase."
          : "Saved locally. Configure Supabase env vars for server persistence.",
      });
    } catch {
      toast({
        title: "Save failed",
        description: "Could not save to server. Check Supabase config and policies.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetAll = async () => {
    try {
      resetData();
      setDraft(defaultPortfolioData);
      await saveData(defaultPortfolioData);
      toast({
        title: "Reset",
        description: "Content reset and synced.",
      });
    } catch {
      toast({
        title: "Reset locally",
        description: "Defaults applied locally, but sync to server failed.",
      });
    }
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleResumeUpload = async (file: File | null) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast({ title: "Invalid file", description: "Please upload a PDF resume." });
      return;
    }

    let assetUrl = await fileToDataUrl(file);
    if (isServerConfigured) {
      try {
        const uploadedUrl = await uploadAsset(file, "resumes");
        if (uploadedUrl) assetUrl = uploadedUrl;
      } catch {
        toast({
          title: "Resume upload warning",
          description: "Storage upload failed, using browser-local copy for now.",
        });
      }
    }

    setDraft((prev) => ({
      ...prev,
      resume: {
        fileName: file.name,
        dataUrl: assetUrl,
      },
    }));
  };

  const handleAvatarUpload = async (file: File | null) => {
    if (!file) return;
    let assetUrl = await fileToDataUrl(file);
    if (isServerConfigured) {
      try {
        const uploadedUrl = await uploadAsset(file, "avatars");
        if (uploadedUrl) assetUrl = uploadedUrl;
      } catch {
        toast({
          title: "Avatar upload warning",
          description: "Storage upload failed, using browser-local copy for now.",
        });
      }
    }
    setPersonalField("avatarUrl", assetUrl);
  };

  const uploadLogo = async (file: File | null) => {
    if (!file) return null;
    let assetUrl = await fileToDataUrl(file);
    if (isServerConfigured) {
      try {
        const uploadedUrl = await uploadAsset(file, "logos");
        if (uploadedUrl) assetUrl = uploadedUrl;
      } catch {
        toast({
          title: "Logo upload warning",
          description: "Storage upload failed, using browser-local copy for now.",
        });
      }
    }
    return assetUrl;
  };

  const handleExperienceLogoUpload = async (idx: number, file: File | null) => {
    const assetUrl = await uploadLogo(file);
    if (!assetUrl) return;
    setDraft((prev) => ({
      ...prev,
      experience: prev.experience.map((x, i) => (i === idx ? { ...x, logoUrl: assetUrl } : x)),
    }));
  };

  const handleEducationLogoUpload = async (idx: number, file: File | null) => {
    const assetUrl = await uploadLogo(file);
    if (!assetUrl) return;
    setDraft((prev) => ({
      ...prev,
      education: prev.education.map((x, i) => (i === idx ? { ...x, logoUrl: assetUrl } : x)),
    }));
  };

  const reorderProjects = (toIndex: number) => {
    setDraft((prev) => {
      if (draggingProjectIndex === null || draggingProjectIndex === toIndex) return prev;
      return {
        ...prev,
        projects: moveItem(prev.projects, draggingProjectIndex, toIndex),
      };
    });
    setDraggingProjectIndex(null);
  };

  const reorderExperience = (toIndex: number) => {
    setDraft((prev) => {
      if (draggingExperienceIndex === null || draggingExperienceIndex === toIndex) return prev;
      return {
        ...prev,
        experience: moveItem(prev.experience, draggingExperienceIndex, toIndex),
      };
    });
    setDraggingExperienceIndex(null);
  };

  const reorderEducation = (toIndex: number) => {
    setDraft((prev) => {
      if (draggingEducationIndex === null || draggingEducationIndex === toIndex) return prev;
      return {
        ...prev,
        education: moveItem(prev.education, draggingEducationIndex, toIndex),
      };
    });
    setDraggingEducationIndex(null);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">Admin Control Panel</h1>
            <p className="mt-2 text-muted-foreground">
              Edit your website content, upload a new resume, and manage projects and experience.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Persistence: {isServerConfigured ? "Supabase enabled" : "local browser only"}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => void saveChanges()}
                disabled={isSaving}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setDraft(data)}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Revert Unsaved
              </button>
              <button
                onClick={() => void resetAll()}
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Reset to Defaults
              </button>
            </div>
          </div>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-card-foreground">Personal Info</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={draft.personalInfo.name} onChange={(e) => setPersonalField("name", e.target.value)} placeholder="Name" />
              <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={draft.personalInfo.title} onChange={(e) => setPersonalField("title", e.target.value)} placeholder="Title" />
              <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" value={draft.personalInfo.tagline} onChange={(e) => setPersonalField("tagline", e.target.value)} placeholder="Tagline" />
              <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={draft.personalInfo.email} onChange={(e) => setPersonalField("email", e.target.value)} placeholder="Email" />
              <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={draft.personalInfo.location} onChange={(e) => setPersonalField("location", e.target.value)} placeholder="Location" />
              <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={draft.personalInfo.github} onChange={(e) => setPersonalField("github", e.target.value)} placeholder="GitHub URL" />
              <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={draft.personalInfo.linkedin} onChange={(e) => setPersonalField("linkedin", e.target.value)} placeholder="LinkedIn URL" />
              <textarea className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" rows={5} value={draft.personalInfo.bio} onChange={(e) => setPersonalField("bio", e.target.value)} placeholder="Bio" />
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-card-foreground">Avatar Upload</label>
              <input
                type="file"
                accept="image/*"
                className="mt-2 block text-sm text-muted-foreground"
                onChange={(e) => void handleAvatarUpload(e.target.files?.[0] || null)}
              />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-card-foreground">Resume</h2>
            <p className="mt-2 text-sm text-muted-foreground">{resumeName}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <input
                type="file"
                accept="application/pdf"
                className="block text-sm text-muted-foreground"
                onChange={(e) => void handleResumeUpload(e.target.files?.[0] || null)}
              />
              <button
                onClick={() => setDraft((prev) => ({ ...prev, resume: null }))}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Use Default Resume
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-card-foreground">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {draft.skills.map((skill) => (
                <button
                  key={skill}
                  onClick={() => setDraft((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))}
                  className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {skill} x
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
              />
              <button
                onClick={() => {
                  const value = newSkill.trim();
                  if (!value) return;
                  setDraft((prev) => ({ ...prev, skills: [...prev.skills, value] }));
                  setNewSkill("");
                }}
                className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
              >
                Add
              </button>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-card-foreground">Projects</h2>
              <button
                onClick={() => setDraft((prev) => ({ ...prev, projects: [...prev.projects, emptyProject] }))}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Add Project
              </button>
            </div>
            <div className="mt-5 space-y-4">
              {draft.projects.map((project, idx) => (
                <div
                  key={`project-${idx}`}
                  draggable
                  onDragStart={() => setDraggingProjectIndex(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => reorderProjects(idx)}
                  onDragEnd={() => setDraggingProjectIndex(null)}
                  className={`rounded-lg border p-4 ${draggingProjectIndex === idx ? "border-foreground/40 bg-secondary/30" : "border-border"}`}
                >
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Drag to reorder</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={project.title} onChange={(e) => setDraft((prev) => ({ ...prev, projects: prev.projects.map((p, i) => (i === idx ? { ...p, title: e.target.value } : p)) }))} placeholder="Project title" />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={project.github} onChange={(e) => setDraft((prev) => ({ ...prev, projects: prev.projects.map((p, i) => (i === idx ? { ...p, github: e.target.value } : p)) }))} placeholder="GitHub URL" />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" value={project.live} onChange={(e) => setDraft((prev) => ({ ...prev, projects: prev.projects.map((p, i) => (i === idx ? { ...p, live: e.target.value } : p)) }))} placeholder="Live URL (optional)" />
                    <textarea className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" rows={3} value={project.description} onChange={(e) => setDraft((prev) => ({ ...prev, projects: prev.projects.map((p, i) => (i === idx ? { ...p, description: e.target.value } : p)) }))} placeholder="Project description" />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" value={project.tech.join(", ")} onChange={(e) => setDraft((prev) => ({ ...prev, projects: prev.projects.map((p, i) => (i === idx ? { ...p, tech: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) } : p)) }))} placeholder="Tech stack (comma separated)" />
                  </div>
                  <button
                    onClick={() => setDraft((prev) => ({ ...prev, projects: prev.projects.filter((_, i) => i !== idx) }))}
                    className="mt-3 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                  >
                    Remove Project
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-card-foreground">Experience</h2>
              <button
                onClick={() => setDraft((prev) => ({ ...prev, experience: [...prev.experience, emptyExperience] }))}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Add Experience
              </button>
            </div>
            <div className="mt-5 space-y-4">
              {draft.experience.map((item, idx) => (
                <div
                  key={`experience-${idx}`}
                  draggable
                  onDragStart={() => setDraggingExperienceIndex(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => reorderExperience(idx)}
                  onDragEnd={() => setDraggingExperienceIndex(null)}
                  className={`rounded-lg border p-4 ${draggingExperienceIndex === idx ? "border-foreground/40 bg-secondary/30" : "border-border"}`}
                >
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Drag to reorder</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={item.role} onChange={(e) => setDraft((prev) => ({ ...prev, experience: prev.experience.map((x, i) => (i === idx ? { ...x, role: e.target.value } : x)) }))} placeholder="Role" />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={item.company} onChange={(e) => setDraft((prev) => ({ ...prev, experience: prev.experience.map((x, i) => (i === idx ? { ...x, company: e.target.value } : x)) }))} placeholder="Company" />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" value={item.logoUrl || ""} onChange={(e) => setDraft((prev) => ({ ...prev, experience: prev.experience.map((x, i) => (i === idx ? { ...x, logoUrl: e.target.value } : x)) }))} placeholder="Company logo URL (optional)" />
                    <input type="file" accept="image/*" className="text-sm text-muted-foreground sm:col-span-2" onChange={(e) => void handleExperienceLogoUpload(idx, e.target.files?.[0] || null)} />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" value={item.period} onChange={(e) => setDraft((prev) => ({ ...prev, experience: prev.experience.map((x, i) => (i === idx ? { ...x, period: e.target.value } : x)) }))} placeholder="Period (e.g. 2022 - Present)" />
                    <textarea className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" rows={3} value={item.description} onChange={(e) => setDraft((prev) => ({ ...prev, experience: prev.experience.map((x, i) => (i === idx ? { ...x, description: e.target.value } : x)) }))} placeholder="Description" />
                  </div>
                  <button
                    onClick={() => setDraft((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== idx) }))}
                    className="mt-3 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                  >
                    Remove Experience
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-card-foreground">Education</h2>
              <button
                onClick={() => setDraft((prev) => ({ ...prev, education: [...prev.education, emptyEducation] }))}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Add Education
              </button>
            </div>
            <div className="mt-5 space-y-4">
              {draft.education.map((item, idx) => (
                <div
                  key={`education-${idx}`}
                  draggable
                  onDragStart={() => setDraggingEducationIndex(idx)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => reorderEducation(idx)}
                  onDragEnd={() => setDraggingEducationIndex(null)}
                  className={`rounded-lg border p-4 ${draggingEducationIndex === idx ? "border-foreground/40 bg-secondary/30" : "border-border"}`}
                >
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Drag to reorder</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={item.degree} onChange={(e) => setDraft((prev) => ({ ...prev, education: prev.education.map((x, i) => (i === idx ? { ...x, degree: e.target.value } : x)) }))} placeholder="Degree" />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm" value={item.school} onChange={(e) => setDraft((prev) => ({ ...prev, education: prev.education.map((x, i) => (i === idx ? { ...x, school: e.target.value } : x)) }))} placeholder="School" />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" value={item.logoUrl || ""} onChange={(e) => setDraft((prev) => ({ ...prev, education: prev.education.map((x, i) => (i === idx ? { ...x, logoUrl: e.target.value } : x)) }))} placeholder="University logo URL (optional)" />
                    <input type="file" accept="image/*" className="text-sm text-muted-foreground sm:col-span-2" onChange={(e) => void handleEducationLogoUpload(idx, e.target.files?.[0] || null)} />
                    <input className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" value={item.period} onChange={(e) => setDraft((prev) => ({ ...prev, education: prev.education.map((x, i) => (i === idx ? { ...x, period: e.target.value } : x)) }))} placeholder="Period (e.g. 2018 - 2022)" />
                    <textarea className="rounded-lg border border-border bg-background px-3 py-2 text-sm sm:col-span-2" rows={3} value={item.description} onChange={(e) => setDraft((prev) => ({ ...prev, education: prev.education.map((x, i) => (i === idx ? { ...x, description: e.target.value } : x)) }))} placeholder="Description" />
                  </div>
                  <button
                    onClick={() => setDraft((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== idx) }))}
                    className="mt-3 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary"
                  >
                    Remove Education
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;

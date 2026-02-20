import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import InterestsSection from "@/components/InterestsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main className="pt-16">
      <HeroSection />
      <AboutSection />
      <InterestsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default Index;

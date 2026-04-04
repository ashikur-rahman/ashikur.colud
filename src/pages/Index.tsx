import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import WorkflowSection from "@/components/ATSScoreSection";
import ProjectsSection from "@/components/ProjectsSection";
import ATSScoreSection from "@/components/WorkflowSection";
import ChatBot from "@/components/ChatBot";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-gradient-to-b from-background via-background to-card/30">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <WorkflowSection />
    <ProjectsSection />
    <ATSScoreSection />
    <ContactSection />
    <Footer />
    <ChatBot />
  </div>
);

export default Index;
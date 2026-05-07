import BootScreen from "@/components/BootScreen";
import CustomCursor from "@/components/CustomCursor";
import ThreeCanvas from "@/components/ThreeCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import TheLab from "@/components/sections/LabProjects";
import CampaignsSection from "@/components/sections/CampaignsSection";
import Pedigree from "@/components/sections/Trust";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BootScreen />
      <CustomCursor />
      <ThreeCanvas />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Nav />
        <Hero />
        <TheLab />
        <CampaignsSection />
        <Pedigree />
        <Process />
        <CTA />
        <Footer />
      </div>
    </>
  );
}

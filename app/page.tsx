import Hero from "@/components/Hero";

import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Clients from "@/components/Clients";
import About from "@/components/About";
import BoxCustomizer3D from "@/components/BoxCustomizer3D";
import PackagingStory from "@/components/PackagingStory";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <BoxCustomizer3D />
      <About />
      <Services />
      <PackagingStory />
      <Portfolio />
      <Contact />
    </>
  );
}

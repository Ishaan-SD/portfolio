import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Sticky Top Header Navigation */}
      <Navbar />

      {/* Main Sections Wrapper */}
      <main className="flex-1 flex flex-col w-full">
        {/* Hero Landing */}
        <Hero />
        
        {/* About Journey */}
        <About />
        
        {/* Tech Ecosystem */}
        <Skills />
        
        {/* Showcase gallery */}
        <Projects />
        
        {/* Career Timeline */}
        <Experience />
        
        {/* Connect Form */}
        <Contact />
      </main>

      {/* Brand Footer */}
      <Footer />
    </>
  );
}

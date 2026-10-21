import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import WorkExperience from "./components/WorkExperience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div className="mx-auto max-w-[64rem] px-6">
      <Navbar />
      <main className="space-y-16 md:space-y-24">
        <Hero />
        <WorkExperience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="mt-16 py-8 text-[15px] text-graphite md:mt-24">
        © {new Date().getFullYear()} Denes Kosztyuk
      </footer>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

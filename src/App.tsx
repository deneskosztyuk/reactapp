import React from "react";
import BackgroundLayout from "./components/BackgroundLayout";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import WorkExperience from "./components/WorkExperience";
import Contact from "./components/Contact";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div style={{ overflowX: "hidden", maxWidth: "100vw", width: "100%" }}>
      <BackgroundLayout>
        <Navbar />
        <Hero />
        <WorkExperience />
        <Projects />
        <Contact />
      </BackgroundLayout>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
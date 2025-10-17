import React from "react";
import { SmoothScroll } from "react-smooth-scrolll";
import BackgroundLayout from "./components/BackgroundLayout";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import WorkExperience from "./components/WorkExperience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div style={{ overflowX: 'hidden', maxWidth: '100vw', width: '100%' }}>
      <SmoothScroll scrollSpeed={1} smoothness={0.1}>
        <BackgroundLayout>
          <Navbar />
          <Hero />
          <WorkExperience />
          <Projects />
          <Contact />
        </BackgroundLayout>
      </SmoothScroll>
    </div>
  );
}

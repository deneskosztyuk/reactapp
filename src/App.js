import React from "react";
import { SmoothScroll } from "react-smooth-scrolll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import WorkExperience from "./components/WorkExperience";
import Contact from "./components/Contact";

export default function App() {
  return (
    <SmoothScroll scrollSpeed={1} smoothness={0.1}>
      <div className="bg-slate-950 min-h-screen">
        <Navbar />
        <section id="hero"><Hero /></section>
        <section id="work experience"><WorkExperience /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </div>
    </SmoothScroll>
  );
}

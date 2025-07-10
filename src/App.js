import React from "react";
import { SmoothScroll } from "react-smooth-scrolll";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Freelance from "./components/Freelance";
import Contact from "./components/Contact";

export default function App() {
  return (
    <SmoothScroll scrollSpeed={1} smoothness={0.1}>
      <div className="bg-slate-950 min-h-screen">
        <Navbar />
        <section id="hero"><Hero /></section>
        <section id="projects"><Projects /></section>
        {/* <section id="freelance"><Freelance /></section> */}
        <section id="contact"><Contact /></section>
      </div>
    </SmoothScroll>
  );
}

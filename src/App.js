import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Freelance from "./components/Freelance";
import Contact from "./components/Contact";


export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <section id="hero"><Hero /></section>
      <section id="projects"><Projects /></section>
      <section id="freelance"><Freelance /></section>
    </div>
  );
}

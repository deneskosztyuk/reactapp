import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

console.log("Navbar:", Navbar);
console.log("Hero:", Hero);
console.log("Projects:", Projects);
console.log("Contact:", Contact);

export default function App() {
  return (
    <div className="bg-gradient-to-b from-black to-purple-700 min-h-screen">
      <Navbar />
      <section id="hero"><Hero /></section>
      <section id="projects"><Projects /></section>
      <section id="contact"><Contact /></section>
    </div>
  );
}

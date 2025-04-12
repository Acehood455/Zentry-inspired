import React from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Navbar from "./sections/Navbar";
import Features from "./sections/Features";
import Story from "./sections/Story";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;

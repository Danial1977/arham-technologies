import React from "react";

const Hero = () => {
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,ai')" }}
    >
      <div className="bg-black bg-opacity-60 p-8 rounded-xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Innovating the Future with Technology
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          AI • Cybersecurity • Cloud • Software Solutions
        </p>
        <a
          href="#contact"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
};

export default Hero;

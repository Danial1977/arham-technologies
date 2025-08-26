import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-600">
          Arham<span className="text-gray-800">Technologies</span>
        </h1>
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li><a href="#about" className="hover:text-blue-600">About</a></li>
          <li><a href="#services" className="hover:text-blue-600">Services</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
        <button className="md:hidden p-2 border rounded">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;

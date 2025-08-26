import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-6">
      <p>&copy; {new Date().getFullYear()} Arham Technologies Ltd. All Rights Reserved.</p>
      <div className="mt-3 space-x-4">
        <a href="#" className="hover:text-blue-400">LinkedIn</a>
        <a href="#" className="hover:text-blue-400">Twitter</a>
        <a href="#" className="hover:text-blue-400">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;

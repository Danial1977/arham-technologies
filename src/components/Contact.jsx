import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 max-w-4xl mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
      <form className="space-y-6">
        <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" required />
        <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" required />
        <textarea placeholder="Your Message" rows="5" className="w-full p-3 border rounded-lg" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;

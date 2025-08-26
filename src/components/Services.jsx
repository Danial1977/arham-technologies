import React from "react";

const services = [
  {
    title: "Artificial Intelligence",
    desc: "AI-driven automation, chatbots, and predictive analytics.",
    img: "https://source.unsplash.com/400x300/?artificial-intelligence"
  },
  {
    title: "Cybersecurity",
    desc: "Advanced security solutions to protect your data and systems.",
    img: "https://source.unsplash.com/400x300/?cybersecurity"
  },
  {
    title: "Cloud Solutions",
    desc: "Scalable cloud architecture and migration services.",
    img: "https://source.unsplash.com/400x300/?cloud,server"
  },
  {
    title: "Software Development",
    desc: "Custom software, web, and mobile app development.",
    img: "https://source.unsplash.com/400x300/?software,development"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
              <img src={service.img} alt={service.title} className="rounded-lg mb-4 w-full h-40 object-cover" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStackTicker from './components/TechStackTicker';
import ServicesSection from './components/ServicesSection';
import AiEstimator from './components/AiEstimator';
import FounderSection from './components/FounderSection';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [estimateData, setEstimateData] = useState(null);

  const handleSelectEstimate = (data) => {
    setEstimateData(data);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TechStackTicker />
        <ServicesSection />
        <AiEstimator onSelectEstimate={handleSelectEstimate} />
        <FounderSection />
        <WhyUsSection />
        <ContactSection prefillData={estimateData} />
      </main>
      <Footer />
    </div>
  );
}

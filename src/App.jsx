import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechStackTicker from './components/TechStackTicker';
import ServicesSection from './components/ServicesSection';
import AiEstimator from './components/AiEstimator';
import FounderSection from './components/FounderSection';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import DatabasePortal from './components/DatabasePortal';

export default function App() {
  const [currentView, setCurrentView] = useState('site');
  const [estimateData, setEstimateData] = useState(null);

  useEffect(() => {
    // Check initial hash
    if (window.location.hash === '#database') {
      setCurrentView('database');
    }

    const handleHashChange = () => {
      if (window.location.hash === '#database') {
        setCurrentView('database');
      } else if (window.location.hash === '' || window.location.hash.startsWith('#services') || window.location.hash.startsWith('#contact')) {
        setCurrentView('site');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenDatabase = () => {
    window.location.hash = 'database';
    setCurrentView('database');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    window.history.pushState(null, '', window.location.pathname);
    setCurrentView('site');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEstimate = (data) => {
    setEstimateData(data);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'database') {
    return <DatabasePortal onBackToSite={handleBackToSite} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      <Navbar onOpenDatabase={handleOpenDatabase} />
      <main className="flex-grow">
        <Hero />
        <TechStackTicker />
        <ServicesSection />
        <AiEstimator onSelectEstimate={handleSelectEstimate} />
        <FounderSection />
        <WhyUsSection />
        <ContactSection prefillData={estimateData} onOpenDatabase={handleOpenDatabase} />
      </main>
      <Footer onOpenDatabase={handleOpenDatabase} />
    </div>
  );
}

import React, { useState } from 'react';
import { 
  BrainCircuit, 
  GraduationCap, 
  Sparkles, 
  Share2, 
  Bot, 
  Workflow, 
  ShoppingBag, 
  LifeBuoy, 
  CheckCircle2, 
  ArrowRight,
  X
} from 'lucide-react';
import { YoutubeIcon } from './BrandIcons';
import { services } from '../data/services';

const iconMap = {
  BrainCircuit,
  Youtube: YoutubeIcon,
  GraduationCap,
  Sparkles,
  Share2,
  Bot,
  Workflow,
  ShoppingBag,
  LifeBuoy
};

export default function ServicesSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const filters = [
    { label: 'All Capabilities', value: 'all' },
    { label: 'Enterprise AI & Agents', value: 'enterprise' },
    { label: 'Channel Automation', value: 'automation' },
    { label: 'Training & Creative', value: 'training' },
    { label: 'Managed Support', value: 'support' },
  ];

  const filteredServices = services.filter(service => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'training') return service.category === 'training' || service.category === 'generative';
    return service.category === activeFilter;
  });

  return (
    <section id="services" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-xs font-bold text-cyan-800 uppercase tracking-widest mb-3">
            Comprehensive Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Engineered for <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Exponential Growth</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            From automated digital media channels and autonomous agents to custom enterprise LLMs and corporate Claude/Antigravity training—we build the future of work.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeFilter === filter.value
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20 font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon] || BrainCircuit;
            return (
              <div
                key={service.id}
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between border border-slate-200/90 group relative overflow-hidden"
              >
                {/* Top Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.gradient}`} />

                <div>
                  {/* Icon Box */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6 shadow-sm`}>
                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-slate-800 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk'] mb-3 group-hover:text-cyan-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 mb-6">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-cyan-800 bg-cyan-50 border border-cyan-200/70 px-2.5 py-1 rounded-md">
                    {service.highlight}
                  </span>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-slate-600 group-hover:text-cyan-700 flex items-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Service Deep Dive */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedService.gradient} p-0.5`}>
                  <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                    {(() => {
                      const IconComponent = iconMap[selectedService.icon] || BrainCircuit;
                      return <IconComponent className="w-5 h-5 text-slate-800" />;
                    })()}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
                  {selectedService.title}
                </h3>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {selectedService.shortDesc}
              </p>

              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider font-bold text-cyan-800 mb-3">
                  Scope of Delivery & Architecture
                </h4>
                <div className="space-y-3">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Backed by 25+ Years Enterprise IT Pedigree
                </span>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 transition-all"
                >
                  Inquire For This Service
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

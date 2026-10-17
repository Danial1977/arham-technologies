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
    <section id="services" className="py-24 bg-white relative border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE6] border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] uppercase tracking-widest mb-3">
            Comprehensive Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26160C] tracking-tight font-['Cinzel']">
            Engineered for <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Exponential Growth</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#664E40]">
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
                    ? 'bg-[#8C5E2D] text-white shadow-md shadow-[#8C5E2D]/25 font-bold'
                    : 'bg-[#F5EFE6] text-[#664E40] hover:bg-[#E8DEC8] border border-[#E8DFD5]'
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
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between border border-[#E8DFD5] group relative overflow-hidden bg-white"
              >
                {/* Top Heritage Walnut Accent */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B]" />

                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8C5E2D] via-[#B89F70] to-[#523C1B] p-0.5 mb-6 shadow-xs">
                    <div className="w-full h-full bg-[#FAF7F2] rounded-[10px] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#26160C] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-[#26160C] font-['Cinzel'] mb-3 group-hover:text-[#8C5E2D] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[#664E40] leading-relaxed mb-6">
                    {service.shortDesc}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 mb-6">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#332015]">
                        <CheckCircle2 className="w-4 h-4 text-[#8C5E2D] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#E8DFD5]/60 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#8C5E2D] bg-[#F5EFE6] border border-[#E8DFD5] px-2.5 py-1 rounded-md">
                    {service.highlight}
                  </span>
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-bold text-[#664E40] group-hover:text-[#8C5E2D] flex items-center gap-1 transition-colors"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26160C]/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#FAF7F2] border border-[#E8DFD5] rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl text-[#332015]">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-[#F5EFE6] text-[#664E40] hover:text-[#26160C] hover:bg-[#E8DEC8] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8C5E2D] to-[#523C1B] p-0.5">
                  <div className="w-full h-full bg-[#FAF7F2] rounded-[6px] flex items-center justify-center">
                    {(() => {
                      const IconComponent = iconMap[selectedService.icon] || BrainCircuit;
                      return <IconComponent className="w-5 h-5 text-[#26160C]" />;
                    })()}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#26160C] font-['Cinzel']">
                  {selectedService.title}
                </h3>
              </div>

              <p className="text-[#664E40] text-sm leading-relaxed mb-6">
                {selectedService.shortDesc}
              </p>

              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider font-bold text-[#8C5E2D] mb-3">
                  Scope of Delivery & Architecture
                </h4>
                <div className="space-y-3">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#E8DFD5] text-xs sm:text-sm text-[#332015]">
                      <CheckCircle2 className="w-4 h-4 text-[#8C5E2D] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#E8DFD5]">
                <span className="text-xs text-[#664E40]">
                  Backed by 25+ Years Enterprise IT Pedigree
                </span>
                <a
                  href="#contact"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-md shadow-[#8C5E2D]/20 transition-all"
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

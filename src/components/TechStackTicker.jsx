import React from 'react';
import { Cpu, ArrowUpRight } from 'lucide-react';
import { technologies } from '../data/technologies';

export default function TechStackTicker() {
  return (
    <section id="technologies" className="py-20 bg-[#F5EFE6]/60 relative border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#8C5E2D]" /> Frontier AI Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26160C] tracking-tight font-['Cinzel']">
            Mastery Across <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Frontier AI & Cloud Engines</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#664E40]">
            We don't rely on generic wrappers. Arham Technologies architects enterprise solutions directly with the world's most advanced foundational models and autonomous frameworks.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between border border-[#E8DFD5] group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md border bg-[#F5EFE6] text-[#8C5E2D] border-[#E8DFD5]">
                    {tech.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[#8C7A6D] group-hover:text-[#8C5E2D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-[#26160C] font-['Cinzel'] mb-2 group-hover:text-[#8C5E2D] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs font-bold text-[#8C5E2D] mb-3">
                  {tech.role}
                </p>
                <p className="text-sm text-[#664E40] leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DFD5]/60 flex items-center justify-between text-xs text-[#664E40]">
                <span className="font-medium">Enterprise Grade</span>
                <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

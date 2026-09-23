import React from 'react';
import { Cpu, ArrowUpRight } from 'lucide-react';
import { technologies } from '../data/technologies';

export default function TechStackTicker() {
  return (
    <section id="technologies" className="py-20 bg-slate-50/70 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-xs font-bold text-cyan-800 uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-700" /> Frontier AI Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Mastery Across <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">Frontier AI & Cloud Engines</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We don't rely on generic wrappers. Arham Technologies architects enterprise solutions directly with the world’s most advanced foundational models and autonomous frameworks.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between border border-slate-200/90 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md border ${tech.badgeColor}`}>
                    {tech.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk'] mb-2 group-hover:text-cyan-700 transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs font-bold text-cyan-700 mb-3">
                  {tech.role}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
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

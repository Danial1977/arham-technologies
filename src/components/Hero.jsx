import React from 'react';
import { ArrowRight, Sparkles, Zap, Terminal } from 'lucide-react';
import { stats } from '../data/stats';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] glow-cyan rounded-full pointer-events-none blur-3xl opacity-80" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] glow-purple rounded-full pointer-events-none blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-200 text-xs sm:text-sm text-cyan-800 font-semibold mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-600 animate-ping" />
            <span className="text-slate-900 font-bold">25+ Years Enterprise IT Heritage</span>
            <span className="text-slate-300">•</span>
            <span className="text-cyan-700 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> Frontier AI & Channel Automation
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6 font-['Space_Grotesk']">
            Autonomous <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">AI Solutions</span> & Media Automation Built for Scale
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Arham Technologies transforms modern enterprises through custom <span className="text-slate-900 font-semibold">Autonomous AI Agents</span>, automated <span className="text-slate-900 font-semibold">YouTube & Facebook channels</span>, high-performance <span className="text-slate-900 font-semibold">eCommerce development</span>, and corporate upskilling in <span className="text-slate-900 font-semibold">Claude & Google Antigravity</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl shadow-cyan-600/20 hover:shadow-cyan-600/30 transition-all duration-300 group"
            >
              <span>Explore Capabilities</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-slate-700 bg-white hover:bg-slate-50 hover:text-slate-900 transition-all duration-300 border border-slate-200 shadow-sm"
            >
              <Zap className="w-4 h-4 text-cyan-600" />
              <span>Book Discovery Call</span>
            </a>
          </div>

          {/* Live Frontier Models Ticker Strip */}
          <div className="glass-panel rounded-2xl p-4 sm:p-5 max-w-3xl mx-auto border border-slate-200/90 shadow-sm mb-16">
            <div className="flex items-center justify-between gap-3 text-xs text-slate-500 mb-3 px-2">
              <span className="flex items-center gap-1.5 font-bold text-slate-700">
                <Terminal className="w-3.5 h-3.5 text-cyan-600" /> Frontier Stack Mastery
              </span>
              <span className="text-cyan-700 font-semibold text-[11px] bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-100">
                Production Deployed
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[
                { name: 'Google VEO 3', role: 'AI Video Gen' },
                { name: 'Anthropic Claude', role: 'Reasoning & Coding' },
                { name: 'Google Antigravity', role: 'Autonomous Agents' },
                { name: 'xAI Grok', role: 'Real-Time Insights' },
                { name: 'Google Flow', role: 'Cloud Pipelines' },
                { name: 'YouTube / Meta APIs', role: 'Channel Automation' },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 hover:border-cyan-400 hover:bg-white transition-colors shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  <span className="font-bold text-slate-900">{tech.name}</span>
                  <span className="text-slate-500 text-[10px]">({tech.role})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-slate-200/80">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-cyan-400 hover:shadow-md transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Space_Grotesk'] bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text group-hover:from-cyan-700 group-hover:to-blue-700 transition-all">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-cyan-700 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

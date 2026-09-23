import React from 'react';
import { ShieldCheck, Zap, Lock, RefreshCw, BarChart3, Users, CheckCircle2 } from 'lucide-react';

export default function WhyUsSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Quarter-Century Enterprise Track Record",
      description: "Steered by 25+ years in IT infrastructure and enterprise systems. We engineer robust, audit-compliant solutions built to survive real-world scale.",
      accent: "text-cyan-600"
    },
    {
      icon: Zap,
      title: "Frontier Model Specialists",
      description: "First-movers in Google VEO 3, Anthropic Claude 3.7, xAI Grok, and Google Antigravity. We extract maximum intelligence and creative output from top-tier models.",
      accent: "text-amber-600"
    },
    {
      icon: Lock,
      title: "Enterprise Privacy & Zero Data Leakage",
      description: "Strict isolation of proprietary enterprise knowledge, SOC-2 compliant vector vaults, and zero unauthorized data retention across LLM providers.",
      accent: "text-emerald-600"
    },
    {
      icon: RefreshCw,
      title: "Autonomous End-to-End Automation",
      description: "From video generation and publishing on YouTube/Facebook to multi-step AI agent workflows, we build complete zero-touch business engines.",
      accent: "text-indigo-600"
    },
    {
      icon: Users,
      title: "Hands-On Training & Knowledge Transfer",
      description: "We don't leave you with a black box. Our masterclasses equip your internal staff with the skills to operate, prompt, and expand their AI ecosystem.",
      accent: "text-purple-600"
    },
    {
      icon: BarChart3,
      title: "24/7 SLA-Backed Application Support",
      description: "Dedicated L1-L3 engineering support teams ensure continuous uptime, sub-second latency monitoring, and prompt incident resolution.",
      accent: "text-blue-600"
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-50/70 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-xs font-bold text-cyan-800 uppercase tracking-widest mb-3">
            The Arham Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Why Visionary Leaders <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">Partner With Us</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            We bridge the gap between speculative AI trends and durable enterprise software engineering.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-8 rounded-2xl border border-slate-200/90 flex flex-col justify-between bg-white shadow-xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6">
                    <Icon className={`w-6 h-6 ${pillar.accent}`} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk'] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Guaranteed Deliverable</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

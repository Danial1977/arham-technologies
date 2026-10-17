import React from 'react';
import { ShieldCheck, Zap, Lock, RefreshCw, BarChart3, Users, CheckCircle2 } from 'lucide-react';

export default function WhyUsSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Quarter-Century Enterprise Track Record",
      description: "Steered by 25+ years in IT infrastructure and enterprise systems. We engineer robust, audit-compliant solutions built to survive real-world scale.",
      accent: "text-[#8C5E2D]"
    },
    {
      icon: Zap,
      title: "Frontier Model Specialists",
      description: "First-movers in Google VEO 3, Anthropic Claude 3.7, xAI Grok, and Google Antigravity. We extract maximum intelligence and creative output from top-tier models.",
      accent: "text-[#B89F70]"
    },
    {
      icon: Lock,
      title: "Enterprise Privacy & Zero Data Leakage",
      description: "Strict isolation of proprietary enterprise knowledge, SOC-2 compliant vector vaults, and zero unauthorized data retention across LLM providers.",
      accent: "text-[#523C1B]"
    },
    {
      icon: RefreshCw,
      title: "Autonomous End-to-End Automation",
      description: "From video generation and publishing on YouTube/Facebook to multi-step AI agent workflows, we build complete zero-touch business engines.",
      accent: "text-[#8C5E2D]"
    },
    {
      icon: Users,
      title: "Hands-On Training & Knowledge Transfer",
      description: "We don't leave you with a black box. Our masterclasses equip your internal staff with the skills to operate, prompt, and expand their AI ecosystem.",
      accent: "text-[#734A1F]"
    },
    {
      icon: BarChart3,
      title: "24/7 SLA-Backed Application Support",
      description: "Dedicated L1-L3 engineering support teams ensure continuous uptime, sub-second latency monitoring, and prompt incident resolution.",
      accent: "text-[#8C5E2D]"
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#F5EFE6]/60 relative border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] uppercase tracking-widest mb-3">
            The Arham Advantage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26160C] tracking-tight font-['Cinzel']">
            Why Visionary Leaders <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Partner With Us</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#664E40]">
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
                className="glass-panel glass-panel-hover p-8 rounded-2xl border border-[#E8DFD5] flex flex-col justify-between bg-white shadow-xs"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-center mb-6 shadow-2xs">
                    <Icon className={`w-6 h-6 ${pillar.accent}`} />
                  </div>
                  <h3 className="text-lg font-bold text-[#26160C] font-['Cinzel'] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#664E40] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DFD5]/60 flex items-center gap-2 text-xs text-[#664E40] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5E2D]" />
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

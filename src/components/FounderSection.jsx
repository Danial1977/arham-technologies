import React from 'react';
import { Award, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { LinkedinIcon } from './BrandIcons';

export default function FounderSection() {
  return (
    <section id="founder" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 glow-purple rounded-full pointer-events-none blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-xs font-bold text-cyan-800 uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5 text-cyan-700" /> Leadership & Pedigree
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Led by Over <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">25 Years of Enterprise IT Mastery</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Unlike new-wave AI experimentalists, Arham Technologies is steered by a quarter-century of mission-critical systems engineering, enterprise delivery, and AI innovation.
          </p>
        </div>

        {/* Founder Profile Card */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 relative max-w-5xl mx-auto bg-gradient-to-br from-slate-50/90 via-white to-slate-50/90 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            
            {/* Left Avatar / Badge Column */}
            <div className="lg:col-span-4 text-center">
              <div className="relative inline-block mb-6">
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-1 shadow-xl shadow-cyan-600/15">
                  <div className="w-full h-full bg-white rounded-[22px] flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-indigo-700 font-['Space_Grotesk']">
                      YIB
                    </span>
                    <span className="text-xs uppercase tracking-widest text-slate-700 mt-2 font-bold">
                      Yasir Islam Butt
                    </span>
                    <span className="text-[10px] text-cyan-700 font-bold font-mono mt-0.5">
                      25+ Yrs Industry Exp.
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[11px] font-bold py-1 px-3 rounded-full shadow-md flex items-center gap-1 border border-white">
                  <Shield className="w-3 h-3" /> Verified Leader
                </div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
                Yasir Islam Butt
              </h3>
              <p className="text-sm font-bold text-cyan-700 mt-1">
                Founder & Principal AI Solutions Architect
              </p>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Arham Technologies
              </p>

              {/* LinkedIn Button */}
              <div className="mt-6 flex justify-center">
                <a
                  href="https://www.linkedin.com/in/yasirislambutt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#0077b5] hover:bg-[#006097] border border-blue-300 shadow-md shadow-blue-500/20 transition-all hover:scale-105"
                >
                  <LinkedinIcon className="w-4 h-4 fill-white" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-90" />
                </a>
              </div>
            </div>

            {/* Right Bio & Accomplishments */}
            <div className="lg:col-span-8 space-y-6">
              <div className="relative">
                <span className="text-6xl text-cyan-600/20 font-serif absolute -top-8 -left-4 pointer-events-none">
                  “
                </span>
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed relative z-10 italic">
                  AI is only as powerful as the systems architecture underneath it. With 25 years of engineering experience across enterprise software, application support, and business operations, we don't just build AI experiments—we build robust, production-grade autonomous engines that drive genuine enterprise revenue.
                </p>
              </div>

              {/* Career Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">25 Years of IT Architecture</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Deep expertise in mission-critical applications, cloud infrastructures, and high-availability operations.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Frontier Model Pioneer</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Early deployment of Google VEO 3, Anthropic Claude, Google Antigravity, and xAI Grok in production.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Automated Media Architect</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Architected automated YouTube and Facebook broadcast pipelines scaling across millions of organic views.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Executive Training Instructor</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Empowering corporate leadership and engineering teams through advanced Claude and Antigravity bootcamps.</p>
                  </div>
                </div>
              </div>

              {/* Direct Booking Strip */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-4 bg-slate-100/80 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Available for Strategic AI Advisory & Corporate Engagements</span>
                </div>
                <a
                  href="#contact"
                  className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1.5 transition-colors"
                >
                  <span>Book Executive Consultation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

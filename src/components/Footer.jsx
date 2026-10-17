import React, { useState } from 'react';
import { Bot, Mail, ArrowRight, Database } from 'lucide-react';
import { LinkedinIcon } from './BrandIcons';

export default function Footer({ onOpenDatabase }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1F150D] border-t border-[#3A2910] pt-16 pb-12 text-[#D5C4A1] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#8C5E2D] via-[#B89F70] to-[#523C1B] p-[1px] shadow-sm">
                <div className="w-full h-full bg-[#1F150D] rounded-[11px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#B89F70]" />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-wider text-[#FAF7F2] font-['Cinzel']">
                  ARHAM
                </span>
                <span className="text-xl font-bold text-[#B89F70] font-['Cinzel']">
                  TECH
                </span>
              </div>
            </div>

            <p className="text-[#A69282] text-xs sm:text-sm leading-relaxed max-w-sm">
              Architecting the next frontier of autonomous enterprise AI, YouTube & Facebook channel automation, Google VEO 3 generative video, and corporate Claude/Antigravity training. Backed by 25+ years of software leadership.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/yasirislambutt/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#2A1D13] border border-[#3A2910] flex items-center justify-center text-[#D5C4A1] hover:text-white hover:border-[#8C5E2D] shadow-2xs transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href="mailto:info@arhamtechnologies.com"
                className="w-9 h-9 rounded-lg bg-[#2A1D13] border border-[#3A2910] flex items-center justify-center text-[#D5C4A1] hover:text-white hover:border-[#8C5E2D] shadow-2xs transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Solutions */}
          <div>
            <h4 className="text-[#FAF7F2] font-bold text-xs uppercase tracking-wider mb-4 font-['Cinzel']">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D5C4A1]">
              <li><a href="#services" className="hover:text-white transition-colors">AI Business Solutions</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">YouTube Channel Automation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Facebook & Social Growth</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Autonomous AI Agents</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Corporate AI Training</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">eCommerce Modernization</a></li>
              {onOpenDatabase && (
                <li className="pt-1">
                  <button 
                    onClick={onOpenDatabase} 
                    className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-[#B89F70]"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>Database & CRM Portal</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Frontier Models */}
          <div>
            <h4 className="text-[#FAF7F2] font-bold text-xs uppercase tracking-wider mb-4 font-['Cinzel']">
              Frontier Stack
            </h4>
            <ul className="space-y-2.5 text-xs text-[#D5C4A1]">
              <li><span className="font-semibold text-white">Google VEO 3</span> (Gen Video)</li>
              <li><span className="font-semibold text-white">Anthropic Claude</span> (Reasoning)</li>
              <li><span className="font-semibold text-white">Google Antigravity</span> (Agents)</li>
              <li><span className="font-semibold text-white">xAI Grok</span> (Real-Time AI)</li>
              <li><span className="font-semibold text-white">Google Flow</span> (Pipelines)</li>
              <li><span className="font-semibold text-white">24/7 Application Support</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-[#FAF7F2] font-bold text-xs uppercase tracking-wider mb-4 font-['Cinzel']">
              Executive Briefing
            </h4>
            <p className="text-xs text-[#A69282] mb-3">
              Receive monthly frontier AI case studies, automation blueprints, and model breakdowns.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#2A1D13] border border-[#8C5E2D] text-xs font-semibold text-[#D5C4A1]">
                ✓ Subscribed to executive briefing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#2A1D13] border border-[#3A2910] text-xs text-[#FAF7F2] placeholder-[#8C7A6D] focus:outline-none focus:border-[#8C5E2D] shadow-2xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#3A2910] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7A6D]">
          <div>
            © {new Date().getFullYear()} Arham Technologies. All Rights Reserved. Steered by{' '}
            <a 
              href="https://www.linkedin.com/in/yasirislambutt/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#B89F70] hover:underline font-bold"
            >
              Yasir Islam Butt
            </a> (25+ Years Tech Excellence).
          </div>
          <div className="flex items-center gap-6">
            {onOpenDatabase && (
              <button 
                onClick={onOpenDatabase} 
                className="hover:text-white transition-colors font-semibold text-[#D5C4A1] flex items-center gap-1"
              >
                <Database className="w-3 h-3 text-[#B89F70]" />
                <span>Database Console</span>
              </button>
            )}
            <a href="#privacy" className="hover:text-[#D5C4A1] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#D5C4A1] transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-[#D5C4A1] transition-colors">Security & Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

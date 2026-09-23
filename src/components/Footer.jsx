import React, { useState } from 'react';
import { Bot, Mail, ArrowRight } from 'lucide-react';
import { LinkedinIcon } from './BrandIcons';

export default function Footer() {
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
    <footer className="bg-slate-100 border-t border-slate-200 pt-16 pb-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[1px] shadow-sm">
                <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-['Space_Grotesk']">
                  ARHAM
                </span>
                <span className="text-xl font-bold text-cyan-700 font-['Space_Grotesk']">
                  TECHNOLOGIES
                </span>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm">
              Architecting the next frontier of autonomous enterprise AI, YouTube & Facebook channel automation, Google VEO 3 generative video, and corporate Claude/Antigravity training. Backed by 25+ years of software leadership.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/in/yasirislambutt/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-cyan-700 hover:border-cyan-400 shadow-2xs transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 fill-current" />
              </a>
              <a
                href="mailto:info@arhamtechnologies.com"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-cyan-700 hover:border-cyan-400 shadow-2xs transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Solutions */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 font-['Space_Grotesk']">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><a href="#services" className="hover:text-cyan-700 transition-colors">AI Business Solutions</a></li>
              <li><a href="#services" className="hover:text-cyan-700 transition-colors">YouTube Channel Automation</a></li>
              <li><a href="#services" className="hover:text-cyan-700 transition-colors">Facebook & Social Growth</a></li>
              <li><a href="#services" className="hover:text-cyan-700 transition-colors">Autonomous AI Agents</a></li>
              <li><a href="#services" className="hover:text-cyan-700 transition-colors">Corporate AI Training</a></li>
              <li><a href="#services" className="hover:text-cyan-700 transition-colors">eCommerce Modernization</a></li>
            </ul>
          </div>

          {/* Frontier Models */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 font-['Space_Grotesk']">
              Frontier Tech
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li><span className="font-semibold text-slate-800">Google VEO 3</span> (Gen Video)</li>
              <li><span className="font-semibold text-slate-800">Anthropic Claude</span> (Reasoning)</li>
              <li><span className="font-semibold text-slate-800">Google Antigravity</span> (Agents)</li>
              <li><span className="font-semibold text-slate-800">xAI Grok</span> (Real-Time AI)</li>
              <li><span className="font-semibold text-slate-800">Google Flow</span> (Pipelines)</li>
              <li><span className="font-semibold text-slate-800">24/7 Application Support</span></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs uppercase tracking-wider mb-4 font-['Space_Grotesk']">
              AI Executive Briefing
            </h4>
            <p className="text-xs text-slate-600 mb-3">
              Receive monthly frontier AI case studies, automation blueprints, and model breakdowns.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-cyan-100/70 border border-cyan-200 text-xs font-semibold text-cyan-800">
                ✓ Subscribed to executive briefing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter business email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-2xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Arham Technologies. All Rights Reserved. Led by{' '}
            <a 
              href="https://www.linkedin.com/in/yasirislambutt/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-cyan-700 hover:underline font-bold"
            >
              Yasir Islam Butt
            </a> (25+ Years Tech Excellence).
          </div>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-800 transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-cyan-700 transition-colors">Security & Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

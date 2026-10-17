import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Terminal, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ShoppingBag, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  ArrowUpRight, 
  Award, 
  ShieldCheck, 
  Globe2, 
  Workflow, 
  TrendingUp, 
  Clock, 
  Database,
  Bot,
  BrainCircuit,
  Film
} from 'lucide-react';
import { YoutubeIcon, LinkedinIcon, FacebookIcon } from './BrandIcons';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = 8;
  const slideDuration = 8000; // 8 seconds per slide

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, slideDuration);
    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  const goToSlide = (idx) => {
    setCurrentSlide(idx);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 60) nextSlide();
    if (touchEndX.current - touchStartX.current > 60) prevSlide();
  };

  const slideTabs = [
    { num: '01', title: 'Claude & Antigravity' },
    { num: '02', title: 'TB-Furniture Store' },
    { num: '03', title: 'MyBestDiscounts.co.uk' },
    { num: '04', title: 'Channel Automation' },
    { num: '05', title: 'Services Matrix' },
    { num: '06', title: '25-Yr ERP Pedigree' },
    { num: '07', title: 'Future Tech & Contact' },
    { num: '08', title: 'UK & USA Enterprise' }
  ];

  return (
    <section 
      className="relative pt-32 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-grid-pattern min-h-[740px] lg:min-h-[820px] flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-walnut rounded-full pointer-events-none blur-3xl opacity-80" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] glow-amber rounded-full pointer-events-none blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
        
        {/* ========================================================
            BANNER 1: About Claude & Google Antigravity with Visual Tools Diagram
            ======================================================== */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in zoom-in-95 duration-500">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-ping" />
                <span className="text-[#26160C]">BANNER 1 OF 8</span>
                <span className="text-[#D5C4A1]">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Terminal className="w-3.5 h-3.5" /> Autonomous Agent Orchestration
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26160C] leading-[1.1] font-['Cinzel']">
                Frontier Reasoning with <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Claude & Google Antigravity</span>
              </h1>

              <p className="text-base sm:text-lg text-[#664E40] leading-relaxed max-w-2xl">
                Arham Technologies builds production-grade autonomous agent workforces. Harnessing Anthropic Claude's analytical reasoning and Google Antigravity's multi-agent runtime, we replace complex human toil with self-verifying, tool-calling swarms.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all group"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-[#26160C] bg-white hover:bg-[#F5EFE6] border border-[#E8DFD5] shadow-xs transition-all"
                >
                  <Zap className="w-4 h-4 text-[#8C5E2D]" />
                  <span>Book Architecture Review</span>
                </a>
              </div>

              {/* Specs Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#664E40]">
                <span className="font-semibold text-[#26160C]">Core Stack:</span>
                <span className="px-2.5 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] font-mono text-[#8C5E2D] font-bold">Claude 3.7 Extended Thinking</span>
                <span className="px-2.5 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] font-mono text-[#8C5E2D] font-bold">Google Antigravity Swarms</span>
                <span className="px-2.5 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] font-mono text-[#8C5E2D] font-bold">MCP Tool Bus</span>
              </div>
            </div>

            {/* Right Visual Tools Diagram */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[#E8DFD5] shadow-xl bg-white relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD5] text-xs">
                  <span className="font-bold text-[#26160C] font-['Cinzel'] flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-[#8C5E2D]" /> Autonomous Agent Topology
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
                    Active Verified
                  </span>
                </div>

                {/* Interactive Node Diagram */}
                <div className="py-6 space-y-4">
                  {/* Central Node */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F5EFE6] via-white to-[#F5EFE6] border-2 border-[#8C5E2D] text-center shadow-md">
                    <span className="text-[10px] uppercase font-bold text-[#8C5E2D] tracking-wider block">Central Intelligence Engine</span>
                    <h4 className="text-base font-extrabold text-[#26160C] font-['Cinzel'] mt-0.5">Anthropic Claude 3.7 + Antigravity Orchestrator</h4>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center text-[#8C5E2D] text-xs font-mono font-bold">
                    ↓ Real-Time Multi-Agent Dispatch ↓
                  </div>

                  {/* 3 Satellite Nodes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-center">
                      <div className="w-7 h-7 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] mx-auto flex items-center justify-center mb-1">
                        <Terminal className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-[#26160C] block">MCP Server Bus</span>
                      <span className="text-[9px] text-[#664E40]">Bespoke APIs & SQL</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-center">
                      <div className="w-7 h-7 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] mx-auto flex items-center justify-center mb-1">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-[#26160C] block">Subagent Swarm</span>
                      <span className="text-[9px] text-[#664E40]">Autonomous QA/Dev</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-center">
                      <div className="w-7 h-7 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] mx-auto flex items-center justify-center mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11px] font-bold text-[#26160C] block">Output Vault</span>
                      <span className="text-[9px] text-[#664E40]">CI/CD & CRM Deliver</span>
                    </div>
                  </div>

                  {/* Telemetry pill */}
                  <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#E8DFD5] text-xs flex items-center justify-between text-[#664E40]">
                    <span>Execution Latency: <strong className="text-[#26160C]">Sub-Second</strong></span>
                    <span>Safety Guardrails: <strong className="text-emerald-700">SOC-2 Isolated</strong></span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DFD5] text-[11px] text-[#664E40] text-center">
                  Visual tools architecture blueprint crafted for enterprise scale.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BANNER 2: eCommerce Portal desc TB-Furniture with link to TB Furniture
            ======================================================== */}
        {currentSlide === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-ping" />
                <span className="text-[#26160C]">BANNER 2 OF 8</span>
                <span className="text-[#D5C4A1]">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <ShoppingBag className="w-3.5 h-3.5" /> High-Performance eCommerce
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26160C] leading-[1.1] font-['Cinzel']">
                TB-Furnitures: <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Luxury British Storefront</span>
              </h1>

              <p className="text-base sm:text-lg text-[#664E40] leading-relaxed max-w-2xl">
                Engineered from the ground up for the UK luxury living market. TB-Furnitures features Next.js App Router, Prisma ORM, database-driven delivery logistics (free delivery rules managed from admin settings), 4 dynamic theme skins, and royal swatch sample dispatching.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://tb-furnitures.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all group"
                >
                  <span>Visit TB-Furnitures Live Site</span>
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-[#26160C] bg-white hover:bg-[#F5EFE6] border border-[#E8DFD5] shadow-xs transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#8C5E2D]" />
                  <span>eCommerce Development Scope</span>
                </a>
              </div>

              {/* Spec Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-center">
                  <div className="text-lg font-bold text-[#26160C] font-['Cinzel']">10-Year</div>
                  <div className="text-[10px] text-[#664E40]">Frame Warranty</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-center">
                  <div className="text-lg font-bold text-[#26160C] font-['Cinzel']">30-Day</div>
                  <div className="text-[10px] text-[#664E40]">In-Home Trial</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-center">
                  <div className="text-lg font-bold text-[#26160C] font-['Cinzel']">4-Skin</div>
                  <div className="text-[10px] text-[#664E40]">Palette Switcher</div>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-center">
                  <div className="text-lg font-bold text-[#26160C] font-['Cinzel']">DB-Driven</div>
                  <div className="text-[10px] text-[#664E40]">Delivery Settings</div>
                </div>
              </div>
            </div>

            {/* Right Showcase Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl border border-[#E8DFD5] shadow-xl bg-white space-y-4">
                <div className="p-4 rounded-2xl bg-[#1F150D] text-white flex items-center justify-between border border-[#3A2910]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#8C5E2D] flex items-center justify-center font-serif text-white font-bold">TB</span>
                    <div>
                      <div className="text-sm font-bold font-['Cinzel'] tracking-wide">TB FURNITURES</div>
                      <div className="text-[10px] text-[#D5C4A1]">British Luxury Living & Timber Craft</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#8C5E2D]/40 text-[#D5C4A1] border border-[#8C5E2D]">
                    UK Flagship
                  </span>
                </div>

                <div className="space-y-3 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD5] text-xs">
                  <div className="flex justify-between items-center text-[#664E40]">
                    <span>Primary Architecture:</span>
                    <strong className="text-[#26160C]">Next.js 14 + Tailwind + Prisma</strong>
                  </div>
                  <div className="flex justify-between items-center text-[#664E40]">
                    <span>Default Color Swatch:</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#8C5E2D]">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#8C5E2D]" /> Heritage Walnut
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[#664E40]">
                    <span>Sample Kit Feature:</span>
                    <strong className="text-[#26160C]">Royal Mail Free Swatches</strong>
                  </div>
                  <div className="flex justify-between items-center text-[#664E40]">
                    <span>Production Status:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> Live on Vercel
                    </span>
                  </div>
                </div>

                <a
                  href="https://tb-furnitures.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-center font-bold text-xs text-[#26160C] bg-[#F5EFE6] hover:bg-[#E8DEC8] border border-[#E8DFD5] flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>Launch TB-Furnitures Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8C5E2D]" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BANNER 3: Screen shots of Affiliate Portal MyBestDiscounts.co.uk Millions of products etc
            ======================================================== */}
        {currentSlide === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-ping" />
                <span className="text-[#26160C]">BANNER 3 OF 8</span>
                <span className="text-[#D5C4A1]">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Database className="w-3.5 h-3.5" /> Big Data Retail Feeds
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26160C] leading-[1.1] font-['Cinzel']">
                MyBestDiscounts.co.uk: <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Millions of Retail Products</span>
              </h1>

              <p className="text-base sm:text-lg text-[#664E40] leading-relaxed max-w-2xl">
                A massive-scale automated UK deal aggregator and affiliate discovery portal. Ingesting, categorizing, and indexing millions of live products, coupons, and discount vouchers from the UK's leading high-street and online retailers.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://mybestdiscounts.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all group"
                >
                  <span>Explore MyBestDiscounts.co.uk</span>
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-[#26160C] bg-white hover:bg-[#F5EFE6] border border-[#E8DFD5] shadow-xs transition-all"
                >
                  <span>Build Big Data Pipeline</span>
                </a>
              </div>

              {/* Data Ingestion Metrics */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <span className="font-semibold text-[#26160C]">Platform Capabilities:</span>
                <span className="px-3 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] text-[#8C5E2D] font-bold">2M+ Products Ingested</span>
                <span className="px-3 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] text-[#8C5E2D] font-bold">Automated Price Scraping</span>
                <span className="px-3 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] text-[#8C5E2D] font-bold">Voucher Verification Matrix</span>
              </div>
            </div>

            {/* Right Telemetry Screenshot Mockup */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl border border-[#E8DFD5] shadow-xl bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                    <span className="font-bold text-[#26160C] font-mono ml-2">mybestdiscounts.co.uk/portal</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#8C5E2D] bg-[#F5EFE6] px-2 py-0.5 rounded">
                    UK National Network
                  </span>
                </div>

                {/* Simulated Deals Stream */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#26160C] block">Amazon UK & Argos Feed</span>
                      <span className="text-[10px] text-[#664E40]">Electronics & Home Appliances • 480k SKUs</span>
                    </div>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      -35% Verified
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#26160C] block">Marks & Spencer / ASOS</span>
                      <span className="text-[10px] text-[#664E40]">Fashion & Apparel Deals • 850k SKUs</span>
                    </div>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      Voucher Sync
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-[#26160C] block">Currys & John Lewis</span>
                      <span className="text-[10px] text-[#664E40]">Tech & High-Ticket Retail • 240k SKUs</span>
                    </div>
                    <span className="font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                      Cashback Active
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#E8DFD5] text-xs flex items-center justify-between text-[#664E40]">
                  <span>Data Ingestion Engine: <strong className="text-[#26160C]">Automated Crawlers</strong></span>
                  <span>Daily Refreshes: <strong className="text-[#8C5E2D]">100% Autonomous</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BANNER 4: Beautiful diagram of YouTube Facebook Channels Automation Expertise etc
            ======================================================== */}
        {currentSlide === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-ping" />
                <span className="text-[#26160C]">BANNER 4 OF 8</span>
                <span className="text-[#D5C4A1]">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <YoutubeIcon className="w-3.5 h-3.5 text-red-600" /> Viral Media Automation
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26160C] leading-[1.1] font-['Cinzel']">
                YouTube & Facebook <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Channel Automation Mastery</span>
              </h1>

              <p className="text-base sm:text-lg text-[#664E40] leading-relaxed max-w-2xl">
                Zero-touch digital media channels engineered to generate millions of organic views and monetization streams. From trend extraction and Claude viral scripting to AI voice synthesis, automated 4K video rendering, and scheduled multi-platform dispatch.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all group"
                >
                  <span>Explore Channel Pipelines</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#ai-estimator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-[#26160C] bg-white hover:bg-[#F5EFE6] border border-[#E8DFD5] shadow-xs transition-all"
                >
                  <span>Calculate Channel ROI</span>
                </a>
              </div>

              <div className="flex items-center gap-6 pt-2 text-xs">
                <div>
                  <div className="text-2xl font-bold text-[#26160C] font-['Cinzel']">100+</div>
                  <div className="text-[#664E40]">Channels Automated</div>
                </div>
                <div className="h-8 w-[1px] bg-[#E8DFD5]" />
                <div>
                  <div className="text-2xl font-bold text-[#8C5E2D] font-['Cinzel']">8.1M+</div>
                  <div className="text-[#664E40]">Monthly Impressions</div>
                </div>
                <div className="h-8 w-[1px] bg-[#E8DFD5]" />
                <div>
                  <div className="text-2xl font-bold text-[#26160C] font-['Cinzel']">Zero-Touch</div>
                  <div className="text-[#664E40]">End-to-End Pipeline</div>
                </div>
              </div>
            </div>

            {/* Right Flow Diagram Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[#E8DFD5] shadow-xl bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5] text-xs">
                  <span className="font-bold text-[#26160C] font-['Cinzel'] flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-[#8C5E2D]" /> 5-Stage Broadcast Engine
                  </span>
                  <span className="text-[10px] font-bold text-[#8C5E2D] bg-[#F5EFE6] px-2 py-0.5 rounded">
                    Fully Automated
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8C5E2D] text-white flex items-center justify-center font-bold text-[11px] shrink-0">1</div>
                    <div>
                      <strong className="text-[#26160C] block">Viral Niche & Signal Extraction</strong>
                      <span className="text-[11px] text-[#664E40]">xAI Grok & YouTube API real-time search trends</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8C5E2D] text-white flex items-center justify-center font-bold text-[11px] shrink-0">2</div>
                    <div>
                      <strong className="text-[#26160C] block">Claude 3.7 Scripting & Hook Strategy</strong>
                      <span className="text-[11px] text-[#664E40]">Psychological retention pacing & narrative flow</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8C5E2D] text-white flex items-center justify-center font-bold text-[11px] shrink-0">3</div>
                    <div>
                      <strong className="text-[#26160C] block">Hyper-Realistic Voice Synthesis</strong>
                      <span className="text-[11px] text-[#664E40]">Studio-grade voice clones with dynamic soundscapes</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8C5E2D] text-white flex items-center justify-center font-bold text-[11px] shrink-0">4</div>
                    <div>
                      <strong className="text-[#26160C] block">Automated 4K Video Assembly & VEO 3</strong>
                      <span className="text-[11px] text-[#664E40]">Context-aware B-roll insertion & subtitle burning</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#8C5E2D] flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#8C5E2D] text-white flex items-center justify-center font-bold text-[11px] shrink-0">5</div>
                    <div>
                      <strong className="text-[#8C5E2D] block">Multi-Variant A/B Thumbnail & Syndication</strong>
                      <span className="text-[11px] text-[#26160C]">Instant broadcast to YouTube & Facebook Meta Graph</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BANNER 5: Diagram with services link on same page (visual diagram banner of services with AI Tools)
            ======================================================== */}
        {currentSlide === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-ping" />
                <span className="text-[#26160C]">BANNER 5 OF 8</span>
                <span className="text-[#D5C4A1]">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <BrainCircuit className="w-3.5 h-3.5" /> Comprehensive Services Matrix
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26160C] leading-[1.1] font-['Cinzel']">
                Complete Enterprise <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">AI & Cloud Services Matrix</span>
              </h1>

              <p className="text-base sm:text-lg text-[#664E40] leading-relaxed max-w-2xl">
                We combine frontier AI intelligence with mission-critical systems engineering. Every capability is delivered with robust SLAs, privacy guarantees, and turnkey handover to your internal team.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all group"
                >
                  <span>Explore All 9 Capabilities Below</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-[#26160C] bg-white hover:bg-[#F5EFE6] border border-[#E8DFD5] shadow-xs transition-all"
                >
                  <span>Inquire for Custom Scope</span>
                </a>
              </div>

              <div className="pt-2 text-xs text-[#664E40]">
                Clicking <strong className="text-[#8C5E2D]">Explore All 9 Capabilities</strong> smoothly navigates directly to the interactive services section on this page.
              </div>
            </div>

            {/* Right Visual Architecture Grid */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[#E8DFD5] shadow-xl bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5] text-xs">
                  <span className="font-bold text-[#26160C] font-['Cinzel']">
                    Enterprise Capability Quadrants
                  </span>
                  <a href="#services" className="text-[10px] font-bold text-[#8C5E2D] hover:underline flex items-center gap-1">
                    <span>Jump to Section</span>
                    <ArrowDownRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] flex items-center justify-center mb-2 shadow-2xs">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <strong className="text-[#26160C] block text-xs">Enterprise AI</strong>
                    <span className="text-[10px] text-[#664E40]">Custom RAG, Fine-Tuning & Swarms</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] flex items-center justify-center mb-2 shadow-2xs">
                      <Film className="w-4 h-4" />
                    </div>
                    <strong className="text-[#26160C] block text-xs">Media Automation</strong>
                    <span className="text-[10px] text-[#664E40]">YouTube, Meta, VEO 3 Pipelines</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] flex items-center justify-center mb-2 shadow-2xs">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <strong className="text-[#26160C] block text-xs">Cloud Flow & ERP</strong>
                    <span className="text-[10px] text-[#664E40]">Serverless Webhooks & Sync</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] flex items-center justify-center mb-2 shadow-2xs">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <strong className="text-[#26160C] block text-xs">eCommerce & Apps</strong>
                    <span className="text-[10px] text-[#664E40]">Next.js Storefronts & 24/7 SLA</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#E8DFD5] text-center text-xs text-[#664E40]">
                  Backed by SLA-guaranteed L1-L3 round-the-clock enterprise support.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BANNER 6: 25 Years of my own experience page with my linkedin page URL, ERPs etc.
            ======================================================== */}
        {currentSlide === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-ping" />
                <span className="text-[#26160C]">BANNER 6 OF 8</span>
                <span className="text-[#D5C4A1]">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Award className="w-3.5 h-3.5" /> Founder & Executive Leadership
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26160C] leading-[1.1] font-['Cinzel']">
                25+ Years of Mission-Critical <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Enterprise IT & ERP Mastery</span>
              </h1>

              <p className="text-base sm:text-lg text-[#664E40] leading-relaxed max-w-2xl">
                Led by Founder & Principal Solutions Architect <strong>Yasir Islam Butt</strong>. A quarter-century pedigree delivering complex ERP transformations (SAP, Oracle, Bespoke Enterprise Systems), high-availability infrastructure, and now autonomous AI agents.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://www.linkedin.com/in/yasirislambutt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-[#8C5E2D] hover:bg-[#734A1F] shadow-lg shadow-[#8C5E2D]/25 transition-all group"
                >
                  <LinkedinIcon className="w-4 h-4 fill-white" />
                  <span>Connect on LinkedIn (Yasir Islam Butt)</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="#founder"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-[#26160C] bg-white hover:bg-[#F5EFE6] border border-[#E8DFD5] shadow-xs transition-all"
                >
                  <span>Read Pedigree Profile</span>
                </a>
              </div>

              {/* Verified Career Track Record */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <span className="font-semibold text-[#26160C]">Expertise:</span>
                <span className="px-3 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] text-[#8C5E2D] font-bold">Large-Scale ERP Engineering</span>
                <span className="px-3 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] text-[#8C5E2D] font-bold">25+ Yrs Industry Leadership</span>
                <span className="px-3 py-1 rounded-md bg-[#F5EFE6] border border-[#E8DFD5] text-[#8C5E2D] font-bold">Corporate AI Instructor</span>
              </div>
            </div>

            {/* Right Profile Showcase */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-7 rounded-3xl border border-[#E8DFD5] shadow-xl bg-white text-center space-y-4">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-[#8C5E2D] via-[#B89F70] to-[#523C1B] p-1 mx-auto shadow-xl shadow-[#8C5E2D]/20">
                  <div className="w-full h-full bg-[#FAF7F2] rounded-[22px] flex flex-col items-center justify-center p-3">
                    <span className="text-3xl font-extrabold text-[#26160C] font-['Cinzel']">YIB</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#8C5E2D] font-bold mt-1">Yasir Islam Butt</span>
                    <span className="text-[8px] font-mono text-[#664E40]">25+ Yrs Enterprise IT</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#26160C] font-['Cinzel']">Yasir Islam Butt</h3>
                  <p className="text-xs font-bold text-[#8C5E2D] mt-0.5">Founder & Principal AI Solutions Architect</p>
                  <p className="text-[11px] text-[#664E40] mt-1">Arham Technologies Ltd</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-xs text-[#332015] italic leading-relaxed">
                  "AI is only as powerful as the systems architecture underneath it. We build robust, production-grade autonomous engines that drive genuine enterprise revenue."
                </div>

                <a
                  href="https://www.linkedin.com/in/yasirislambutt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0077b5] hover:bg-[#006097] flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <LinkedinIcon className="w-4 h-4 fill-white" />
                  <span>linkedin.com/in/yasirislambutt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BANNER 7: banner future tech and contact us form on our own page link
            ======================================================== */}
        {currentSlide === 6 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-ping" />
                <span className="text-[#26160C]">BANNER 7 OF 8</span>
                <span className="text-[#D5C4A1]">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Zap className="w-3.5 h-3.5" /> Frontier Model Innovation
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26160C] leading-[1.1] font-['Cinzel']">
                Next-Gen AI Roadmap: <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">Google VEO 3, Grok & Beyond</span>
              </h1>

              <p className="text-base sm:text-lg text-[#664E40] leading-relaxed max-w-2xl">
                Deploy before your competitors do. We harness Google VEO 3 for high-frame-rate cinematic generative video, xAI Grok for zero-lag social pulse intelligence, and custom multimodal agent architectures.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all group"
                >
                  <span>Submit Inquiry Form Below</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#technologies"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-[#26160C] bg-white hover:bg-[#F5EFE6] border border-[#E8DFD5] shadow-xs transition-all"
                >
                  <Cpu className="w-4 h-4 text-[#8C5E2D]" />
                  <span>Explore Frontier Stack</span>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#E8DFD5] text-xs text-[#664E40] flex items-center justify-between">
                <span>Direct inquiry window: <strong className="text-[#26160C]">Under 2 Hours SLA</strong></span>
                <span>Security Assurance: <strong className="text-emerald-700">Strict Mutual NDA</strong></span>
              </div>
            </div>

            {/* Right Telemetry Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[#E8DFD5] shadow-xl bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5] text-xs">
                  <span className="font-bold text-[#26160C] font-['Cinzel']">
                    Frontier Model Telemetry
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    Live Production
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-red-600 flex items-center justify-center shrink-0">
                      <Film className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#26160C]">Google VEO 3 Cinematic Studio</div>
                      <div className="text-[11px] text-[#664E40]">Generative video with realistic temporal physics & commercial quality.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#26160C] flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-[#8C5E2D]" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#26160C]">xAI Grok Real-Time Signals</div>
                      <div className="text-[11px] text-[#664E40]">Real-time social trend ingestion for viral broadcast syndication.</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#26160C]">Claude 3.7 & Google Antigravity</div>
                      <div className="text-[11px] text-[#664E40]">Long-horizon agentic task execution and self-healing pipelines.</div>
                    </div>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="w-full py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#8C5E2D] to-[#523C1B] flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Go to Contact Form Below</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            BANNER 8: Leadership and Experience UK USA Top noche Companies
            ======================================================== */}
        {currentSlide === 7 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-ping" />
                <span className="text-[#26160C]">BANNER 8 OF 8</span>
                <span className="text-[#D5C4A1]">•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Globe2 className="w-3.5 h-3.5" /> Global Enterprise Standards
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#26160C] leading-[1.1] font-['Cinzel']">
                Global Leadership: <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">UK & USA Top-Tier Enterprises</span>
              </h1>

              <p className="text-base sm:text-lg text-[#664E40] leading-relaxed max-w-2xl">
                Engineering excellence honed across premier British and American enterprise landscapes. We design systems that adhere to the strictest audit standards, zero-data-retention AI governance, and 24/7/365 mission-critical uptime.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all group"
                >
                  <span>Schedule Executive Briefing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#why-us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-[#26160C] bg-white hover:bg-[#F5EFE6] border border-[#E8DFD5] shadow-xs transition-all"
                >
                  <ShieldCheck className="w-4 h-4 text-[#8C5E2D]" />
                  <span>View Enterprise Guarantees</span>
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                  <strong className="text-base font-bold text-[#26160C] font-['Cinzel'] block">UK & USA</strong>
                  <span className="text-[10px] text-[#664E40]">Cross-Atlantic Reach</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                  <strong className="text-base font-bold text-[#8C5E2D] font-['Cinzel'] block">99.8%</strong>
                  <span className="text-[10px] text-[#664E40]">Enterprise SLA</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                  <strong className="text-base font-bold text-[#26160C] font-['Cinzel'] block">SOC-2</strong>
                  <span className="text-[10px] text-[#664E40]">Aligned Security</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5]">
                  <strong className="text-base font-bold text-[#8C5E2D] font-['Cinzel'] block">Zero Leak</strong>
                  <span className="text-[10px] text-[#664E40]">Data Privacy</span>
                </div>
              </div>
            </div>

            {/* Right Enterprise Trust Card */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-[#E8DFD5] shadow-xl bg-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD5] text-xs">
                  <span className="font-bold text-[#26160C] font-['Cinzel'] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#8C5E2D]" /> Enterprise Trust Seal
                  </span>
                  <span className="text-[10px] font-bold text-[#8C5E2D] bg-[#F5EFE6] px-2 py-0.5 rounded">
                    Global Verification
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] flex items-center justify-center shrink-0 font-bold">
                      UK
                    </div>
                    <div>
                      <strong className="text-[#26160C] block">United Kingdom Footprint</strong>
                      <span className="text-[11px] text-[#664E40]">London & Manchester corporate systems, eCommerce & automation hubs.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] flex items-center justify-center shrink-0 font-bold">
                      USA
                    </div>
                    <div>
                      <strong className="text-[#26160C] block">United States Footprint</strong>
                      <span className="text-[11px] text-[#664E40]">New York & Silicon Valley tech stacks, cloud pipelines & AI agents.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E8DFD5] text-[#8C5E2D] flex items-center justify-center shrink-0 font-bold">
                      24/7
                    </div>
                    <div>
                      <strong className="text-[#26160C] block">Mission-Critical Availability</strong>
                      <span className="text-[11px] text-[#664E40]">Round-the-clock uptime monitoring & L1-L3 engineering response.</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#E8DFD5] text-center text-xs text-[#26160C] font-semibold">
                  Serving tier-1 enterprises, high-growth brands, and visionary founders.
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          BOTTOM CAROUSEL CONTROLS & 8-BANNER TAB NAVIGATION BAR
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-10">
        
        {/* Play/Pause & Prev/Next Arrows Strip */}
        <div className="flex items-center justify-between pb-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-white border border-[#E8DFD5] text-[#664E40] hover:text-[#26160C] shadow-2xs"
              title={isPlaying ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <span className="text-[#664E40] font-medium hidden sm:inline">
              Banner <strong className="text-[#26160C]">{currentSlide + 1}</strong> of <strong className="text-[#26160C]">{totalSlides}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white border border-[#E8DFD5] text-[#26160C] hover:bg-[#8C5E2D] hover:text-white transition-all shadow-xs"
              title="Previous Banner"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white border border-[#E8DFD5] text-[#26160C] hover:bg-[#8C5E2D] hover:text-white transition-all shadow-xs"
              title="Next Banner"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 8 Banner Thumbnail Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1">
          {slideTabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                currentSlide === idx
                  ? 'bg-white border-[#8C5E2D] shadow-md ring-2 ring-[#8C5E2D]/20'
                  : 'bg-[#FAF7F2]/80 border-[#E8DFD5] hover:bg-white text-[#664E40]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`text-[10px] font-bold font-mono ${
                  currentSlide === idx ? 'text-[#8C5E2D]' : 'text-[#8C7A6D]'
                }`}>
                  {tab.num}
                </span>
                {currentSlide === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C5E2D] animate-ping" />
                )}
              </div>
              <span className={`text-[11px] font-bold line-clamp-1 leading-snug ${
                currentSlide === idx ? 'text-[#26160C]' : 'text-[#664E40]'
              }`}>
                {tab.title}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

function ArrowDownRight(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="7" y1="7" x2="17" y2="17" />
      <polyline points="17 7 17 17 7 17" />
    </svg>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
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
  const slideDuration = 4000; // 4 seconds per slide

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
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
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
    { num: '03', title: 'MyBestDiscounts' },
    { num: '04', title: 'Media Automation' },
    { num: '05', title: 'AI Services Matrix' },
    { num: '06', title: '25-Yr ERP Pedigree' },
    { num: '07', title: 'Frontier AI Roadmap' },
    { num: '08', title: 'UK & USA Enterprise' }
  ];

  // Banners visual backgrounds
  const bannerBackgrounds = [
    './banners/banner_1_claude_antigravity.jpg',
    './banners/banner_2_tb_furniture.jpg',
    './banners/banner_3_mybestdiscounts.jpg',
    './banners/banner_4_media_automation.svg',
    './banners/banner_5_ai_services.svg',
    './banners/banner_6_erp_experience.svg',
    './banners/banner_7_frontier_ai.svg',
    './banners/banner_8_global_leadership.svg'
  ];

  return (
    <section 
      className="relative pt-20 sm:pt-24 pb-4 md:pb-6 overflow-hidden bg-[#FAF7F2] min-h-[calc(100vh-4.5rem)] flex flex-col justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Soft Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] glow-walnut rounded-full pointer-events-none blur-3xl opacity-70" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] glow-amber rounded-full pointer-events-none blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col justify-center">
        
        {/* ========================================================
            MAIN BANNER CONTAINER (WITH BACKGROUND IMAGE + ARROWS)
        ======================================================== */}
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-[#E8DFD5] h-[520px] sm:h-[540px] md:h-[560px] lg:h-[570px] flex items-center bg-[#140803]">
          
          {/* Technical Visual Banner Background Image */}
          {bannerBackgrounds.map((bg, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                currentSlide === idx ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              <img 
                src={bg} 
                alt={`Banner ${idx + 1} Visual Background`} 
                className="w-full h-full object-cover object-center"
              />
              {/* Dual-Tone Technical Overlay: Deep walnut on left for high-contrast readable text, atmospheric transparency on right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#120703]/95 via-[#190C06]/85 sm:via-[#190C06]/75 to-[#190C06]/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0502]/90 via-transparent to-[#120703]/40" />
            </div>
          ))}

          {/* ========================================================
              CENTER AREA LEFT AND RIGHT ARROWS (VERTICALLY CENTERED)
          ======================================================== */}
          <button
            onClick={prevSlide}
            aria-label="Previous Banner"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/90 hover:bg-white text-[#26160C] shadow-2xl border-2 border-[#E8DFD5] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#8C5E2D]"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-[#26160C] group-hover:text-[#8C5E2D] transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Banner"
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-13 md:h-13 rounded-full bg-white/90 hover:bg-white text-[#26160C] shadow-2xl border-2 border-[#E8DFD5] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#8C5E2D]"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-[#26160C] group-hover:text-[#8C5E2D] transition-colors" />
          </button>

          {/* ========================================================
              SLIDE CONTENT (1 TO 8)
          ======================================================== */}
          <div className="relative z-20 w-full px-8 sm:px-14 md:px-18 lg:px-20 py-4">

            {/* ---------------- SLIDE 0: CLAUDE & ANTIGRAVITY ---------------- */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2214]/80 border border-[#C59A58]/50 text-xs text-[#F5E2BE] font-semibold mb-4 backdrop-blur-md shadow-xs">
                    <span className="flex h-2 w-2 rounded-full bg-[#00FF99] animate-pulse" />
                    <span>BANNER 1 OF 8 • Autonomous AI Core</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[34px] font-extrabold text-white leading-snug mb-3 font-['Cinzel'] tracking-tight drop-shadow-md">
                    Engineering Autonomous Swarms with <span className="bg-gradient-to-r from-[#F5E2BE] via-[#D4A76A] to-[#805423] bg-clip-text text-transparent">Claude & Google Antigravity</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#E5D7CC] mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
                    We architect production multi-agent swarms using Claude 3.7 Sonnet reasoning engines and Google Antigravity protocols, delivering self-healing CI/CD, deep research automation, and deterministic tool-calling pipelines.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href="#services"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/30 transition-all text-sm group"
                    >
                      <span>Explore Capabilities</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="#estimator"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all text-sm"
                    >
                      <Zap className="w-4 h-4 text-[#D5B170]" />
                      <span>AI Project Estimator</span>
                    </a>
                  </div>
                  <div className="text-xs text-[#D5C4A1] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF99]" />
                    <span>Deep Reasoning Protocol • AGY Multi-Agent Mesh • 99.8% Deterministic Output</span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="bg-[#190D06]/85 backdrop-blur-md rounded-2xl border border-[#E8DFD5]/20 p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D2214] mb-4">
                      <span className="text-xs font-mono text-[#D5B170] tracking-wider uppercase font-semibold">Agent Mesh Topology</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00FF99]/20 text-[#00FF99] text-[10px] font-mono font-bold">ONLINE</span>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Bot className="w-5 h-5 text-[#00FF99]" />
                          <div>
                            <div className="text-xs font-bold text-white">Claude 3.7 Sonnet Core</div>
                            <div className="text-[10px] text-[#A88B73]">Deep Reasoning & Task Synthesis</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-[#00FF99]">Active</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <BrainCircuit className="w-5 h-5 text-[#D5B170]" />
                          <div>
                            <div className="text-xs font-bold text-white">AGY Protocol Orchestrator</div>
                            <div className="text-[10px] text-[#A88B73]">MCP Tool Routing & Swarm Guardrails</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-[#D5B170]">Routing</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Cpu className="w-5 h-5 text-[#38E1FF]" />
                          <div>
                            <div className="text-xs font-bold text-white">Autonomous Agent Swarms</div>
                            <div className="text-[10px] text-[#A88B73]">Self-Healing Code & Continuous CI/CD</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-[#38E1FF]">Syncing</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#3D2214] flex justify-between text-[11px] text-[#D5C4A1]">
                      <span>Latency: <strong className="text-white">18ms</strong></span>
                      <span>Execution: <strong className="text-white">Parallel</strong></span>
                      <span>Safety: <strong className="text-[#00FF99]">Verified</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 1: TB-FURNITURE ---------------- */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2214]/80 border border-[#C59A58]/50 text-xs text-[#F5E2BE] font-semibold mb-4 backdrop-blur-md shadow-xs">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D5B170]" />
                    <span>BANNER 2 OF 8 • Flagship eCommerce Architecture</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[34px] font-extrabold text-white leading-snug mb-3 font-['Cinzel'] tracking-tight drop-shadow-md">
                    Next-Gen Luxury Retail: <span className="bg-gradient-to-r from-[#F5E2BE] via-[#D4A76A] to-[#805423] bg-clip-text text-transparent">TB-Furnitures Commerce Engine</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#E5D7CC] mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
                    Engineered from the ground up on Next.js 15, Prisma ORM, and PostgreSQL. Features dynamic discount matrices, real-time inventory synchronization, automated free-delivery logic, and sub-120ms global checkout.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href="https://tb-furnitures.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/30 transition-all text-sm group"
                    >
                      <span>Visit Live TB-Furniture Store</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href="#services"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all text-sm"
                    >
                      <Layers className="w-4 h-4 text-[#D5B170]" />
                      <span>Explore Commerce Stack</span>
                    </a>
                  </div>
                  <div className="text-xs text-[#D5C4A1] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF99]" />
                    <span>Live Production on Vercel • Next.js 15 App Router • Prisma Relational Store</span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="bg-[#190D06]/85 backdrop-blur-md rounded-2xl border border-[#E8DFD5]/20 p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D2214] mb-4">
                      <span className="text-xs font-mono text-[#D5B170] tracking-wider uppercase font-semibold">Storefront Telemetry</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00FF99]/20 text-[#00FF99] text-[10px] font-mono font-bold">VERCEL LIVE</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between">
                        <span className="text-xs text-[#E5D7CC]">Edge Latency</span>
                        <span className="text-xs font-mono font-bold text-[#00FF99]">118ms Global</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between">
                        <span className="text-xs text-[#E5D7CC]">Database Sync</span>
                        <span className="text-xs font-mono font-bold text-[#D5B170]">Prisma Relational Pool</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between">
                        <span className="text-xs text-[#E5D7CC]">Dynamic Pricing Rules</span>
                        <span className="text-xs font-mono font-bold text-white">Tiered Spend Discounts</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between">
                        <span className="text-xs text-[#E5D7CC]">Product Gallery</span>
                        <span className="text-xs font-mono font-bold text-white">Multi-Angle 4-Image Quad</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#3D2214] flex justify-between items-center">
                      <span className="text-[11px] text-[#A88B73]">Flagship Architecture</span>
                      <a 
                        href="https://tb-furnitures.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-[#D5B170] hover:text-white font-bold flex items-center gap-1"
                      >
                        Launch Store <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 2: MYBESTDISCOUNTS.CO.UK ---------------- */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2214]/80 border border-[#C59A58]/50 text-xs text-[#F5E2BE] font-semibold mb-4 backdrop-blur-md shadow-xs">
                    <TrendingUp className="w-3.5 h-3.5 text-[#D5B170]" />
                    <span>BANNER 3 OF 8 • Scaled Affiliate Aggregation</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[34px] font-extrabold text-white leading-snug mb-3 font-['Cinzel'] tracking-tight drop-shadow-md">
                    MyBestDiscounts.co.uk: <span className="bg-gradient-to-r from-[#F5E2BE] via-[#D4A76A] to-[#805423] bg-clip-text text-transparent">Millions of Products Ingested</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#E5D7CC] mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
                    High-volume UK retail aggregator processing over 2.4 Million live product feeds. Features automated scrapers, dynamic discount coupon validation, price drop detection, and real-time affiliate commission tracking.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href="https://mybestdiscounts.co.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/30 transition-all text-sm group"
                    >
                      <span>Visit MyBestDiscounts.co.uk</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href="#services"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all text-sm"
                    >
                      <Database className="w-4 h-4 text-[#D5B170]" />
                      <span>Review Ingestion Pipeline</span>
                    </a>
                  </div>
                  <div className="text-xs text-[#D5C4A1] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF99]" />
                    <span>2.4M+ Products Ingested • Automated Merchant Scraping • Real-Time Deal Sync</span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="bg-[#190D06]/85 backdrop-blur-md rounded-2xl border border-[#E8DFD5]/20 p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D2214] mb-4">
                      <span className="text-xs font-mono text-[#D5B170] tracking-wider uppercase font-semibold">Feed Processing Telemetry</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00FF99]/20 text-[#00FF99] text-[10px] font-mono font-bold">LIVE SYNC</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xl font-extrabold text-white font-mono">2,450,000+</div>
                        <div className="text-[10px] text-[#D5B170] font-semibold">Active UK Deals</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xl font-extrabold text-[#00FF99] font-mono">1,200+</div>
                        <div className="text-[10px] text-[#A88B73]">Merchant Feeds</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-[#24130A] flex justify-between items-center text-[#E5D7CC]">
                        <span>Argos & Currys Ingestion</span>
                        <span className="text-[#00FF99] font-mono text-[11px]">Synced (1m ago)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#24130A] flex justify-between items-center text-[#E5D7CC]">
                        <span>Voucher Code Scraper</span>
                        <span className="text-[#D5B170] font-mono text-[11px]">Validated 99.4%</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#3D2214] flex justify-between items-center">
                      <span className="text-[11px] text-[#A88B73]">Commission Pipeline</span>
                      <a 
                        href="https://mybestdiscounts.co.uk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-[#D5B170] hover:text-white font-bold flex items-center gap-1"
                      >
                        Explore Portal <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 3: CHANNEL AUTOMATION ---------------- */}
            {currentSlide === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2214]/80 border border-[#C59A58]/50 text-xs text-[#F5E2BE] font-semibold mb-4 backdrop-blur-md shadow-xs">
                    <Film className="w-3.5 h-3.5 text-[#D5B170]" />
                    <span>BANNER 4 OF 8 • Automated Content Syndication</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[34px] font-extrabold text-white leading-snug mb-3 font-['Cinzel'] tracking-tight drop-shadow-md">
                    Autonomous <span className="bg-gradient-to-r from-[#F5E2BE] via-[#D4A76A] to-[#805423] bg-clip-text text-transparent">YouTube & Facebook Media</span> Broadcast Engines
                  </h2>
                  <p className="text-sm sm:text-base text-[#E5D7CC] mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
                    End-to-end programmatic media creation: scriptwriting with LLMs, voice synthesis with ElevenLabs, dynamic video rendering with FFmpeg/Remotion, and scheduled multi-platform publishing.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href="#services"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/30 transition-all text-sm group"
                    >
                      <YoutubeIcon className="w-4 h-4 text-white" />
                      <span>View Channel Engineering</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all text-sm"
                    >
                      <FacebookIcon className="w-4 h-4 text-white" />
                      <span>Book Media Strategy Call</span>
                    </a>
                  </div>
                  <div className="text-xs text-[#D5C4A1] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF99]" />
                    <span>4.2M+ Monthly Reach • 14 Automated Channels • 100% Zero-Touchpoint Upload</span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="bg-[#190D06]/85 backdrop-blur-md rounded-2xl border border-[#E8DFD5]/20 p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D2214] mb-4">
                      <span className="text-xs font-mono text-[#D5B170] tracking-wider uppercase font-semibold">5-Stage Broadcast Pipeline</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00FF99]/20 text-[#00FF99] text-[10px] font-mono font-bold">ACTIVE PIPELINE</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="p-2.5 rounded-lg bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between text-xs">
                        <span className="text-[#E5D7CC]">1. Trend Discovery</span>
                        <span className="text-[#D5B170] font-mono">Reddit & NewsAPI Ingest</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between text-xs">
                        <span className="text-[#E5D7CC]">2. LLM Script Generation</span>
                        <span className="text-white font-mono">Claude 3.7 + GPT-4o</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between text-xs">
                        <span className="text-[#E5D7CC]">3. Voice & B-Roll Synth</span>
                        <span className="text-[#00FF99] font-mono">ElevenLabs + Midjourney</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between text-xs">
                        <span className="text-[#E5D7CC]">4. GPU Cloud Render</span>
                        <span className="text-[#38E1FF] font-mono">Remotion & FFmpeg</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between text-xs">
                        <span className="text-[#E5D7CC]">5. Scheduled Distribution</span>
                        <span className="text-[#D5B170] font-mono">YouTube & Meta API</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#3D2214] flex justify-between text-[11px] text-[#A88B73]">
                      <span>Monthly Video Output: <strong className="text-white">450+ Videos</strong></span>
                      <span>Render Time: <strong className="text-[#00FF99]">4.2 min/video</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 4: SERVICES MATRIX ---------------- */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2214]/80 border border-[#C59A58]/50 text-xs text-[#F5E2BE] font-semibold mb-4 backdrop-blur-md shadow-xs">
                    <Cpu className="w-3.5 h-3.5 text-[#D5B170]" />
                    <span>BANNER 5 OF 8 • Full-Spectrum Digital Engineering</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[34px] font-extrabold text-white leading-snug mb-3 font-['Cinzel'] tracking-tight drop-shadow-md">
                    Enterprise <span className="bg-gradient-to-r from-[#F5E2BE] via-[#D4A76A] to-[#805423] bg-clip-text text-transparent">AI Services & Modern Tooling</span> Ecosystem
                  </h2>
                  <p className="text-sm sm:text-base text-[#E5D7CC] mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
                    From autonomous agent infrastructure to enterprise cloud migration and media scaling, our delivery pipeline leverages the industry's most advanced toolchain.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href="#services"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/30 transition-all text-sm group"
                    >
                      <span>Explore All Services</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="#estimator"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all text-sm"
                    >
                      <Zap className="w-4 h-4 text-[#D5B170]" />
                      <span>Calculate Project Cost</span>
                    </a>
                  </div>
                  <div className="text-xs text-[#D5C4A1] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF99]" />
                    <span>Autonomous Agents • Enterprise Cloud & K8s • Media Automation • Next.js 15 Web</span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="bg-[#190D06]/85 backdrop-blur-md rounded-2xl border border-[#E8DFD5]/20 p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D2214] mb-4">
                      <span className="text-xs font-mono text-[#D5B170] tracking-wider uppercase font-semibold">Engineering Capabilities Matrix</span>
                      <a href="#services" className="text-xs text-[#D5B170] hover:text-white font-bold flex items-center gap-1">
                        View All <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-[#00FF99]" /> Autonomous Agents
                        </div>
                        <div className="text-[10px] text-[#A88B73]">Claude 3.7 • AGY Swarms • Custom MCP</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <Globe2 className="w-3.5 h-3.5 text-[#38E1FF]" /> Cloud & DevOps
                        </div>
                        <div className="text-[10px] text-[#A88B73]">AWS • GCP • Kubernetes • Terraform</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <Film className="w-3.5 h-3.5 text-[#FF4D4D]" /> Media Automation
                        </div>
                        <div className="text-[10px] text-[#A88B73]">ElevenLabs • Remotion • Video AI</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-[#D5B170]" /> Next-Gen Web
                        </div>
                        <div className="text-[10px] text-[#A88B73]">Next.js 15 • Prisma • Real-time DB</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#3D2214] text-center">
                      <a href="#services" className="text-xs text-[#D5B170] hover:text-white font-bold inline-flex items-center gap-1">
                        Click to explore all 6 service verticals on this page →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 5: 25 YEARS ERP ---------------- */}
            {currentSlide === 5 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2214]/80 border border-[#C59A58]/50 text-xs text-[#F5E2BE] font-semibold mb-4 backdrop-blur-md shadow-xs">
                    <Award className="w-3.5 h-3.5 text-[#D5B170]" />
                    <span>BANNER 6 OF 8 • 25+ Years Enterprise IT Heritage</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[34px] font-extrabold text-white leading-snug mb-3 font-['Cinzel'] tracking-tight drop-shadow-md">
                    25+ Years Leadership in <span className="bg-gradient-to-r from-[#F5E2BE] via-[#D4A76A] to-[#805423] bg-clip-text text-transparent">Enterprise IT & Mission-Critical ERPs</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#E5D7CC] mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
                    Founder & Chief Architect Yasir Islam Butt has spearheaded digital transformations across Oracle EBS, SAP S/4HANA, Microsoft Dynamics, and cloud-native enterprise migrations across the UK, USA, and global markets.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href="https://www.linkedin.com/in/yasirislambutt/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-[#0A66C2] hover:bg-[#004182] shadow-lg shadow-[#0A66C2]/30 transition-all text-sm group"
                    >
                      <LinkedinIcon className="w-4 h-4 text-white" />
                      <span>Connect on LinkedIn</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href="#founder"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all text-sm"
                    >
                      <Clock className="w-4 h-4 text-[#D5B170]" />
                      <span>View Founder Experience</span>
                    </a>
                  </div>
                  <div className="text-xs text-[#D5C4A1] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF99]" />
                    <span>SAP S/4HANA • Oracle EBS • Cloud Datacenter Migration • Enterprise Architecture</span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="bg-[#190D06]/85 backdrop-blur-md rounded-2xl border border-[#E8DFD5]/20 p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D2214] mb-3">
                      <span className="text-xs font-mono text-[#D5B170] tracking-wider uppercase font-semibold">Chief Architect Career Milestones</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#0A66C2]/30 text-[#60A5FA] text-[10px] font-mono font-bold">VERIFIED</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">1999 - 2007: Enterprise Core IT</div>
                          <div className="text-[10px] text-[#A88B73]">Oracle Database Architecture & Relational Engineering</div>
                        </div>
                        <span className="text-[10px] font-mono text-[#D5B170]">Stage 1</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">2008 - 2015: Tier-1 Banking ERPs</div>
                          <div className="text-[10px] text-[#A88B73]">SAP S/4HANA, Oracle EBS Financials & Supply Chain</div>
                        </div>
                        <span className="text-[10px] font-mono text-[#D5B170]">Stage 2</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">2016 - 2023: Cloud & K8s Microservices</div>
                          <div className="text-[10px] text-[#A88B73]">AWS, GCP, Kubernetes, CI/CD Pipeline Automation</div>
                        </div>
                        <span className="text-[10px] font-mono text-[#D5B170]">Stage 3</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#29150B]/90 border border-[#00FF99]/40 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">2024 - 2026+: Autonomous AI Swarms</div>
                          <div className="text-[10px] text-[#00FF99]">Claude 3.7, Antigravity Protocols & Media Engines</div>
                        </div>
                        <span className="text-[10px] font-mono text-[#00FF99]">Current</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#3D2214] flex justify-between items-center text-[11px]">
                      <span className="text-[#A88B73]">Yasir Islam Butt</span>
                      <a 
                        href="https://www.linkedin.com/in/yasirislambutt/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-[#60A5FA] hover:text-white font-bold flex items-center gap-1"
                      >
                        LinkedIn Profile <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 6: FRONTIER AI (VEO 3 & GROK) ---------------- */}
            {currentSlide === 6 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2214]/80 border border-[#C59A58]/50 text-xs text-[#F5E2BE] font-semibold mb-4 backdrop-blur-md shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-[#D5B170]" />
                    <span>BANNER 7 OF 8 • Frontier Model Innovation</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[34px] font-extrabold text-white leading-snug mb-3 font-['Cinzel'] tracking-tight drop-shadow-md">
                    Next-Gen AI Roadmap: <span className="bg-gradient-to-r from-[#F5E2BE] via-[#D4A76A] to-[#805423] bg-clip-text text-transparent">Google VEO 3, Grok & Beyond</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#E5D7CC] mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
                    Deploy before your competitors do. We harness Google VEO 3 for high-frame-rate cinematic generative video, xAI Grok for zero-lag social pulse intelligence, and custom multimodal agent architectures.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/30 transition-all text-sm group"
                    >
                      <span>Submit Inquiry Form Below</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="#services"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all text-sm"
                    >
                      <Cpu className="w-4 h-4 text-[#D5B170]" />
                      <span>Explore Frontier Stack</span>
                    </a>
                  </div>
                  <div className="text-xs text-[#D5C4A1] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF99]" />
                    <span>Direct inquiry window: Under 2 Hours SLA • Strict Mutual NDA</span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="bg-[#190D06]/85 backdrop-blur-md rounded-2xl border border-[#E8DFD5]/20 p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D2214] mb-3">
                      <span className="text-xs font-mono text-[#D5B170] tracking-wider uppercase font-semibold">Frontier Model Telemetry</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00FF99]/20 text-[#00FF99] text-[10px] font-mono font-bold">LIVE PRODUCTION</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                          <Film className="w-3.5 h-3.5 text-[#FF4D4D]" /> Google VEO 3 Cinematic Studio
                        </div>
                        <div className="text-[10px] text-[#A88B73]">Generative video with realistic temporal physics & commercial quality.</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-[#FFB347]" /> xAI Grok Real-Time Signals
                        </div>
                        <div className="text-[10px] text-[#A88B73]">Real-time social trend ingestion for viral broadcast syndication.</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30">
                        <div className="text-xs font-bold text-white mb-0.5 flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-[#00FF99]" /> Claude 3.7 & Google Antigravity
                        </div>
                        <div className="text-[10px] text-[#A88B73]">Long-horizon agentic task execution and self-healing pipelines.</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#3D2214]">
                      <a
                        href="#contact"
                        className="w-full py-2.5 rounded-xl bg-[#8C5E2D] hover:bg-[#734A1F] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <span>Go to Contact Form Below</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------- SLIDE 7: UK & USA ENTERPRISE ---------------- */}
            {currentSlide === 7 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center animate-fadeIn">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3D2214]/80 border border-[#C59A58]/50 text-xs text-[#F5E2BE] font-semibold mb-4 backdrop-blur-md shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D5B170]" />
                    <span>BANNER 8 OF 8 • Transatlantic Enterprise Pedigree</span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[34px] font-extrabold text-white leading-snug mb-3 font-['Cinzel'] tracking-tight drop-shadow-md">
                    Global Delivery Standards Trusted by <span className="bg-gradient-to-r from-[#F5E2BE] via-[#D4A76A] to-[#805423] bg-clip-text text-transparent">Top-Tier UK & USA Enterprises</span>
                  </h2>
                  <p className="text-sm sm:text-base text-[#E5D7CC] mb-6 leading-relaxed max-w-xl font-normal drop-shadow">
                    Decades of cross-continental delivery experience servicing FTSE 100 leaders, Fortune 500 corporations, and hyper-growth scaleups across London, Silicon Valley, and New York.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/30 transition-all text-sm group"
                    >
                      <span>Schedule Enterprise Discovery</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="#why-us"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-sm transition-all text-sm"
                    >
                      <Globe2 className="w-4 h-4 text-[#D5B170]" />
                      <span>Why Arham Technologies</span>
                    </a>
                  </div>
                  <div className="text-xs text-[#D5C4A1] flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF99]" />
                    <span>London & Silicon Valley Presence • SOC-2 Type II Standards • 24/7 Follow-the-Sun Support</span>
                  </div>
                </div>

                {/* Right Visual Card */}
                <div className="hidden lg:block lg:col-span-5">
                  <div className="bg-[#190D06]/85 backdrop-blur-md rounded-2xl border border-[#E8DFD5]/20 p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-[#3D2214] mb-4">
                      <span className="text-xs font-mono text-[#D5B170] tracking-wider uppercase font-semibold">Global Delivery Assurance</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#00FF99]/20 text-[#00FF99] text-[10px] font-mono font-bold">ENTERPRISE SLA</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 text-center">
                        <div className="text-2xl font-extrabold text-[#00FF99] font-mono">99.8%</div>
                        <div className="text-[10px] text-[#A88B73]">Uptime SLA Record</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#29150B]/90 border border-[#D5B170]/30 text-center">
                        <div className="text-2xl font-extrabold text-[#D5B170] font-mono">12+</div>
                        <div className="text-[10px] text-[#A88B73]">Global Enterprise Clients</div>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded-lg bg-[#24130A] flex justify-between items-center text-[#E5D7CC]">
                        <span>London & UK Hub</span>
                        <span className="text-white font-semibold">Financials & Logistics</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#24130A] flex justify-between items-center text-[#E5D7CC]">
                        <span>USA & Silicon Valley</span>
                        <span className="text-white font-semibold">Enterprise SaaS & AI</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#3D2214] flex justify-between items-center text-[11px] text-[#A88B73]">
                      <span>SOC-2 • ISO 27001 • Strict NDA</span>
                      <span className="text-[#00FF99] font-bold">24/7 SLA</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Slide Timing Indicator Bar at Top of Banner */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30">
            <div 
              className="h-full bg-gradient-to-r from-[#8C5E2D] via-[#D5B170] to-[#00FF99] transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            />
          </div>
        </div>

        {/* ========================================================
            CAROUSEL MENU UNDER THE BANNERS 1 TO 8
        ======================================================== */}
        <div className="mt-3 sm:mt-4 w-full">
          {/* 8-Banner Navigation Menu Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {slideTabs.map((tab, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`relative px-3 py-2.5 rounded-xl text-left transition-all duration-300 flex flex-col justify-between border group ${
                    isActive
                      ? 'bg-[#8C5E2D] text-white border-[#8C5E2D] shadow-lg shadow-[#8C5E2D]/25 scale-[1.02]'
                      : 'bg-white/85 hover:bg-white text-[#4A3222] border-[#E8DFD5] hover:border-[#8C5E2D]/50 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-[#F5E2BE]' : 'text-[#8C5E2D]'}`}>
                      {tab.num}
                    </span>
                    {isActive && (
                      <span className="flex h-1.5 w-1.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold truncate leading-tight">
                    {tab.title}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#D5B170] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Compact Status Bar Underneath */}
          <div className="flex items-center justify-between px-2 pt-2 text-xs text-[#8C5E2D]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 rounded-full hover:bg-[#8C5E2D]/10 text-[#8C5E2D] transition-colors"
                title={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <span className="font-mono text-[11px] text-[#664E40]">
                Banner <strong className="text-[#26160C]">{currentSlide + 1}</strong> of <strong className="text-[#26160C]">8</strong>
              </span>
              <span className="text-[#D5C4A1]">?</span>
              <span className="text-[11px] text-[#8C5E2D] font-medium hidden sm:inline">
                Hover to pause • Use left/right keys or center arrows to browse
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#8C5E2D] bg-[#8C5E2D]/10 px-2.5 py-0.5 rounded-full font-bold">
                4s Auto-Rotation
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

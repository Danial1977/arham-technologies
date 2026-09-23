import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Clock, TrendingUp } from 'lucide-react';

export default function AiEstimator({ onSelectEstimate }) {
  const [goal, setGoal] = useState('channel-auto');
  const [scale, setScale] = useState('mid');

  const goals = [
    {
      id: 'channel-auto',
      title: 'YouTube & FB Automation',
      icon: '🎥',
      desc: 'Hands-off viral scriptwriting, AI voice synthesis, thumbnail A/B testing & video dispatch.'
    },
    {
      id: 'ai-agents',
      title: 'Autonomous AI Agents',
      icon: '🤖',
      desc: 'Self-governing digital workforces for support, lead nurturing, and internal operations.'
    },
    {
      id: 'ai-training',
      title: 'Claude & Antigravity Training',
      icon: '🎓',
      desc: 'Intensive corporate upskilling in frontier reasoning models and agent orchestration.'
    },
    {
      id: 'gen-video',
      title: 'Generative Video & VEO 3',
      icon: '✨',
      desc: 'Hyper-realistic video ads and creative assets using Google VEO 3 and multimodal AI.'
    },
    {
      id: 'ecommerce',
      title: 'eCommerce AI Overhaul',
      icon: '🛍️',
      desc: 'Predictive inventory, dynamic pricing, and intelligent recommendation storefronts.'
    }
  ];

  const scales = [
    { id: 'startup', label: 'Startup / Growing Team (1-10)' },
    { id: 'mid', label: 'Mid-Market Enterprise (10-100)' },
    { id: 'large', label: 'Large Corporate (100+)' },
  ];

  // Dynamic calculations
  const estimates = {
    'channel-auto': {
      startup: { hours: 140, multiplier: '5x', launchTime: '7-10 Days', stack: 'YouTube API, Meta Graph, Claude 3.7, Custom Auto-Renderer' },
      mid: { hours: 380, multiplier: '9x', launchTime: '2 Weeks', stack: 'VEO 3, Claude, Multi-Channel Scheduler, Dynamic Audio Engine' },
      large: { hours: 900, multiplier: '15x', launchTime: '3-4 Weeks', stack: 'Google Flow, Enterprise Video Swarm, Multi-Brand Syndication' }
    },
    'ai-agents': {
      startup: { hours: 120, multiplier: '4x', launchTime: '10-14 Days', stack: 'Claude, Antigravity Agent Runtime, Vector RAG' },
      mid: { hours: 450, multiplier: '10x', launchTime: '2-3 Weeks', stack: 'Multi-Agent Swarm, Tool-Calling Bus, ERP/CRM Webhooks' },
      large: { hours: 1200, multiplier: '18x', launchTime: '4 Weeks', stack: 'Enterprise Autonomous Workforces, Audit Vault, On-Prem Fallback' }
    },
    'ai-training': {
      startup: { hours: 80, multiplier: '3.5x', launchTime: '3-5 Days', stack: 'Claude Mastery, Prompt Engineering, Practical Workflows' },
      mid: { hours: 260, multiplier: '8x', launchTime: '1-2 Weeks', stack: 'Antigravity Multi-Agent Bootcamps, Coding Copilots, Security Guardrails' },
      large: { hours: 650, multiplier: '12x', launchTime: '2-3 Weeks', stack: 'Executive Strategic AI Council, Org-Wide Certification, Sandbox Lab' }
    },
    'gen-video': {
      startup: { hours: 110, multiplier: '6x', launchTime: '5-7 Days', stack: 'Google VEO 3, Runway Gen-3, Voice Models' },
      mid: { hours: 320, multiplier: '11x', launchTime: '10-14 Days', stack: 'VEO 3 Batch Pipeline, Brand Style Conditioning, 4K Upscaling' },
      large: { hours: 800, multiplier: '20x', launchTime: '3 Weeks', stack: 'Omni-Channel Video Production Grid, Studio-Grade Pipelines' }
    },
    'ecommerce': {
      startup: { hours: 100, multiplier: '4x', launchTime: '10-12 Days', stack: 'Shopify / WooCommerce AI Plugins, Chat Copilot' },
      mid: { hours: 350, multiplier: '9x', launchTime: '2-3 Weeks', stack: 'Headless React, Predictive Catalog Search, Inventory Forecasting' },
      large: { hours: 1100, multiplier: '16x', launchTime: '4 Weeks', stack: 'Custom Microservices, Real-Time Dynamic Pricing, Global CDN' }
    }
  };

  const currentResult = estimates[goal][scale];
  const currentGoalTitle = goals.find(g => g.id === goal)?.title;

  return (
    <section id="ai-estimator" className="py-24 bg-slate-50/70 relative border-t border-b border-slate-200">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 glow-cyan rounded-full pointer-events-none blur-3xl opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-xs font-bold text-cyan-800 uppercase tracking-widest mb-3">
            <Calculator className="w-3.5 h-3.5 text-cyan-700" /> Interactive ROI & Architecture Planner
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Calculate Your <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">AI Acceleration Impact</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Select your organization’s immediate objective and team scale to see an instant projection of operational hours saved, velocity multipliers, and recommended technology stack.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Objective */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-800 mb-4 block">
                Step 1: Select Your Primary AI Objective
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                      goal === g.id
                        ? 'bg-cyan-50/90 border-cyan-500 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <div>
                      <div className="text-2xl mb-2">{g.icon}</div>
                      <div className={`font-bold text-sm ${goal === g.id ? 'text-slate-900' : 'text-slate-800'}`}>
                        {g.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {g.desc}
                      </div>
                    </div>
                    {goal === g.id && (
                      <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-cyan-700">
                        <Check className="w-3.5 h-3.5" /> Selected Goal
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Scale */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 shadow-sm">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-800 mb-4 block">
                Step 2: Organization / Department Scale
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scales.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setScale(s.id)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold text-center border transition-all ${
                      scale === s.id
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-transparent shadow-md shadow-cyan-600/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-7 rounded-2xl border border-cyan-300/80 relative overflow-hidden bg-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Projected AI Yield
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                  25-Yr Enterprise Model
                </span>
              </div>

              <div className="text-sm font-semibold text-slate-600 mb-1">
                Target Architecture:
              </div>
              <div className="text-2xl font-bold text-slate-900 font-['Space_Grotesk'] mb-6 text-cyan-800">
                {currentGoalTitle}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Hours Saved / Mo</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                    {currentResult.hours}+
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                    Direct labor saved
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Velocity Gain</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700 font-['Space_Grotesk']">
                    {currentResult.multiplier}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    Faster time-to-market
                  </div>
                </div>
              </div>

              {/* Deployment Details */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50/80 border border-slate-200 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Deployment Horizon:</span>
                  <span className="font-bold text-slate-800">{currentResult.launchTime}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 block mb-1">
                    Recommended Frontier Stack:
                  </span>
                  <span className="text-xs text-cyan-800 font-mono font-semibold">
                    {currentResult.stack}
                  </span>
                </div>
              </div>

              {/* CTA Action */}
              <a
                href="#contact"
                onClick={() => {
                  if (onSelectEstimate) {
                    onSelectEstimate({
                      goal: currentGoalTitle,
                      scale: scales.find(s => s.id === scale)?.label,
                      hoursSaved: `${currentResult.hours}+ hrs/mo`,
                      stack: currentResult.stack
                    });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-600/25 transition-all group"
              >
                <span>Request Custom Architecture Plan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-[11px] text-slate-500 mt-3 font-medium">
                Direct consultation with Founder Yasir Islam Butt (25+ Yrs Experience)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

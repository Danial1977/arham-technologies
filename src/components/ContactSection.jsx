import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  Sparkles,
  Calendar,
  Database
} from 'lucide-react';
import { LinkedinIcon } from './BrandIcons';
import { db } from '../services/db';

export default function ContactSection({ prefillData, onOpenDatabase }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    selectedServices: ['AI Business Solutions'],
    budget: '$15k - $50k',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState(null);

  // If user selected an estimate from the AI Estimator
  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        selectedServices: [prefillData.goal || 'AI Business Solutions'],
        message: `Inquiry regarding ${prefillData.goal} for ${prefillData.scale}. Expected yield: ${prefillData.hoursSaved}. Recommended stack: ${prefillData.stack}.`
      }));
    }
  }, [prefillData]);

  const availableServices = [
    'AI Business Solutions',
    'YouTube Channel Automation',
    'Facebook Automation',
    'Claude & Antigravity Training',
    'Google VEO 3 & GenAI Studio',
    'Autonomous AI Agents',
    'Google Flow & Pipelines',
    'eCommerce Solutions',
    '24/7 Application Support'
  ];

  const budgetTiers = [
    '$5k - $15k',
    '$15k - $50k',
    '$50k - $100k',
    'Enterprise / Retainer'
  ];

  const toggleService = (srv) => {
    setFormData(prev => {
      const exists = prev.selectedServices.includes(srv);
      if (exists) {
        if (prev.selectedServices.length === 1) return prev; // keep at least one
        return { ...prev, selectedServices: prev.selectedServices.filter(s => s !== srv) };
      } else {
        return { ...prev, selectedServices: [...prev.selectedServices, srv] };
      }
    });
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Business email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid business email';
    }
    if (!formData.message.trim()) errs.message = 'Please share a brief summary of your project or requirements';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Save directly into the persistent Arham Central Database
    const record = db.addInquiry({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      services: formData.selectedServices,
      budget: formData.budget,
      message: formData.message
    });

    setSubmittedRecord(record);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-white relative border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EFE6] border border-[#E8DFD5] text-xs font-bold text-[#8C5E2D] uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5 text-[#8C5E2D]" /> Direct Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#26160C] tracking-tight font-['Cinzel']">
            Let's Engineer Your <span className="bg-gradient-to-r from-[#8C5E2D] via-[#B89F70] to-[#523C1B] bg-clip-text text-transparent">AI Advantage</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#664E40]">
            Connect directly with Yasir Islam Butt and our senior AI engineering team. We review each inquiry within 2 hours and provide actionable technical roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel bg-[#FAF7F2] p-8 rounded-2xl border border-[#E8DFD5] space-y-6 shadow-xs">
              <h3 className="text-xl font-bold text-[#26160C] font-['Cinzel'] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8C5E2D]" />
                <span>Executive Office</span>
              </h3>
              <p className="text-sm text-[#664E40] leading-relaxed">
                Whether you need turnkey channel automation, multi-agent deployment, bespoke Claude training, or mission-critical application support—we stand ready to partner.
              </p>

              <div className="space-y-4 pt-4 border-t border-[#E8DFD5]">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4 text-[#8C5E2D]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#664E40] block font-medium">Direct Inquiry</span>
                    <a href="mailto:ArhamTechnologiesLtd@gmail.com" className="text-sm font-bold text-[#26160C] hover:text-[#8C5E2D] transition-colors">
                      ArhamTechnologiesLtd@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center shrink-0 shadow-2xs">
                    <LinkedinIcon className="w-4 h-4 fill-[#8C5E2D]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#664E40] block font-medium">Founder Profile</span>
                    <a 
                      href="https://www.linkedin.com/in/yasirislambutt/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#8C5E2D] hover:underline flex items-center gap-1"
                    >
                      Yasir Islam Butt on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#E8DFD5] flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-4 h-4 text-[#8C5E2D]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#664E40] block font-medium">Response Window</span>
                    <span className="text-sm font-bold text-[#26160C]">Under 2 Hours (Mon-Sat)</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-xl bg-white border border-[#E8DFD5] text-xs text-[#664E40] flex items-center gap-3 shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-[#8C5E2D] shrink-0" />
                <span>Non-Disclosure & Enterprise Confidentiality Guaranteed across all discovery calls.</span>
              </div>
            </div>

            {/* Quick Call Out */}
            <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#E8DFD5]">
              <div className="flex items-center gap-2 text-[#8C5E2D] text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4 text-[#8C5E2D]" /> Prefer Live Discussion?
              </div>
              <p className="text-xs text-[#664E40] mb-3">
                Fill the inquiry form or specify your preferred time slot for a direct Zoom/Google Meet architecture review.
              </p>
              <div className="text-[11px] font-semibold text-[#8C5E2D]">
                Immediate calendar invite dispatched upon receipt.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel bg-white p-8 sm:p-10 rounded-2xl border border-[#E8DFD5] shadow-xl">
              
              {submitted ? (
                /* Confirmation Screen */
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#F5EFE6] text-[#8C5E2D] flex items-center justify-center mx-auto mb-4 border border-[#E8DFD5]">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-[#26160C] font-['Cinzel']">
                    Consultation Request Confirmed
                  </h3>
                  <p className="text-[#664E40] text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-[#26160C] font-bold">{formData.name}</span>. Your project parameters have been routed directly to <span className="text-[#8C5E2D] font-bold">Yasir Islam Butt</span> and our principal engineering lead.
                  </p>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] text-left text-xs max-w-md mx-auto space-y-2">
                    <div className="flex justify-between text-[#664E40]">
                      <span>Database Record ID:</span>
                      <span className="font-mono text-[#8C5E2D] font-bold">{submittedRecord?.id || '#ARHAM-RECORD'}</span>
                    </div>
                    <div className="flex justify-between text-[#664E40]">
                      <span>Email Dispatched To:</span>
                      <span className="text-[#26160C] font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-[#664E40]">
                      <span>Target Focus:</span>
                      <span className="text-[#26160C] font-semibold">{formData.selectedServices.join(', ')}</span>
                    </div>
                    <div className="flex justify-between text-[#664E40]">
                      <span>Database Sync:</span>
                      <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Stored in Central Database
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    {onOpenDatabase && (
                      <button
                        onClick={onOpenDatabase}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#26160C] hover:bg-[#8C5E2D] transition-all shadow-md"
                      >
                        <Database className="w-3.5 h-3.5 text-[#D5C4A1]" />
                        <span>View In Database Console</span>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          phone: '',
                          selectedServices: ['AI Business Solutions'],
                          budget: '$15k - $50k',
                          message: ''
                        });
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-[#332015] bg-[#F5EFE6] border border-[#E8DFD5] hover:bg-[#E8DEC8] transition-colors"
                    >
                      <span>Submit Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* The Contact Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-2">
                        Full Name <span className="text-[#8C5E2D]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Yasir Khan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#26160C] placeholder-[#8C7A6D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C5E2D]/20 transition-all ${
                          errors.name ? 'border-red-500' : 'border-[#E8DFD5] focus:border-[#8C5E2D]'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-2">
                        Business Email <span className="text-[#8C5E2D]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="yasir@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#26160C] placeholder-[#8C7A6D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C5E2D]/20 transition-all ${
                          errors.email ? 'border-red-500' : 'border-[#E8DFD5] focus:border-[#8C5E2D]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-2">
                        Company or Brand
                      </label>
                      <input
                        type="text"
                        placeholder="Company name or channel"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] focus:bg-white focus:border-[#8C5E2D] text-sm text-[#26160C] placeholder-[#8C7A6D] focus:outline-none focus:ring-2 focus:ring-[#8C5E2D]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] focus:bg-white focus:border-[#8C5E2D] text-sm text-[#26160C] placeholder-[#8C7A6D] focus:outline-none focus:ring-2 focus:ring-[#8C5E2D]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Services Multi-Select Chips */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-2">
                      Services of Interest (Select All That Apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableServices.map((srv) => {
                        const isSelected = formData.selectedServices.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              isSelected
                                ? 'bg-[#8C5E2D] text-white shadow-xs'
                                : 'bg-[#F5EFE6] border border-[#E8DFD5] text-[#664E40] hover:bg-[#E8DEC8]'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {srv}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-2">
                      Estimated Project Scope / Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetTiers.map((tier) => (
                        <button
                          type="button"
                          key={tier}
                          onClick={() => setFormData({ ...formData, budget: tier })}
                          className={`py-2 px-3 rounded-xl text-xs font-bold text-center border transition-all ${
                            formData.budget === tier
                              ? 'bg-[#F5EFE6] border-[#8C5E2D] text-[#8C5E2D] shadow-2xs'
                              : 'bg-[#FAF7F2] border-[#E8DFD5] text-[#664E40] hover:bg-[#F5EFE6]'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-2">
                      Project Objective or Specific Requirements <span className="text-[#8C5E2D]">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your automation goals, team size, current bottlenecks, or specific training requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#26160C] placeholder-[#8C7A6D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8C5E2D]/20 transition-all ${
                        errors.message ? 'border-red-500' : 'border-[#E8DFD5] focus:border-[#8C5E2D]'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Architecture & Consultation Request</span>
                      </>
                    )}
                  </button>

                  <div className="text-center text-[11px] text-[#664E40] font-medium">
                    Protected by 256-bit enterprise encryption • Zero spam guarantee
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

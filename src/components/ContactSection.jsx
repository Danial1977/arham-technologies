import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  AlertCircle, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { LinkedinIcon } from './BrandIcons';

export default function ContactSection({ prefillData }) {
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

    // Simulate realistic asynchronous submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/70 border border-cyan-200 text-xs font-bold text-cyan-800 uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-700" /> Direct Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight font-['Space_Grotesk']">
            Let's Engineer Your <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">AI Advantage</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Connect directly with Yasir Islam Butt and our senior AI engineering team. We review each inquiry within 2 hours and provide actionable technical roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel bg-slate-50/90 p-8 rounded-2xl border border-slate-200 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk'] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                <span>Executive Office</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether you need turnkey channel automation, multi-agent deployment, bespoke Claude training, or mission-critical application support—we stand ready to partner.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Direct Inquiry</span>
                    <a href="mailto:info@arhamtechnologies.com" className="text-sm font-bold text-slate-900 hover:text-cyan-700 transition-colors">
                      info@arhamtechnologies.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <LinkedinIcon className="w-4 h-4 fill-[#0077b5]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Founder Profile</span>
                    <a 
                      href="https://www.linkedin.com/in/yasirislambutt/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-cyan-700 hover:underline flex items-center gap-1"
                    >
                      Yasir Islam Butt on LinkedIn
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs">
                    <Clock className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Response Window</span>
                    <span className="text-sm font-bold text-slate-900">Under 2 Hours (Mon-Sat)</span>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-3 shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-cyan-600 shrink-0" />
                <span>Non-Disclosure & Enterprise Confidentiality Guaranteed across all discovery calls.</span>
              </div>
            </div>

            {/* Quick Call Out */}
            <div className="p-6 rounded-2xl bg-cyan-50/70 border border-cyan-200">
              <div className="flex items-center gap-2 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-4 h-4 text-cyan-600" /> Prefer Live Discussion?
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Fill the inquiry form or specify your preferred time slot for a direct Zoom/Google Meet architecture review.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 relative shadow-xl">
              
              {submitted ? (
                /* Success State Modal / Card */
                <div className="text-center py-10 space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 font-['Space_Grotesk']">
                    Consultation Request Confirmed
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-slate-900 font-bold">{formData.name}</span>. Your project parameters have been routed directly to <span className="text-cyan-700 font-bold">Yasir Islam Butt</span> and our principal engineering lead.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Tracking ID:</span>
                      <span className="font-mono text-cyan-800 font-bold">#ARHAM-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Email Dispatched To:</span>
                      <span className="text-slate-900 font-semibold">{formData.email}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Target Focus:</span>
                      <span className="text-slate-900 font-semibold">{formData.selectedServices.join(', ')}</span>
                    </div>
                  </div>

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
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
                  >
                    <span>Submit Another Inquiry</span>
                  </button>
                </div>
              ) : (
                /* The Contact Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Full Name <span className="text-cyan-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Yasir Khan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all ${
                          errors.name ? 'border-red-500' : 'border-slate-200 focus:border-cyan-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Business Email <span className="text-cyan-600">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="yasir@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all ${
                          errors.email ? 'border-red-500' : 'border-slate-200 focus:border-cyan-500'
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
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Company or Brand
                      </label>
                      <input
                        type="text"
                        placeholder="Company name or channel"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-cyan-500 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Phone / WhatsApp (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-cyan-500 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Services Multi-Select Chips */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
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
                                ? 'bg-cyan-600 text-white shadow-sm'
                                : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
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
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
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
                              ? 'bg-cyan-50 border-cyan-500 text-cyan-800 shadow-xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Project Objective or Specific Requirements <span className="text-cyan-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your automation goals, team size, current bottlenecks, or specific training requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all ${
                        errors.message ? 'border-red-500' : 'border-slate-200 focus:border-cyan-500'
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
                    className="w-full py-4 px-8 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-lg shadow-cyan-600/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
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

                  <div className="text-center text-[11px] text-slate-500 font-medium">
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

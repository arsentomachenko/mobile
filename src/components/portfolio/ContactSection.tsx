import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ContactSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      {/* Background SVG */}
      <svg className="absolute top-0 left-0 w-full h-32 opacity-5" viewBox="0 0 1440 128" preserveAspectRatio="none">
        <path d="M0 0L720 128L1440 0V128H0Z" fill="#00FF87" />
      </svg>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Get In Touch
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's Build <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Something Great</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's discuss how I can help bring your mobile vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left - Contact Info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {[
              {
                title: 'Email',
                value: 'hello@mobiledev.io',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
              {
                title: 'Location',
                value: 'Available Worldwide (Remote)',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
              {
                title: 'Response Time',
                value: 'Within 24 hours',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
              },
            ].map((info) => (
              <div key={info.title} className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-[#00FF87]/5 border border-[#00FF87]/20 flex items-center justify-center text-[#00FF87] flex-shrink-0 group-hover:bg-[#00FF87]/10 group-hover:shadow-[0_0_15px_rgba(0,255,135,0.1)] transition-all duration-300">
                  {info.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{info.title}</h4>
                  <p className="text-gray-400 text-sm">{info.value}</p>
                </div>
              </div>
            ))}

            {/* Services */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] mt-8">
              <h4 className="text-white font-semibold mb-4">Services I Offer</h4>
              <div className="space-y-3">
                {[
                  'Native iOS & Android Development',
                  'Cross-Platform App Development',
                  'App Architecture Consulting',
                  'Performance Optimization',
                  'Code Review & Mentoring',
                  'CI/CD Pipeline Setup',
                ].map((service) => (
                  <div key={service} className="flex items-center gap-2 text-sm text-gray-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00FF87" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-12 rounded-2xl border border-[#00FF87]/20 bg-[#00FF87]/5">
                <svg viewBox="0 0 64 64" className="w-20 h-20 text-[#00FF87] mb-6">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
                  <polyline points="20 32 28 40 44 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-400 mb-6">Thank you for reaching out. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] rounded-full hover:bg-[#00FF87]/20 transition-all duration-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Name *</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-600 focus:border-[#00FF87]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF87]/30 transition-all duration-300`}
                      placeholder="Your name"
                    />
                    {errors.name && <span className="text-red-400 text-xs mt-1">{errors.name}</span>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-600 focus:border-[#00FF87]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF87]/30 transition-all duration-300`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project Type</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#00FF87]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF87]/30 transition-all duration-300 appearance-none"
                  >
                    <option value="" className="bg-[#1a1a1a]">Select a project type</option>
                    <option value="native" className="bg-[#1a1a1a]">Native iOS/Android App</option>
                    <option value="cross" className="bg-[#1a1a1a]">Cross-Platform App (Flutter/RN)</option>
                    <option value="hybrid" className="bg-[#1a1a1a]">Hybrid App (Ionic)</option>
                    <option value="consulting" className="bg-[#1a1a1a]">Architecture Consulting</option>
                    <option value="other" className="bg-[#1a1a1a]">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10'} text-white placeholder-gray-600 focus:border-[#00FF87]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF87]/30 transition-all duration-300 resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <span className="text-red-400 text-xs mt-1">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#00FF87] to-[#00D9A3] text-[#0a0a0a] font-bold rounded-xl hover:shadow-[0_0_30px_rgba(0,255,135,0.3)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

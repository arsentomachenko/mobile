import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CTASection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-24">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00FF87]/10 via-[#00D9A3]/5 to-transparent" />
          <div className="absolute inset-0 border border-[#00FF87]/20 rounded-3xl" />

          {/* Animated SVG decorations */}
          <svg className="absolute top-0 right-0 w-64 h-64 opacity-10" viewBox="0 0 256 256">
            <circle cx="128" cy="128" r="100" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="10 10">
              <animateTransform attributeName="transform" type="rotate" from="0 128 128" to="360 128 128" dur="30s" repeatCount="indefinite" />
            </circle>
            <circle cx="128" cy="128" r="70" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="8 8">
              <animateTransform attributeName="transform" type="rotate" from="360 128 128" to="0 128 128" dur="25s" repeatCount="indefinite" />
            </circle>
          </svg>

          <svg className="absolute bottom-0 left-0 w-48 h-48 opacity-10" viewBox="0 0 200 200">
            <rect x="20" y="20" width="160" height="160" rx="30" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="12 8">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="35s" repeatCount="indefinite" />
            </rect>
          </svg>

          <div className="relative z-10 text-center py-16 px-8">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Ready to Build Your Next
              <br />
              <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">
                Mobile Masterpiece?
              </span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">
              Whether it's native, cross-platform, or hybrid — let's create something exceptional together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-gradient-to-r from-[#00FF87] to-[#00D9A3] text-[#0a0a0a] font-bold rounded-full hover:shadow-[0_0_40px_rgba(0,255,135,0.3)] transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Start a Conversation
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '#';
                  link.download = 'resume.pdf';
                  alert('Resume download would start here!');
                }}
                className="px-8 py-4 border border-[#00FF87]/30 text-[#00FF87] font-semibold rounded-full hover:bg-[#00FF87]/10 transition-all duration-300 hover:border-[#00FF87]/60 flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

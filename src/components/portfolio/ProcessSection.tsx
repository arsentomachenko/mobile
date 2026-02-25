import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  {
    number: '01',
    title: 'Discovery & Research',
    description: 'Understanding the problem space, user needs, and platform requirements. Competitive analysis and technical feasibility assessment.',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <circle cx="14" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="21" y1="21" x2="28" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Architecture & Design',
    description: 'Choosing the right tech stack, designing scalable architecture, and creating wireframes. Selecting patterns like MVVM, BLoC, or MVI based on project needs.',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <rect x="4" y="4" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="4" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="4" y="18" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <rect x="18" y="18" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="14" y1="9" x2="18" y2="9" stroke="currentColor" strokeWidth="1" />
        <line x1="9" y1="14" x2="9" y2="18" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Development & Iteration',
    description: 'Agile sprints with continuous integration. Building features incrementally with thorough testing at each stage. Regular code reviews and performance profiling.',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <polyline points="4 24 10 14 16 18 22 8 28 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Testing & QA',
    description: 'Comprehensive testing: unit, widget, integration, and E2E. Performance profiling with native tools. Accessibility and cross-device compatibility checks.',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <path d="M16 4l-12 6v8c0 6 5 11 12 14 7-3 12-8 12-14v-8l-12-6z" fill="none" stroke="currentColor" strokeWidth="2" />
        <polyline points="11 16 14 19 21 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Launch & Optimize',
    description: 'App store optimization, CI/CD pipeline setup, crash monitoring, and analytics integration. Post-launch performance monitoring and iterative improvements.',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <path d="M16 4v24M8 12l8-8 8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="4" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
];

const ProcessSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-24 lg:py-32">
      {/* Animated SVG line connecting steps */}
      <svg className="absolute left-1/2 top-0 h-full w-1 opacity-10 hidden lg:block" viewBox="0 0 2 1000" preserveAspectRatio="none">
        <line x1="1" y1="0" x2="1" y2="1000" stroke="#00FF87" strokeWidth="2" strokeDasharray="8 8">
          <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1s" repeatCount="indefinite" />
        </line>
      </svg>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            How I Work
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Process</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A systematic approach to building exceptional mobile experiences, from concept to app store.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(50%+30px)] right-[-50%] h-px">
                  <svg className="w-full h-2" viewBox="0 0 200 2" preserveAspectRatio="none">
                    <line x1="0" y1="1" x2="200" y2="1" stroke="#00FF87" strokeWidth="1" strokeDasharray="6 4" opacity="0.3">
                      <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                    </line>
                  </svg>
                </div>
              )}

              <div className="text-center">
                {/* Number circle */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00FF87]/5 border border-[#00FF87]/20 mb-4 group-hover:bg-[#00FF87]/10 group-hover:border-[#00FF87]/40 group-hover:shadow-[0_0_20px_rgba(0,255,135,0.15)] transition-all duration-500">
                  <span className="text-[#00FF87] font-bold text-lg">{step.number}</span>
                  {/* Animated ring */}
                  <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" viewBox="0 0 64 64">
                    <rect x="2" y="2" width="60" height="60" rx="14" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="240" strokeDashoffset="240" className="group-hover:animate-draw-line" />
                  </svg>
                </div>

                {/* Icon */}
                <div className="text-[#00FF87] mb-3 flex justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {step.icon}
                </div>

                <h3 className="text-white font-semibold mb-2 group-hover:text-[#00FF87] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

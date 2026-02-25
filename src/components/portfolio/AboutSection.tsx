import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  const journey = [
    { year: '2015', title: 'Started Mobile Development', desc: 'Began with native Android (Java) and iOS (Objective-C/Swift)' },
    { year: '2019', title: 'Cross-Platform Pioneer', desc: 'Adopted Flutter and React Native for multi-platform delivery' },
    { year: '2020', title: 'Enterprise Solutions', desc: 'Built healthcare and marketplace apps serving thousands of users' },
    { year: '2021', title: 'Architecture Focus', desc: 'Deep dive into clean architecture, TDD, and CI/CD pipelines' },
    { year: '2022', title: 'Full-Stack Mobile', desc: 'Expanded to Ionic/Capacitor and modern native (Compose/SwiftUI)' },
    { year: '2024', title: 'Senior Engineer', desc: 'Leading mobile teams, mentoring developers, shipping at scale' },
  ];

  const values = [
    {
      title: 'Craftsmanship',
      desc: 'Every line of code is intentional. I build apps that are not just functional, but elegant.',
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <path d="M16 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Performance',
      desc: 'I obsess over startup times, frame rates, and memory usage. Smooth is non-negotiable.',
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <path d="M4 28l7-14 5 8 5-12 7 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'User-First',
      desc: 'Technology serves the user, not the other way around. Every decision starts with the experience.',
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <circle cx="16" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Continuous Learning',
      desc: 'The mobile landscape evolves fast. I stay ahead by constantly exploring new tools and patterns.',
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7">
          <path d="M4 16h6l3-8 4 16 3-8h8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32">
      {/* Background SVG */}
      <svg className="absolute bottom-0 right-0 w-96 h-96 opacity-[0.03] animate-spin-slow" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="180" fill="none" stroke="#00FF87" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="10 10" />
        <circle cx="200" cy="200" r="100" fill="none" stroke="#00FF87" strokeWidth="1" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="5 5" />
      </svg>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            About Me
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            The <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Developer</span> Behind The Code
          </h2>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left - Photo & Bio */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              {/* Photo */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00FF87] to-[#00D9A3] animate-morph opacity-20 blur-xl" />
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/699f57cd70001204b5f3365d_1772050738814_4da26ed6.jpg"
                  alt="Developer portrait"
                  className="relative w-full h-full object-cover object-center rounded-2xl border-2 border-[#00FF87]/20"
                />
                {/* Floating badge */}
                <div className="absolute -bottom-3 -right-3 px-4 py-2 bg-[#0a0a0a] border border-[#00FF87]/30 rounded-xl shadow-lg">
                  <span className="text-[#00FF87] font-semibold text-sm">11+ Years</span>
                </div>
              </div>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a passionate mobile developer who believes in the power of choosing the right tool for every job.
                  With deep expertise across <span className="text-[#00FF87] font-medium">Flutter, React Native, Swift, Kotlin, and Ionic</span>,
                  I don't just write code — I engineer solutions.
                </p>
                <p>
                  My philosophy is simple: <span className="text-white font-medium">depth over breadth, intent over technology</span>.
                  Every architectural decision, every framework choice, and every line of code is driven by what's best for the user and the product.
                </p>
                <p>
                  When I'm not building apps, I'm exploring new patterns, contributing to open source, or writing about
                  the nuances of mobile development that most developers overlook.
                </p>
              </div>
            </div>
          </div>

          {/* Right - Values & Journey */}
          <div className={`space-y-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            {/* Values */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Core Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((v) => (
                  <div
                    key={v.title}
                    className="group p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#00FF87]/20 hover:bg-[#00FF87]/5 transition-all duration-300"
                  >
                    <div className="text-[#00FF87] mb-2 group-hover:scale-110 transition-transform duration-300">
                      {v.icon}
                    </div>
                    <h4 className="text-white font-semibold mb-1">{v.title}</h4>
                    <p className="text-gray-500 text-sm">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Journey</h3>
              <div className="relative space-y-4">
                {/* Vertical line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#00FF87]/50 via-[#00FF87]/20 to-transparent" />

                {journey.map((item, i) => (
                  <div
                    key={item.year}
                    className={`relative flex gap-4 group transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`}
                    style={{ transitionDelay: `${i * 100 + 600}ms` }}
                  >
                    {/* Dot */}
                    <div className="relative z-10 w-10 h-10 rounded-full bg-[#0a0a0a] border-2 border-[#00FF87]/30 flex items-center justify-center flex-shrink-0 group-hover:border-[#00FF87] group-hover:shadow-[0_0_10px_rgba(0,255,135,0.3)] transition-all duration-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#00FF87]/50 group-hover:bg-[#00FF87] transition-colors" />
                    </div>

                    <div className="pb-4">
                      <span className="text-[#00FF87] text-xs font-mono">{item.year}</span>
                      <h4 className="text-white font-semibold text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

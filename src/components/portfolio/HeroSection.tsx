import React, { useEffect, useState } from 'react';

const HeroSection: React.FC = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Flutter Developer',
    'React Native Expert',
    'iOS Swift/SwiftUI Dev',
    'Android Kotlin Dev',
    'Ionic Developer',
    'Cross-Platform Architect',
  ];

  useEffect(() => {
    const role = roles[currentRole];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === role) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? role.substring(0, displayText.length - 1)
            : role.substring(0, displayText.length + 1)
        );
      }, isDeleting ? 40 : 80);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const bookingUrl = import.meta.env.VITE_CAL_BOOKING_URL;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated SVG Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large morphing blob */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] animate-morph bg-gradient-to-br from-[#00FF87]/10 to-[#00D9A3]/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] animate-morph bg-gradient-to-tr from-[#00D9A3]/10 to-[#00FF87]/5 blur-3xl" style={{ animationDelay: '4s' }} />

        {/* Animated SVG circles */}
        <svg className="absolute top-20 left-10 w-20 h-20 animate-float opacity-20" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="35" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="5 5">
            <animateTransform attributeName="transform" type="rotate" from="0 40 40" to="360 40 40" dur="20s" repeatCount="indefinite" />
          </circle>
        </svg>

        <svg className="absolute top-40 right-20 w-16 h-16 animate-float-slow opacity-20" viewBox="0 0 64 64">
          <rect x="8" y="8" width="48" height="48" rx="12" fill="none" stroke="#00D9A3" strokeWidth="1" strokeDasharray="4 4">
            <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="25s" repeatCount="indefinite" />
          </rect>
        </svg>

        <svg className="absolute bottom-40 left-1/4 w-12 h-12 animate-bounce-gentle opacity-15" viewBox="0 0 48 48">
          <polygon points="24,4 44,44 4,44" fill="none" stroke="#00FF87" strokeWidth="1" />
        </svg>

        {/* Animated code brackets */}
        <svg className="absolute top-1/3 left-8 w-24 h-24 animate-float opacity-10" viewBox="0 0 100 100">
          <text x="10" y="60" fontSize="60" fill="#00FF87" fontFamily="monospace">{'{'}</text>
        </svg>
        <svg className="absolute top-1/3 right-8 w-24 h-24 animate-float-slow opacity-10" viewBox="0 0 100 100">
          <text x="10" y="60" fontSize="60" fill="#00D9A3" fontFamily="monospace">{'}'}</text>
        </svg>

        {/* Animated lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 1440 900">
          <line x1="0" y1="200" x2="1440" y2="200" stroke="#00FF87" strokeWidth="0.5" strokeDasharray="10 20">
            <animate attributeName="stroke-dashoffset" from="0" to="60" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="400" x2="1440" y2="400" stroke="#00D9A3" strokeWidth="0.5" strokeDasharray="10 20">
            <animate attributeName="stroke-dashoffset" from="0" to="-60" dur="4s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="600" x2="1440" y2="600" stroke="#00FF87" strokeWidth="0.5" strokeDasharray="10 20">
            <animate attributeName="stroke-dashoffset" from="0" to="60" dur="5s" repeatCount="indefinite" />
          </line>
        </svg>

        {/* Phone outline SVG */}
        <svg className="absolute right-[10%] top-1/2 -translate-y-1/2 w-64 h-[500px] opacity-[0.06] animate-float hidden lg:block" viewBox="0 0 260 500">
          <rect x="10" y="10" width="240" height="480" rx="40" fill="none" stroke="#00FF87" strokeWidth="2" />
          <rect x="30" y="60" width="200" height="380" rx="5" fill="none" stroke="#00FF87" strokeWidth="1" />
          <circle cx="130" cy="30" r="5" fill="none" stroke="#00FF87" strokeWidth="1" />
          <rect x="100" y="460" width="60" height="4" rx="2" fill="#00FF87" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 animate-scale-in">
            <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
            <span className="text-sm text-[#00FF87] font-medium">Available for new projects</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight">
              <span className="text-white">I Build</span>
              <br />
              <span className="bg-gradient-to-r from-[#00FF87] via-[#00D9A3] to-[#4ade80] bg-clip-text text-transparent">
                Mobile Magic
              </span>
            </h1>

            {/* Typing animation */}
            <div className="h-12 flex items-center justify-center">
              <span className="text-xl sm:text-2xl lg:text-3xl text-gray-400 font-light">
                {displayText}
                <span className="inline-block w-0.5 h-7 bg-[#00FF87] ml-1 animate-pulse" />
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Crafting thoughtful, performant mobile experiences for iOS, Android, and beyond.
            From native perfection to cross-platform efficiency — I engineer solutions, not just code.
          </p>

          {/* Tech stack icons */}
          <div className="flex items-center justify-center gap-6 py-4 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            {[
              { name: 'Flutter', src: '/Flutter.svg' },
              { name: 'React Native', src: '/React.svg' },
              { name: 'Swift', src: '/Swift.svg' },
              { name: 'Kotlin', src: '/Kotlin.svg' },
              { name: 'Ionic', src: '/Ionic.svg' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 hover:border-[#00FF87]/50 transition-all duration-300 hover:scale-110 hover:bg-[#00FF87]/5"
              >
                <img src={tech.src} alt={`${tech.name} logo`} className="w-6 h-6" loading="lazy" />
                <span className="absolute -bottom-8 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.7s' }}>
            <button
              onClick={() => scrollTo('#projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#00FF87] to-[#00D9A3] text-[#0a0a0a] font-bold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,135,0.3)] hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00D9A3] to-[#00FF87] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              onClick={() => {
                if (bookingUrl) {
                  window.open(bookingUrl, '_blank', 'noopener,noreferrer');
                  return;
                }
                scrollTo('#contact');
              }}
              className="group px-8 py-4 border border-[#00FF87]/30 text-[#00FF87] font-semibold rounded-full hover:bg-[#00FF87]/10 transition-all duration-300 hover:border-[#00FF87]/60 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Set Schedule
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-y-[-2px]">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto pt-12 animate-slide-up" style={{ animationDelay: '0.9s' }}>
            {[
              { value: '11+', label: 'Years Experience' },
              { value: '20+', label: 'Apps Shipped' },
              { value: '5', label: 'Frameworks' },
              { value: '50+', label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="opacity-40">
            <rect x="1" y="1" width="22" height="38" rx="11" stroke="#00FF87" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="#00FF87">
              <animate attributeName="cy" from="12" to="28" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

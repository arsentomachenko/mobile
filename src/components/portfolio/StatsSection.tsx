import React, { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
}

const stats: StatItem[] = [
  {
    label: 'Apps Shipped',
    value: 15,
    suffix: '+',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <rect x="8" y="4" width="16" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="14" y1="26" x2="18" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'App Store Downloads',
    value: 500,
    suffix: 'K+',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <path d="M16 4v16M10 14l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 24v2a2 2 0 002 2h20a2 2 0 002-2v-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Lines of Code',
    value: 200,
    suffix: 'K+',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <polyline points="10 8 4 16 10 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="22 8 28 16 22 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="18" y1="6" x2="14" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Client Satisfaction',
    value: 98,
    suffix: '%',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M10 18s2 4 6 4 6-4 6-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="11" cy="13" r="1.5" fill="currentColor" />
        <circle cx="21" cy="13" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const AnimatedCounter: React.FC<{ target: number; suffix: string; isVisible: boolean }> = ({ target, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
};

const StatsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00FF87]/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00FF87]/5 border border-[#00FF87]/10 text-[#00FF87] mb-4 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,255,135,0.15)] transition-all duration-300">
                {stat.icon}
              </div>
              <div className="mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

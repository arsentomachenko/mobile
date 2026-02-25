import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO, HealthTech Startup',
    text: 'Exceptional mobile developer. Delivered our telehealth app ahead of schedule with impeccable code quality. The offline-first architecture was exactly what our patients needed.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Product Manager, PiZap',
    text: 'Rare talent who truly understands both iOS and Android ecosystems. The cross-platform consistency achieved was remarkable — our users can\'t tell the difference.',
    rating: 5,
  },
  {
    name: 'Emily Watson',
    role: 'Founder, GoEquipMe',
    text: 'Transformed our marketplace idea into a polished, high-performance app. The attention to detail in animations and user experience was beyond our expectations.',
    rating: 5,
  },
  {
    name: 'David Park',
    role: 'Lead Designer, RoadStr',
    text: 'A developer who speaks design language fluently. Every interaction was thoughtfully implemented, and the collaboration process was seamless from wireframe to launch.',
    rating: 5,
  },
  {
    name: 'Lisa Thompson',
    role: 'VP Engineering, Smile',
    text: 'Brought deep expertise in Flutter and native development. The architecture decisions made early on have paid dividends as we scale. Highly recommended.',
    rating: 5,
  },
];

const StarsRating: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#00FF87" stroke="#00FF87" strokeWidth="1">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </div>
);

const TestimonialsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF87]/[0.02] to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What Clients <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Say</span>
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className={`relative max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Quote SVG */}
          <svg className="absolute -top-6 -left-4 w-16 h-16 text-[#00FF87] opacity-10" viewBox="0 0 64 64" fill="currentColor">
            <path d="M14 34c-4 0-8-3-8-8s4-10 10-14l2 3c-4 3-6 6-6 9 0 1 1 2 2 2 3 0 6 2 6 6s-3 6-6 6zm24 0c-4 0-8-3-8-8s4-10 10-14l2 3c-4 3-6 6-6 9 0 1 1 2 2 2 3 0 6 2 6 6s-3 6-6 6z" />
          </svg>

          <div className="relative overflow-hidden">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  i === activeIndex
                    ? 'opacity-100 translate-x-0 relative'
                    : 'opacity-0 translate-x-full absolute inset-0'
                }`}
              >
                <div className="text-center px-8 py-10 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <StarsRating count={t.rating} />
                  <p className="text-gray-300 text-lg leading-relaxed mt-4 mb-6 italic">
                    "{t.text}"
                  </p>
                  <div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00FF87] to-[#00D9A3] mx-auto mb-3 flex items-center justify-center text-[#0a0a0a] font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === activeIndex
                    ? 'w-8 h-2 bg-[#00FF87]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

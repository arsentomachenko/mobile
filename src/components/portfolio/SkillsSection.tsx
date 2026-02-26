import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ReactNode;
  color: string;
  projects: number;
  description: string;
}

const skills: Skill[] = [
  {
    name: 'Flutter',
    level: 95,
    category: 'Cross-Platform',
    color: '#02569B',
    projects: 6,
    description: 'Dart, BLoC, Provider, Riverpod, Custom Widgets, Platform Channels',
    icon: (
      <img src="/Flutter.svg" alt="Flutter" className="w-8 h-8" />
    ),
  },
  {
    name: 'React Native',
    level: 90,
    category: 'Cross-Platform',
    color: '#61DAFB',
    projects: 4,
    description: 'Redux, Navigation, Native Modules, Reanimated, Expo',
    icon: (
      <img src="/React.svg" alt="React Native" className="w-8 h-8" />
    ),
  },
  {
    name: 'Swift / SwiftUI',
    level: 88,
    category: 'Native',
    color: '#F05138',
    projects: 3,
    description: 'UIKit, SwiftUI, Core Data, Combine, ARKit, WidgetKit',
    icon: (
      <img src="/Swift.svg" alt="Swift" className="w-8 h-8" />
    ),
  },
  {
    name: 'Kotlin',
    level: 88,
    category: 'Native',
    color: '#7F52FF',
    projects: 4,
    description: 'Jetpack Compose, Room, Coroutines, Hilt, Material You',
    icon: (
      <img src="/Kotlin.svg" alt="Kotlin" className="w-8 h-8" />
    ),
  },
  {
    name: 'Ionic',
    level: 82,
    category: 'Hybrid',
    color: '#3880FF',
    projects: 3,
    description: 'Capacitor, Angular/React, Web Components, PWA',
    icon: (
      <img src="/Ionic.svg" alt="Ionic" className="w-8 h-8" />
    ),
  },
  {
    name: 'Java',
    level: 85,
    category: 'Native',
    color: '#ED8B00',
    projects: 5,
    description: 'Android SDK, Legacy Apps, Enterprise Solutions',
    icon: (
      <img src="/Java.svg" alt="Java" className="w-8 h-8" />
    ),
  },
  {
    name: 'Firebase',
    level: 90,
    category: 'Backend',
    color: '#FFCA28',
    projects: 10,
    description: 'Auth, Firestore, Cloud Functions, Analytics, Crashlytics',
    icon: (
      <img src="/Firebase.svg" alt="Firebase" className="w-8 h-8" />
    ),
  },
  {
    name: 'CI/CD',
    level: 80,
    category: 'DevOps',
    color: '#00FF87',
    projects: 8,
    description: 'GitHub Actions, Fastlane, Bitrise, CodeMagic',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <circle cx="8" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="14" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" />
        <line x1="12" y1="18" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: 'UI/UX Design',
    level: 78,
    category: 'Design',
    color: '#FF6B9D',
    projects: 12,
    description: 'Figma, Material Design, HIG, Custom Animations',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <rect x="4" y="4" width="10" height="10" rx="2" fill="currentColor" opacity="0.5" />
        <rect x="18" y="4" width="10" height="10" rx="5" fill="currentColor" opacity="0.7" />
        <rect x="4" y="18" width="10" height="10" rx="2" fill="currentColor" opacity="0.7" />
        <rect x="18" y="18" width="10" height="10" rx="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Testing',
    level: 82,
    category: 'Quality',
    color: '#22c55e',
    projects: 10,
    description: 'Unit, Widget, Integration, E2E, TDD, BDD',
    icon: (
      <svg viewBox="0 0 32 32" className="w-8 h-8">
        <path d="M6 16l6 6L26 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const categories = ['All', 'Cross-Platform', 'Native', 'Hybrid', 'Backend', 'DevOps', 'Design', 'Quality'];

const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filteredSkills = activeCategory === 'All' ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-24 lg:py-32">
      {/* Section SVG decoration */}
      <svg className="absolute top-0 left-0 w-full h-20 opacity-10" viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0 80L720 20L1440 80V0H0Z" fill="#00FF87" />
      </svg>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Technical Arsenal
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills & <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Mastering the full spectrum of mobile development — from native craftsmanship to cross-platform efficiency.
          </p>
        </div>

        {/* Category Filter */}
        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#00FF87] text-[#0a0a0a] shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredSkills.map((skill, i) => (
            <div
              key={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`group relative p-5 rounded-2xl border transition-all duration-500 cursor-pointer ${
                hoveredSkill === skill.name
                  ? 'bg-[#00FF87]/5 border-[#00FF87]/30 scale-105 shadow-[0_0_30px_rgba(0,255,135,0.1)]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div
                className="mb-3 transition-all duration-300 group-hover:scale-110"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </div>

              {/* Name & Category */}
              <h3 className="text-white font-semibold mb-1">{skill.name}</h3>
              <span className="text-xs text-gray-500 mb-3 block">{skill.category}</span>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? `${skill.level}%` : '0%',
                    backgroundColor: skill.color,
                    transitionDelay: `${i * 100 + 500}ms`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">{skill.level}%</span>
                <span className="text-gray-500">{skill.projects} projects</span>
              </div>

              {/* Expanded description on hover */}
              <div className={`overflow-hidden transition-all duration-300 ${hoveredSkill === skill.name ? 'max-h-20 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="text-xs text-gray-400 leading-relaxed">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

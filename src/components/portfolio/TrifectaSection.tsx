import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type ApproachTab = 'native' | 'cross' | 'hybrid';

interface ApproachData {
  id: ApproachTab;
  title: string;
  subtitle: string;
  tech: string[];
  goal: string;
  highlights: string[];
  special: string;
  color: string;
  icon: React.ReactNode;
  architecture: string[];
}

const approaches: ApproachData[] = [
  {
    id: 'native',
    title: 'The Native Craftsman',
    subtitle: 'Platform-Perfect Experiences',
    tech: ['Kotlin', 'Jetpack Compose', 'Swift', 'SwiftUI', 'Core Data', 'Room'],
    goal: 'Build platform-perfect experiences with deep OS integration, adhering to Material You & HIG design languages.',
    highlights: [
      'Deep platform integration (widgets, biometric auth, ARKit)',
      'Adherence to Material You & Human Interface Guidelines',
      'Optimized performance with native rendering',
      'Offline-first architecture with Room & Core Data',
      'Background sync with WorkManager & BGTaskScheduler',
      'Advanced animations with Compose & SwiftUI transitions',
    ],
    special: 'Sophisticated offline-first architecture using Room and Core Data with background sync — going beyond simple CRUD to handle conflict resolution and incremental updates.',
    color: '#F05138',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M14 34V14h6l4 10 4-10h6v20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    architecture: ['MVVM / MVI', 'Clean Architecture', 'Dependency Injection (Hilt/Swinject)', 'Repository Pattern', 'Reactive Streams (Flow/Combine)'],
  },
  {
    id: 'cross',
    title: 'The Efficiency Expert',
    subtitle: 'One Codebase, Two Platforms',
    tech: ['Flutter', 'Dart', 'React Native', 'TypeScript', 'BLoC', 'Redux'],
    goal: 'Build high-quality, consistent apps for both platforms fast with a shared codebase while maintaining native feel.',
    highlights: [
      'Beautiful custom UI identical on iOS & Android',
      'Platform-specific code via channels/native modules',
      'Shared business logic portable to web/desktop',
      'Hot reload for rapid development iteration',
      'Custom widget/component libraries',
      'State management with BLoC, Provider, or Redux',
    ],
    special: 'Complex shared business logic layer that can be ported to web or desktop. Platform channels for native features while keeping 90%+ code shared.',
    color: '#02569B',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 24h24M24 12v24" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    architecture: ['BLoC / Redux Pattern', 'Feature-First Architecture', 'Platform Abstraction Layer', 'Shared Business Logic', 'Modular Packages'],
  },
  {
    id: 'hybrid',
    title: 'The Pragmatist',
    subtitle: 'Web Tech, Native Power',
    tech: ['Ionic', 'Capacitor', 'Angular', 'React', 'Web Components', 'PWA'],
    goal: 'Leverage web technologies for rapid development, especially for content-heavy apps and prototype phases.',
    highlights: [
      'Rapid development with web technologies',
      'Web Components for reusable UI',
      'Native device features via Capacitor plugins',
      'PWA version alongside app store builds',
      'Dynamic theming with CSS variables',
      'Content-first approach with SEO benefits',
    ],
    special: 'Dynamic theming engine using CSS variables for real-time, user-customizable app skins — demonstrating the unique power of web-based mobile development.',
    color: '#3880FF',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path d="M8 8h32v24H8z" fill="none" stroke="currentColor" strokeWidth="2" rx="3" />
        <path d="M16 32v4M32 32v4M12 36h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 16l-4 4 4 4M30 16l4 4-4 4M22 24l4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    architecture: ['Component-Based Architecture', 'Service Layer Pattern', 'Capacitor Plugin Bridge', 'CSS Custom Properties Engine', 'Progressive Enhancement'],
  },
];

const TrifectaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ApproachTab>('native');
  const { ref, isVisible } = useScrollAnimation();

  const active = approaches.find((a) => a.id === activeTab)!;

  return (
    <section id="trifecta" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 1440 900">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00FF87" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Development Philosophy
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            The <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Trifecta</span> Approach
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            One problem, three perspectives. I don't just know frameworks — I understand <em>when</em> and <em>why</em> to use each one.
            Here's how I approach the same challenge with different tools.
          </p>
        </div>

        {/* Tab Selector */}
        <div className={`flex flex-col sm:flex-row justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {approaches.map((approach) => (
            <button
              key={approach.id}
              onClick={() => setActiveTab(approach.id)}
              className={`group flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-500 ${
                activeTab === approach.id
                  ? 'bg-[#00FF87]/10 border-[#00FF87]/30 shadow-[0_0_25px_rgba(0,255,135,0.1)]'
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div style={{ color: activeTab === approach.id ? '#00FF87' : approach.color }} className="transition-colors duration-300">
                {approach.icon}
              </div>
              <div className="text-left">
                <div className={`font-semibold transition-colors ${activeTab === approach.id ? 'text-[#00FF87]' : 'text-white'}`}>
                  {approach.title}
                </div>
                <div className="text-xs text-gray-500">{approach.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left - Details */}
          <div className="space-y-6">
            {/* Goal */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-[#00FF87] uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
                Goal
              </h3>
              <p className="text-gray-300 leading-relaxed">{active.goal}</p>
            </div>

            {/* Tech Stack */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-[#00FF87] uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {active.tech.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-lg bg-[#00FF87]/5 border border-[#00FF87]/20 text-[#00FF87] text-sm font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* The Special Part */}
            <div className="p-6 rounded-2xl border border-[#00FF87]/20 bg-gradient-to-br from-[#00FF87]/5 to-transparent">
              <h3 className="text-sm font-semibold text-[#00FF87] uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                The "Special" Part
              </h3>
              <p className="text-gray-300 leading-relaxed">{active.special}</p>
            </div>
          </div>

          {/* Right - Highlights & Architecture */}
          <div className="space-y-6">
            {/* Key Highlights */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-[#00FF87] uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Key Highlights
              </h3>
              <div className="space-y-3">
                {active.highlights.map((h, i) => (
                  <div
                    key={h}
                    className="flex items-start gap-3 group"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="mt-1 w-5 h-5 rounded-full bg-[#00FF87]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00FF87]/20 transition-colors">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00FF87" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-gray-300 text-sm">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-[#00FF87] uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Architecture Patterns
              </h3>
              <div className="space-y-2">
                {active.architecture.map((a, i) => (
                  <div key={a} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00FF87]/10 flex items-center justify-center text-[#00FF87] text-xs font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="text-gray-300 text-sm">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SVG Architecture Diagram */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-[#00FF87] uppercase tracking-wider mb-4">Architecture Flow</h3>
              <svg viewBox="0 0 400 120" className="w-full h-auto">
                {/* Boxes */}
                <rect x="10" y="40" width="70" height="40" rx="8" fill="none" stroke="#00FF87" strokeWidth="1.5" opacity="0.8" />
                <text x="45" y="64" textAnchor="middle" fill="#00FF87" fontSize="10" fontFamily="monospace">UI Layer</text>

                <rect x="120" y="40" width="70" height="40" rx="8" fill="none" stroke="#00D9A3" strokeWidth="1.5" opacity="0.8" />
                <text x="155" y="64" textAnchor="middle" fill="#00D9A3" fontSize="10" fontFamily="monospace">Logic</text>

                <rect x="230" y="40" width="70" height="40" rx="8" fill="none" stroke="#4ade80" strokeWidth="1.5" opacity="0.8" />
                <text x="265" y="64" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="monospace">Data</text>

                <rect x="330" y="20" width="60" height="30" rx="6" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
                <text x="360" y="39" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">Remote</text>

                <rect x="330" y="70" width="60" height="30" rx="6" fill="none" stroke="#22c55e" strokeWidth="1" opacity="0.6" />
                <text x="360" y="89" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">Local</text>

                {/* Arrows */}
                <line x1="80" y1="60" x2="120" y2="60" stroke="#00FF87" strokeWidth="1" markerEnd="url(#arrowhead)" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="190" y1="60" x2="230" y2="60" stroke="#00D9A3" strokeWidth="1" markerEnd="url(#arrowhead)" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" from="20" to="0" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="300" y1="50" x2="330" y2="35" stroke="#4ade80" strokeWidth="1" opacity="0.5" />
                <line x1="300" y1="70" x2="330" y2="85" stroke="#4ade80" strokeWidth="1" opacity="0.5" />

                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#00FF87" opacity="0.5" />
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrifectaSection;

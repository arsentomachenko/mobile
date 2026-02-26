import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const marqueeLogos = [
  { src: '/Flutter.svg', alt: 'Flutter' },
  { src: '/React.svg', alt: 'React' },
  { src: '/Swift.svg', alt: 'Swift' },
  { src: '/Kotlin.svg', alt: 'Kotlin' },
  { src: '/Ionic.svg', alt: 'Ionic' },
  { src: '/Java.svg', alt: 'Java' },
  { src: '/Firebase.svg', alt: 'Firebase' },
];

const marqueeRow = Array.from({ length: 3 }, () => marqueeLogos).flat();

const tools = [
  { name: 'VS Code', category: 'Editor', icon: '/Visual_code.svg' },
  { name: 'Android Studio', category: 'IDE', icon: '/Android_studio.svg' },
  { name: 'Xcode', category: 'IDE', icon: '/Xcode.svg' },
  { name: 'Figma', category: 'Design', icon: '/Figma.svg' },
  { name: 'Git', category: 'Version Control', icon: '/Git.svg' },
  { name: 'GitHub Actions', category: 'CI/CD', icon: '/Github.svg' },
  { name: 'Fastlane', category: 'Automation', icon: '/Fastlane.svg' },
  { name: 'Firebase', category: 'Backend', icon: '/Firebase.svg' },
  { name: 'Postman', category: 'API Testing', icon: '/postman-icon.svg' },
  { name: 'Jira', category: 'Project Mgmt', icon: '/Jira.svg' },
  { name: 'Slack', category: 'Communication', icon: '/Slack.svg' },
  { name: 'Docker', category: 'DevOps', icon: '/Docker.svg' },
];

const ToolkitSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative py-20 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            Daily Toolkit
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Tools I <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Use</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              className={`group p-4 rounded-xl border border-white/10 bg-white/[0.02] text-center hover:border-[#00FF87]/20 hover:bg-[#00FF87]/5 transition-all duration-500 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#00FF87]/10 mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src={tool.icon} alt={tool.name} className="w-6 h-6 object-contain" />
              </div>
              <h4 className="text-white text-sm font-medium">{tool.name}</h4>
              <span className="text-gray-600 text-xs">{tool.category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolkitSection;

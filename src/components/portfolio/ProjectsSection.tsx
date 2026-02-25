import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  platforms: string[];
  links: { label: string; url: string; icon: 'android' | 'ios' | 'web' }[];
  highlights: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Push Doctor',
    description: 'A leading telehealth platform enabling patients to consult with NHS-registered doctors via video. Built with Flutter for seamless cross-platform healthcare delivery.',
    image: 'https://d64gsuwffb70l.cloudfront.net/699f57cd70001204b5f3365d_1772050525016_029b0ba9.jpg',
    tech: ['Flutter', 'Dart', 'Firebase', 'REST API', 'WebRTC'],
    category: 'Healthcare',
    platforms: ['Android'],
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.pushdr.application&hl=en', icon: 'android' },
    ],
    highlights: ['Video Consultation', 'Real-time Chat', 'NHS Integration', 'Prescription Management'],
  },
  {
    id: 2,
    title: 'MyMood AI',
    description: 'An AI-powered avatar and photo editor app built natively with Swift/SwiftUI. Features advanced image processing, AI avatar generation, and creative editing tools.',
    image: 'https://d64gsuwffb70l.cloudfront.net/699f57cd70001204b5f3365d_1772050498855_efcf9d4d.jpg',
    tech: ['Swift', 'SwiftUI', 'Core ML', 'Vision', 'ARKit'],
    category: 'AI / Photo',
    platforms: ['iOS'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/mymood-ai-avatar-photo-editor/id1669952628', icon: 'ios' },
    ],
    highlights: ['AI Avatar Generation', 'Photo Editing', 'Core ML Integration', 'Custom Filters'],
  },
  {
    id: 3,
    title: 'PiZap',
    description: 'A comprehensive photo editing and design platform available across web, iOS, and Android. Features advanced editing tools, templates, and social sharing capabilities.',
    image: 'https://d64gsuwffb70l.cloudfront.net/699f57cd70001204b5f3365d_1772050555802_709383a2.jpg',
    tech: ['React Native', 'Swift', 'Kotlin', 'Canvas API', 'Firebase'],
    category: 'Photo Editing',
    platforms: ['iOS', 'Android', 'Web'],
    links: [
      { label: 'Website', url: 'https://www.pizap.com/', icon: 'web' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.digitalpalette.pizap&hl=en&gl=US', icon: 'android' },
      { label: 'App Store', url: 'https://apps.apple.com/us/app/pizap-design-edit-photos/id642936943', icon: 'ios' },
    ],
    highlights: ['Multi-Platform', 'Template Engine', 'Social Sharing', 'Advanced Filters'],
  },
  {
    id: 4,
    title: 'GoEquipMe',
    description: 'A peer-to-peer equipment rental marketplace. Connects equipment owners with renters for construction, farming, and industrial equipment sharing.',
    image: 'https://d64gsuwffb70l.cloudfront.net/699f57cd70001204b5f3365d_1772050553363_2dedf655.jpg',
    tech: ['React Native', 'Node.js', 'Stripe', 'Google Maps', 'Firebase'],
    category: 'Marketplace',
    platforms: ['iOS', 'Android'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/goequipme-peer-to-peer/id1502954874', icon: 'ios' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.goequipeme', icon: 'android' },
    ],
    highlights: ['P2P Marketplace', 'Payment Integration', 'Geolocation', 'Real-time Messaging'],
  },
  {
    id: 5,
    title: 'Smile Member App',
    description: 'A dental membership and patient management app enabling seamless appointment booking, treatment tracking, and member benefits management.',
    image: 'https://d64gsuwffb70l.cloudfront.net/699f57cd70001204b5f3365d_1772050554310_aa015906.jpg',
    tech: ['Flutter', 'Dart', 'REST API', 'Push Notifications', 'Biometric Auth'],
    category: 'Healthcare',
    platforms: ['iOS', 'Android'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/smile-member-app/id1569765233', icon: 'ios' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.smile.members', icon: 'android' },
    ],
    highlights: ['Appointment Booking', 'Member Portal', 'Treatment Tracking', 'Push Notifications'],
  },
  {
    id: 6,
    title: 'RoadStr - Car App',
    description: 'A social automotive platform for car enthusiasts. Features route navigation, car meetup organization, and a community-driven car showcase experience.',
    image: 'https://d64gsuwffb70l.cloudfront.net/699f57cd70001204b5f3365d_1772050576808_a7570c3b.jpg',
    tech: ['Kotlin', 'Swift', 'Google Maps', 'Firebase', 'Social SDK'],
    category: 'Automotive',
    platforms: ['iOS', 'Android'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/roadstr-car-app/id1382535778', icon: 'ios' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=io.roadstr.app&hl=en&gl=US', icon: 'android' },
    ],
    highlights: ['Route Navigation', 'Car Meetups', 'Social Community', 'Live Tracking'],
  },
];

const platformFilters = ['All', 'iOS', 'Android', 'Web'];

const PlatformIcon: React.FC<{ type: 'android' | 'ios' | 'web' }> = ({ type }) => {
  switch (type) {
    case 'android':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 16V8a7 7 0 0 1 14 0v8" />
          <rect x="3" y="16" width="18" height="6" rx="2" />
          <path d="M7 2l2 3M17 2l-2 3" />
        </svg>
      );
    case 'ios':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8 2 6 5 6 8c0 4 3 6 3 10h6c0-4 3-6 3-10 0-3-2-6-6-6z" />
          <path d="M9 18h6M10 22h4" />
        </svg>
      );
    case 'web':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
};

const ProjectsSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState('All');
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = activePlatform === 'All'
    ? projects
    : projects.filter((p) => p.platforms.includes(activePlatform));

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      {/* Decorative SVGs */}
      <svg className="absolute top-10 right-10 w-32 h-32 opacity-5 animate-spin-slow" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="60" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="8 8" />
        <circle cx="64" cy="64" r="40" fill="none" stroke="#00D9A3" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="64" cy="64" r="20" fill="none" stroke="#00FF87" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Live Projects
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Featured <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Real apps, real users, real impact. Each project showcases different aspects of mobile engineering excellence.
          </p>
        </div>

        {/* Platform Filter */}
        <div className={`flex justify-center gap-3 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {platformFilters.map((pf) => (
            <button
              key={pf}
              onClick={() => setActivePlatform(pf)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activePlatform === pf
                  ? 'bg-[#00FF87] text-[#0a0a0a] shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {pf}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`group relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-[#00FF87]/30 hover:shadow-[0_0_40px_rgba(0,255,135,0.08)] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-medium backdrop-blur-sm">
                  {project.category}
                </div>

                {/* Platform badges */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {project.platforms.map((p) => (
                    <span key={p} className="px-2 py-1 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm border border-white/10">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00FF87] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <button
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  className="text-xs text-[#00FF87] hover:text-[#00D9A3] transition-colors mb-3 flex items-center gap-1"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-300 ${expandedProject === project.id ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {expandedProject === project.id ? 'Hide' : 'Show'} Key Features
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${expandedProject === project.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="grid grid-cols-2 gap-2 pb-3">
                    {project.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-1.5 text-xs text-gray-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00FF87" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2 pt-3 border-t border-white/5">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-xs hover:bg-[#00FF87]/10 hover:text-[#00FF87] transition-all duration-300 border border-white/5 hover:border-[#00FF87]/20"
                    >
                      <PlatformIcon type={link.icon} />
                      {link.label}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

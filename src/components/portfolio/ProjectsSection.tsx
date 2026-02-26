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
  metrics?: string[];
}

const projects: Project[] = [
  {
    id: 7,
    title: 'FitMeOut',
    description: 'iOS social app focused on outfit sharing and brand discovery. I worked as the iOS developer delivering production App Store releases.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/88/3c/e7/883ce7a3-8365-cb1b-caf3-c9986005ce72/1c313ad1-372f-4cf0-aa87-2890c57d8085_2.png/392x696bb.png',
    tech: ['iOS'],
    category: 'Social Networking',
    platforms: ['iOS'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/fitmeout/id1665536471', icon: 'ios' },
    ],
    highlights: ['Outfit Posts & Fashion Journal', 'Brand Tagging & Discovery', 'Mutual Followers', 'Dark / Light Theme'],
    metrics: ['App Store v1.2 (Apr 4, 2023)', 'iOS 15+', '67.8 MB', 'Social Networking'],
  },
  {
    id: 8,
    title: 'NailShots',
    description: 'An iOS social app for sharing nail art and connecting with creators.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource113/v4/51/89/23/51892307-642a-c68f-9cae-b413cbbabd8f/864cb972-fb98-4ae3-8250-c27f23df1b6e_1.png/392x696bb.png',
    tech: ['iOS'],
    category: 'Social Networking',
    platforms: ['iOS'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/eg/app/nailshots/id1666545496', icon: 'ios' },
    ],
    highlights: ['Nail art posts', 'Photo sharing', 'Community feed', 'Creator connections'],
  },
  {
    id: 9,
    title: 'Medznat',
    description: 'A medical knowledge hub with news, scientific articles, and case studies for healthcare professionals.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/46/36/8f/46368f50-1169-67b5-bc9f-def6dd7a651c/pr_source.png/392x696bb.png',
    tech: ['iOS', 'Android'],
    category: 'Medical',
    platforms: ['iOS', 'Android'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/medznat/id1111506408', icon: 'ios' },
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=medz.nat&hl=es&source=androidapkdescargar.com', icon: 'android' },
    ],
    highlights: ['Medical news', 'Scientific articles', 'Case studies', 'Drug flashcards'],
  },
  {
    id: 10,
    title: 'Hygea',
    description: 'A residential cleaning marketplace where users book services and select preferred cleaners.',
    image: '/hygea.png',
    tech: ['Android'],
    category: 'Productivity',
    platforms: ['Android'],
    links: [
      { label: 'Google Play', url: 'https://play.google.com/store/apps/details?id=com.hygea.customer', icon: 'android' },
    ],
    highlights: ['Book cleaning services', 'Cleaner marketplace', 'Identity checks', 'Auto pricing'],
  },
  {
    id: 11,
    title: 'PIFster',
    description: 'A community micro-donation app that helps people chip in small amounts to fund meaningful causes.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource126/v4/a8/ba/0e/a8ba0e18-6b25-6b9a-d579-83334e77d098/2276e72a-993f-450c-ae48-983d9c3a01fe_1.png/392x696bb.png',
    tech: ['iOS'],
    category: 'Social Networking',
    platforms: ['iOS'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/pifster/id1665561110', icon: 'ios' },
    ],
    highlights: ['Micro-donations', 'Community support', 'Cause discovery', 'Campaign sharing'],
  },
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
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/28/95/fa/2895faa7-b80f-6672-cf0c-3e22a37b3621/1c504599-ee24-493a-8506-cca4024e5bc6_1.png/392x696bb.png',
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
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/25/ae/e6/25aee6bd-faea-50d4-9465-b98c45c60f11/4313dc90-20a3-453e-882d-d47343b737ab_Digital_Palette_LLC_piZap_iOS_5.5_US_Screenshot_Resizing_220815_01.png/392x696bb.png',
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
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/fd/23/65/fd23652e-5c80-5054-8bdb-5ed5581c3fe8/a33f849a-3a53-479d-8b52-97c19fcffbed_0x0ss.png/392x696bb.png',
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
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource115/v4/87/03/3c/87033c24-5c64-e53f-bcfb-95beb4b64a72/e3b95bd3-0963-4b4e-a9f9-8432422efdad_Simulator_Screen_Shot_-_iPhone_8_Plus_-_2021-09-03_at_16.03.52.png/392x696bb.png',
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
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/8e/95/86/8e9586dc-5fb8-6b66-7ebe-dd7704d684f7/50ba0dee-eced-4f97-9e3f-e6bdbd446577_01.png/392x696bb.png',
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
    <section id="projects" className="relative bg-[var(--studio-bg)] py-24 lg:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-10 top-12 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(34,227,165,0.18),_transparent_60%)]" />
        <div className="absolute left-[-120px] bottom-[-120px] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(243,182,100,0.16),_transparent_60%)]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--studio-border)] bg-[var(--studio-panel-soft)] px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[var(--studio-accent)]">
            Studio Output
          </div>
          <h2 className="mt-4 text-4xl font-semibold text-[var(--studio-ink)] lg:text-5xl">
            Case studies, not just cards.
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-[var(--studio-muted)]">
            A curated set of mobile products shipped to real users. Each build focuses on a specific outcome: launch velocity, retention,
            or platform performance.
          </p>
        </div>

        <div className={`flex flex-wrap gap-2 pb-10 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {platformFilters.map((pf) => (
            <button
              key={pf}
              onClick={() => setActivePlatform(pf)}
              className={`rounded-full border px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 ${
                activePlatform === pf
                  ? 'border-[var(--studio-accent)] bg-[var(--studio-accent)]/10 text-[var(--studio-accent)]'
                  : 'border-[var(--studio-border)] text-[var(--studio-muted)] hover:border-[var(--studio-accent)]/50 hover:text-[var(--studio-accent)]'
              }`}
            >
              {pf}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-px bg-[var(--studio-border)] lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-12">
            {filtered.map((project, i) => {
              const isLeft = i % 2 === 0;
              return (
                <article
                  key={project.id}
                  className={`relative flex flex-col gap-6 pl-10 transition-all duration-500 lg:pl-0 lg:flex-row ${isLeft ? '' : 'lg:flex-row-reverse'} ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  <div className="absolute left-4 top-8 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--studio-border)] bg-[var(--studio-panel-soft)] text-[10px] font-mono text-[var(--studio-accent)] lg:left-1/2 lg:-translate-x-1/2">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  <div className="lg:w-1/2">
                    <div className="rounded-[28px] border border-[var(--studio-border)] bg-[#0c1018]/70 p-6">
                      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.2em] text-[var(--studio-muted)]">
                        <span>{project.category}</span>
                        <div className="flex items-center gap-2">
                          {project.platforms.map((p) => (
                            <span key={p} className="rounded-full border border-[var(--studio-border)] px-2 py-0.5 text-[10px] text-[var(--studio-muted)]">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-center overflow-hidden rounded-2xl border border-[var(--studio-border)] bg-[#0b0f18]/80">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-72 w-auto max-w-[240px] object-contain p-4"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-1/2">
                    <div className="flex h-full flex-col justify-between gap-4 rounded-[28px] border border-[var(--studio-border)] bg-[var(--studio-card-soft)] p-6">
                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-[var(--studio-ink)]">{project.title}</h3>
                        <p className="text-sm text-[var(--studio-muted)]">{project.description}</p>

                        {project.metrics && project.metrics.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {project.metrics.map((m) => (
                              <span key={m} className="rounded-full border border-[var(--studio-border)] bg-[var(--studio-panel-subtle)] px-3 py-1 text-[10px] font-mono text-[var(--studio-accent)]">
                                {m}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="rounded-full border border-[var(--studio-border)] px-3 py-1 text-xs text-[var(--studio-muted)]">
                            {t}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--studio-accent)]"
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
                        {expandedProject === project.id ? 'Hide details' : 'Show build details'}
                      </button>

                      <div className={`overflow-hidden transition-all duration-500 ${expandedProject === project.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="grid grid-cols-2 gap-2 pt-3">
                          {project.highlights.map((h) => (
                            <div key={h} className="flex items-center gap-2 text-xs text-[var(--studio-muted)]">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--studio-accent)" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              {h}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 border-t border-[var(--studio-border)] pt-4">
                        {project.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-full border border-[var(--studio-border)] px-4 py-2 text-xs font-mono uppercase tracking-[0.2em] text-[var(--studio-muted)] transition-colors duration-300 hover:border-[var(--studio-accent)] hover:text-[var(--studio-accent)]"
                          >
                            <PlatformIcon type={link.icon} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

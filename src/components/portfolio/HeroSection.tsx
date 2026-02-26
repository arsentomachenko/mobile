import React from 'react';

const studioHighlights = [
  {
    title: 'FitMeOut',
    subtitle: 'Social networking for fashion discovery',
    tag: 'iOS',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource116/v4/88/3c/e7/883ce7a3-8365-cb1b-caf3-c9986005ce72/1c313ad1-372f-4cf0-aa87-2890c57d8085_2.png/392x696bb.png',
    stack: ['iOS', 'Social', 'App Store'],
  },
  {
    title: 'MyMood AI',
    subtitle: 'Avatar + photo editor with AI tools',
    tag: 'AI',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/28/95/fa/2895faa7-b80f-6672-cf0c-3e22a37b3621/1c504599-ee24-493a-8506-cca4024e5bc6_1.png/392x696bb.png',
    stack: ['iOS', 'AI', 'Photo'],
  },
  {
    title: 'Medznat',
    subtitle: 'Medical knowledge platform',
    tag: 'Health',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/46/36/8f/46368f50-1169-67b5-bc9f-def6dd7a651c/pr_source.png/392x696bb.png',
    stack: ['Medical', 'iOS', 'Android'],
  },
];

const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const bookingUrl = import.meta.env.VITE_CAL_BOOKING_URL;

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[var(--studio-bg)] text-[var(--studio-ink)]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-[0.12]" />
        <div className="absolute -top-40 right-0 h-[520px] w-[520px] bg-[radial-gradient(circle_at_top,_rgba(34,227,165,0.22),_transparent_60%)]" />
        <div className="absolute -bottom-48 left-[-120px] h-[620px] w-[620px] bg-[radial-gradient(circle_at_bottom,_rgba(243,182,100,0.18),_transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--studio-border)] bg-[var(--studio-panel-soft)] px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-[var(--studio-accent)]">
              Product Studio
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Mobile products that feel crafted, not assembled.
              </h1>
              <p className="max-w-xl text-lg text-[var(--studio-muted)]">
                I partner with teams to design, ship, and iterate production-grade mobile experiences. Strategy, build, and release
                engineered as one studio workflow.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Product Strategy', 'Mobile Engineering', 'Design Systems', 'Release Automation', 'Growth Experiments'].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-[var(--studio-border)] bg-[var(--studio-card-soft)] px-3 py-1 text-xs font-mono text-[var(--studio-muted)]"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => scrollTo('#projects')}
                className="group relative overflow-hidden rounded-full bg-[var(--studio-accent)] px-8 py-4 text-sm font-semibold text-[#0b0d12] shadow-[0_15px_40px_var(--studio-glow)] transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Case Studies
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-[var(--studio-warm)] opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
              </button>

              <button
                onClick={() => {
                  if (bookingUrl) {
                    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
                    return;
                  }
                  scrollTo('#contact');
                }}
                className="rounded-full border border-[var(--studio-border)] px-8 py-4 text-sm font-semibold text-[var(--studio-ink)] transition-all duration-300 hover:border-[var(--studio-accent)] hover:text-[var(--studio-accent)]"
              >
                Start a Project
              </button>
            </div>

            <div className="grid gap-4 border-t border-[var(--studio-border)] pt-6 sm:grid-cols-3">
              {[
                { value: '20+', label: 'Apps shipped' },
                { value: '11+', label: 'Years building' },
                { value: '6+', label: 'Industries served' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold text-[var(--studio-ink)]">{stat.value}</div>
                  <div className="text-xs font-mono uppercase tracking-[0.18em] text-[var(--studio-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-[radial-gradient(circle,_rgba(34,227,165,0.2),_transparent_60%)] blur-3xl" />
            <div className="relative rounded-[32px] border border-[var(--studio-border)] bg-[var(--studio-card-strong)] p-6 backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--studio-muted)]">Studio board</span>
                <span className="text-xs font-mono text-[var(--studio-accent)]">Live builds</span>
              </div>

              <div className="space-y-4">
                {studioHighlights.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-[var(--studio-border)] bg-[#0c1018]/70 p-3">
                    <div className="h-20 w-16 overflow-hidden rounded-xl border border-[var(--studio-border)] bg-black/30">
                      <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-[var(--studio-ink)]">{item.title}</h3>
                        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--studio-warm)]">{item.tag}</span>
                      </div>
                      <p className="text-xs text-[var(--studio-muted)]">{item.subtitle}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {item.stack.map((chip) => (
                          <span key={chip} className="rounded-full border border-[var(--studio-border)] px-2 py-0.5 text-[10px] font-mono text-[var(--studio-muted)]">
                            {chip}
                          </span>
                        ))}
                      </div>
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

export default HeroSection;

import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#050505]">
      {/* Animated top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF87]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FF87" />
                    <stop offset="100%" stopColor="#00D9A3" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="32" height="32" rx="8" fill="none" stroke="url(#footerLogoGrad)" strokeWidth="2" />
                <path d="M10 26V10h4l4 8 4-8h4v16h-4V18l-4 8-4-8v8z" fill="url(#footerLogoGrad)" />
              </svg>
              <span className="text-lg font-bold bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">
                MobileDev
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Building thoughtful, performant mobile experiences for iOS, Android, and beyond.
              Engineering solutions, not just code.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((s) => (
                <button
                  key={s}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#00FF87] hover:border-[#00FF87]/30 transition-all duration-300"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {s === 'GitHub' && <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />}
                    {s === 'LinkedIn' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>}
                    {s === 'Twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
                    {s === 'Dribbble' && <><circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></>}
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-3">
              {[
                { label: 'Home', href: '#hero', type: 'scroll' },
                { label: 'Skills', href: '#skills', type: 'scroll' },
                { label: 'Projects', href: '#projects', type: 'scroll' },
                { label: 'Approach', href: '#trifecta', type: 'scroll' },
                { label: 'About', href: '#about', type: 'scroll' },
                { label: 'Blog', href: '/blog', type: 'link' },
                { label: 'Contact', href: '#contact', type: 'scroll' },
              ].map((link) =>
                link.type === 'link' ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block text-gray-500 text-sm hover:text-[#00FF87] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="block text-gray-500 text-sm hover:text-[#00FF87] transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <div className="space-y-3">
              {[
                'Native iOS Development',
                'Native Android Development',
                'Flutter Development',
                'React Native Development',
                'Ionic Development',
                'App Architecture',
              ].map((service) => (
                <span key={service} className="block text-gray-500 text-sm">{service}</span>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Flutter', 'Dart', 'React Native', 'TypeScript',
                'Swift', 'SwiftUI', 'Kotlin', 'Compose',
                'Ionic', 'Capacitor', 'Firebase', 'GraphQL',
              ].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-500 text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} MobileDev. Crafted with passion and precision.
          </p>
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <span>Built with</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#00FF87" className="animate-pulse">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span>and lots of</span>
            <span className="text-[#00FF87] font-mono">{'<code/>'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

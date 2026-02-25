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

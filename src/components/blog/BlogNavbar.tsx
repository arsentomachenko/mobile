import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BlogNavbar: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#00FF87] to-[#00D9A3] transition-all duration-150 shadow-[0_0_10px_rgba(0,255,135,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className={`fixed top-1 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0a]/90 backdrop-blur-xl shadow-lg shadow-[#00FF87]/5 border-b border-[#00FF87]/10'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <svg width="36" height="36" viewBox="0 0 36 36" className="transition-transform duration-300 group-hover:rotate-12">
                <defs>
                  <linearGradient id="blogLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FF87" />
                    <stop offset="100%" stopColor="#00D9A3" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="32" height="32" rx="8" fill="none" stroke="url(#blogLogoGrad)" strokeWidth="2" />
                <path d="M10 26V10h4l4 8 4-8h4v16h-4V18l-4 8-4-8v8z" fill="url(#blogLogoGrad)" />
              </svg>
              <span className="text-lg font-bold bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">
                MobileDev
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className="px-4 py-2 text-sm text-gray-300 hover:text-[#00FF87] transition-all duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#00FF87] transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
              <Link to="/blog" className="px-4 py-2 text-sm text-[#00FF87] transition-all duration-300 relative group">
                Blog
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-0.5 bg-[#00FF87] rounded-full" />
              </Link>
              {isBlogPost && (
                <Link to="/blog" className="px-4 py-2 text-sm text-gray-300 hover:text-[#00FF87] transition-all duration-300 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  All Articles
                </Link>
              )}
              <Link to="/" className="ml-4 px-5 py-2 bg-gradient-to-r from-[#00FF87] to-[#00D9A3] text-[#0a0a0a] font-semibold text-sm rounded-full hover:shadow-[0_0_20px_rgba(0,255,135,0.4)] transition-all duration-300 hover:scale-105">
                Hire Me
              </Link>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-gray-300 hover:text-[#00FF87] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                ) : (
                  <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-[#00FF87]/10 px-4 py-4 space-y-2">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 text-gray-300 hover:text-[#00FF87] hover:bg-[#00FF87]/5 rounded-lg transition-all duration-300">Home</Link>
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 text-[#00FF87] hover:bg-[#00FF87]/5 rounded-lg transition-all duration-300">Blog</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BlogNavbar;

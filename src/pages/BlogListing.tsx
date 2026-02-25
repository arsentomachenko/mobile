import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts, getAllCategories, type BlogPost } from '@/data/blogPosts';
import BlogNavbar from '@/components/blog/BlogNavbar';
import AnimatedBackground from '@/components/portfolio/AnimatedBackground';

const POSTS_PER_PAGE = 4;

const BlogListing: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setAnimateIn(true), 100);
  }, []);

  const categories = getAllCategories();

  const filtered = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory !== 'All') {
      posts = posts.filter(p => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return posts;
  }, [search, activeCategory]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory]);

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <AnimatedBackground />
      <BlogNavbar />

      <main className="relative z-10 pt-24">
        {/* Hero */}
        <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Blog & Insights
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              Mobile Dev <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Journal</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Deep dives into architecture, performance, and the craft of building exceptional mobile experiences.
            </p>
          </div>

          {/* Featured Post */}
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="group block rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#00FF87]/30 transition-all duration-500 mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img src={featuredPost.coverImage} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#00FF87] text-[#0a0a0a] text-xs font-bold">
                  Featured
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#00FF87]/10 text-[#00FF87] text-xs font-medium">{featuredPost.category}</span>
                  <span className="text-gray-500 text-xs">{featuredPost.date}</span>
                  <span className="text-gray-500 text-xs flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-[#00FF87] transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">{featuredPost.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs border border-white/5">{tag}</span>
                  ))}
                </div>
                <span className="text-[#00FF87] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  Read Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-[#00FF87]/50 focus:outline-none focus:ring-1 focus:ring-[#00FF87]/30 transition-all duration-300"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#00FF87] text-[#0a0a0a] shadow-[0_0_15px_rgba(0,255,135,0.3)]'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
              {search && <span> for "<span className="text-[#00FF87]">{search}</span>"</span>}
            </p>
          </div>

          {/* Posts Grid */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {paginated.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="mx-auto mb-4 text-gray-600" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF87] hover:border-[#00FF87]/30 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-[#00FF87] text-[#0a0a0a]'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF87] hover:border-[#00FF87]/30 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-[#050505] py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} MobileDev. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

const PostCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#00FF87]/30 hover:shadow-[0_0_40px_rgba(0,255,135,0.06)] transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#00FF87]/10 border border-[#00FF87]/20 text-[#00FF87] text-xs font-medium backdrop-blur-sm">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-gray-500 text-xs">{post.date}</span>
          <span className="text-gray-600">·</span>
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {post.readTime}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF87] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-gray-500 text-xs border border-white/5">{tag}</span>
          ))}
        </div>
        <span className="text-[#00FF87] text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
          Read Article
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </span>
      </div>
    </Link>
  );
};

export default BlogListing;

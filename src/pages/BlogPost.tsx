import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts, type BlogPost as BlogPostType, type ContentBlock } from '@/data/blogPosts';

import BlogNavbar from '@/components/blog/BlogNavbar';
import AnimatedBackground from '@/components/portfolio/AnimatedBackground';

/* ─── Code Block with syntax highlighting ─── */
const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (text: string, lang?: string): string => {
    let result = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    if (!lang || lang === 'text') return result;

    // Comments
    result = result.replace(/(\/\/.*$)/gm, '<span class="text-gray-500 italic">$1</span>');
    result = result.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 italic">$1</span>');
    result = result.replace(/(#.*$)/gm, '<span class="text-gray-500 italic">$1</span>');

    // Strings
    result = result.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="text-[#a5d6a7]">$1</span>');
    result = result.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="text-[#a5d6a7]">$1</span>');
    result = result.replace(/(`(?:[^`\\]|\\.)*`)/g, '<span class="text-[#a5d6a7]">$1</span>');

    // Keywords
    const keywords = lang === 'dart' || lang === 'kotlin' || lang === 'swift'
      ? 'abstract|as|async|await|break|case|catch|class|const|continue|data|default|do|dynamic|else|enum|export|extends|extension|external|factory|false|final|finally|for|fun|get|if|implements|import|in|interface|is|late|lazy|let|new|null|object|operator|override|package|private|protected|public|required|return|sealed|set|static|struct|super|suspend|switch|this|throw|true|try|typedef|val|var|void|when|where|while|with|yield'
      : lang === 'typescript' || lang === 'javascript'
      ? 'abstract|any|as|async|await|boolean|break|case|catch|class|const|constructor|continue|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|of|package|private|protected|public|readonly|require|return|set|static|string|super|switch|this|throw|true|try|type|typeof|undefined|var|void|while|with|yield'
      : lang === 'yaml'
      ? 'true|false|null|on|off|yes|no'
      : lang === 'ruby'
      ? 'begin|break|case|class|def|defined|do|else|elsif|end|ensure|false|for|if|in|module|next|nil|not|or|redo|rescue|retry|return|self|super|then|true|undef|unless|until|when|while|yield'
      : lang === 'css'
      ? 'root|var|calc|inherit|initial|unset|none|auto|block|flex|grid|inline'
      : 'abstract|break|case|catch|class|const|continue|default|do|else|enum|export|extends|false|final|finally|for|function|if|implements|import|in|interface|let|new|null|package|private|protected|public|return|static|super|switch|this|throw|true|try|typeof|var|void|while|with';

    result = result.replace(
      new RegExp(`\\b(${keywords})\\b`, 'g'),
      '<span class="text-[#81d4fa]">$1</span>'
    );

    // Numbers
    result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-[#ffcc80]">$1</span>');

    // Annotations / Decorators
    result = result.replace(/(@\w+)/g, '<span class="text-[#ce93d8]">$1</span>');

    // Types (capitalized words)
    result = result.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="text-[#80cbc4]">$1</span>');

    return result;
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {language && <span className="text-xs text-gray-500 font-mono ml-2">{language}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-gray-500 hover:text-[#00FF87] hover:bg-white/5 transition-all duration-300"
        >
          {copied ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code
          className="font-mono text-gray-300"
          dangerouslySetInnerHTML={{ __html: highlightSyntax(code, language) }}
        />
      </pre>
    </div>
  );
};

/* ─── Content Renderer ─── */
const ContentRenderer: React.FC<{ block: ContentBlock; index: number }> = ({ block, index }) => {
  switch (block.type) {
    case 'heading':
      const headingId = block.content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h2 id={headingId} className="text-2xl lg:text-3xl font-bold text-white mt-12 mb-4 scroll-mt-24 group">
          <a href={`#${headingId}`} className="hover:text-[#00FF87] transition-colors duration-300">
            {block.content}
            <span className="opacity-0 group-hover:opacity-100 text-[#00FF87] ml-2 transition-opacity">#</span>
          </a>
        </h2>
      );
    case 'subheading':
      const subId = block.content.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h3 id={subId} className="text-xl font-semibold text-white mt-8 mb-3 scroll-mt-24">
          {block.content}
        </h3>
      );
    case 'paragraph':
      return (
        <p
          className="text-gray-300 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{
            __html: block.content
              .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
              .replace(/\*(.*?)\*/g, '<em>$1</em>')
              .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-[#00FF87] text-sm font-mono">$1</code>')
          }}
        />
      );
    case 'code':
      return <CodeBlock code={block.content} language={block.language} />;
    case 'list':
      return (
        <ul className="space-y-2 mb-6 ml-1">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300">
              <svg className="w-4 h-4 mt-1.5 text-[#00FF87] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-[#00FF87] text-sm font-mono">$1</code>')
                }}
              />
            </li>
          ))}
        </ul>
      );
    case 'blockquote':
      return (
        <blockquote className="relative my-8 pl-6 py-4 border-l-4 border-[#00FF87]/40 bg-[#00FF87]/[0.03] rounded-r-xl">
          <svg className="absolute -top-3 -left-2 w-8 h-8 text-[#00FF87] opacity-20" viewBox="0 0 64 64" fill="currentColor">
            <path d="M14 34c-4 0-8-3-8-8s4-10 10-14l2 3c-4 3-6 6-6 9 0 1 1 2 2 2 3 0 6 2 6 6s-3 6-6 6z" />
          </svg>
          <p className="text-gray-300 italic leading-relaxed">{block.content}</p>
        </blockquote>
      );
    case 'image':
      return (
        <figure className="my-8 rounded-xl overflow-hidden border border-white/10">
          <img src={block.content} alt={block.alt || ''} className="w-full" />
          {block.alt && <figcaption className="text-center text-gray-500 text-sm py-3 bg-white/[0.02]">{block.alt}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
};

/* ─── Table of Contents Sidebar ─── */
const TableOfContents: React.FC<{ items: { id: string; title: string; level: number }[]; activeId: string }> = ({ items, activeId }) => (
  <nav className="sticky top-24">
    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00FF87" strokeWidth="2">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
      Table of Contents
    </h4>
    <div className="space-y-1 border-l border-white/10">
      {items.map(item => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block pl-4 py-1.5 text-sm transition-all duration-300 border-l-2 -ml-px ${
            activeId === item.id
              ? 'border-[#00FF87] text-[#00FF87] bg-[#00FF87]/5'
              : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600'
          } ${item.level === 3 ? 'pl-8' : ''}`}
        >
          {item.title}
        </a>
      ))}
    </div>
  </nav>
);

/* ─── Main Blog Post Page ─── */
const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug || '');
  const related = getRelatedPosts(slug || '', 3);

  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setAnimateIn(true), 100);
  }, [slug]);

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const articleTop = rect.top + window.scrollY;
      const articleHeight = rect.height;
      const scrolled = window.scrollY - articleTop;
      const pct = Math.min(100, Math.max(0, (scrolled / (articleHeight - window.innerHeight)) * 100));
      setProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active heading tracking
  useEffect(() => {
    if (!post) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    post.tableOfContents.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [post, animateIn]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="px-6 py-3 bg-[#00FF87] text-[#0a0a0a] font-semibold rounded-full">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <AnimatedBackground />
      <BlogNavbar progress={progress} />

      <main className="relative z-10 pt-20">
        {/* Hero */}
        <div className={`relative h-[40vh] min-h-[320px] overflow-hidden transition-all duration-1000 ${animateIn ? 'opacity-100' : 'opacity-0'}`}>
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <Link to="/blog" className="flex items-center gap-1 text-gray-400 hover:text-[#00FF87] text-sm transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                Blog
              </Link>
              <span className="text-gray-600">/</span>
              <span className="px-3 py-1 rounded-full bg-[#00FF87]/10 text-[#00FF87] text-xs font-medium">{post.category}</span>
            </div>
            <h1 className={`text-3xl lg:text-5xl font-bold text-white leading-tight transition-all duration-1000 delay-200 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {post.title}
            </h1>
          </div>
        </div>

        {/* Meta bar */}
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-1000 delay-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-[#00FF87]/20 object-cover" />
              <div>
                <div className="text-white text-sm font-medium">{post.author.name}</div>
                <div className="text-gray-500 text-xs">{post.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                {post.readTime}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 ml-auto">
              {post.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-white/5 text-gray-500 text-xs border border-white/5">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Content + TOC */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex gap-12">
            {/* TOC Sidebar */}
            <aside className="hidden xl:block w-64 flex-shrink-0">
              <TableOfContents items={post.tableOfContents} activeId={activeHeading} />
            </aside>

            {/* Article Content */}
            <article ref={articleRef} className="flex-1 max-w-3xl">
              <div className={`transition-all duration-1000 delay-500 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {post.content.map((block, i) => (
                  <ContentRenderer key={i} block={block} index={i} />
                ))}
              </div>

              {/* Share / Tags bottom */}
              <div className="mt-16 pt-8 border-t border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${tag}`}
                        className="px-3 py-1 rounded-full bg-white/5 text-gray-400 text-xs border border-white/10 hover:border-[#00FF87]/30 hover:text-[#00FF87] transition-all duration-300"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Share:</span>
                    {['Twitter', 'LinkedIn'].map(platform => (
                      <button
                        key={platform}
                        onClick={() => {
                          const url = encodeURIComponent(window.location.href);
                          const text = encodeURIComponent(post.title);
                          const shareUrl = platform === 'Twitter'
                            ? `https://twitter.com/intent/tweet?text=${text}&url=${url}`
                            : `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                          window.open(shareUrl, '_blank', 'width=600,height=400');
                        }}
                        className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#00FF87] hover:border-[#00FF87]/30 transition-all duration-300"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          {platform === 'Twitter' && <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />}
                          {platform === 'LinkedIn' && <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>}
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author card */}
              <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-xl border border-[#00FF87]/20 object-cover flex-shrink-0" />
                <div>
                  <h4 className="text-white font-semibold">{post.author.name}</h4>
                  <p className="text-[#00FF87] text-sm mb-2">{post.author.role}</p>
                  <p className="text-gray-400 text-sm">Building thoughtful, performant mobile experiences for iOS, Android, and beyond. Engineering solutions, not just code.</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="bg-white/[0.01] border-t border-white/5 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-2xl font-bold text-white mb-8">
                Related <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Articles</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(rp => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group block rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#00FF87]/30 transition-all duration-500"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[#00FF87]/10 text-[#00FF87] text-xs font-medium backdrop-blur-sm">{rp.category}</div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2 text-gray-500 text-xs">
                        <span>{rp.date}</span><span>·</span><span>{rp.readTime}</span>
                      </div>
                      <h4 className="text-white font-semibold mb-2 group-hover:text-[#00FF87] transition-colors line-clamp-2">{rp.title}</h4>
                      <p className="text-gray-400 text-sm line-clamp-2">{rp.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

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

export default BlogPostPage;

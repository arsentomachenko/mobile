import React from 'react';
import AnimatedBackground from './portfolio/AnimatedBackground';
import Navbar from './portfolio/Navbar';
import HeroSection from './portfolio/HeroSection';
import SkillsSection from './portfolio/SkillsSection';
import ProjectsSection from './portfolio/ProjectsSection';
import StatsSection from './portfolio/StatsSection';
import TrifectaSection from './portfolio/TrifectaSection';
import ProcessSection from './portfolio/ProcessSection';
import PerformanceSection from './portfolio/PerformanceSection';
import TestimonialsSection from './portfolio/TestimonialsSection';
import BlogSection from './portfolio/BlogSection';
import ToolkitSection from './portfolio/ToolkitSection';
import AboutSection from './portfolio/AboutSection';
import CTASection from './portfolio/CTASection';
import ContactSection from './portfolio/ContactSection';
import Footer from './portfolio/Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      
      <main className="relative z-10">
        <HeroSection />

        {/* Divider SVG */}
        <div className="relative h-24">
          <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1440 96" preserveAspectRatio="none">
            <path d="M0 96L60 80C120 64 240 32 360 21.3C480 11 600 21 720 32C840 43 960 53 1080 48C1200 43 1320 21 1380 10.7L1440 0V96H0Z" fill="#00FF87" fillOpacity="0.02" />
          </svg>
        </div>

        <SkillsSection />
        <StatsSection />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#00FF87]/20 to-transparent" />
        </div>

        <ProjectsSection />

        {/* Animated SVG divider */}
        <div className="relative py-8">
          <svg className="w-full h-16 opacity-10" viewBox="0 0 1440 64" preserveAspectRatio="none">
            <path d="M0 32 Q 360 0 720 32 Q 1080 64 1440 32" fill="none" stroke="#00FF87" strokeWidth="1">
              <animate attributeName="d" dur="6s" repeatCount="indefinite"
                values="M0 32 Q 360 0 720 32 Q 1080 64 1440 32;M0 32 Q 360 64 720 32 Q 1080 0 1440 32;M0 32 Q 360 0 720 32 Q 1080 64 1440 32" />
            </path>
          </svg>
        </div>

        <TrifectaSection />
        <ProcessSection />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#00FF87]/20 to-transparent" />
        </div>

        <PerformanceSection />
        <TestimonialsSection />
        <BlogSection />
        <ToolkitSection />

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-[#00FF87]/20 to-transparent" />
        </div>

        <AboutSection />
        <CTASection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;

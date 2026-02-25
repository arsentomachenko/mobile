import React, { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface MetricData {
  label: string;
  before: number;
  after: number;
  unit: string;
  improvement: string;
}

const metrics: MetricData[] = [
  { label: 'App Startup Time', before: 3200, after: 850, unit: 'ms', improvement: '73%' },
  { label: 'Frame Rate (avg)', before: 48, after: 60, unit: 'fps', improvement: '25%' },
  { label: 'Memory Usage', before: 280, after: 145, unit: 'MB', improvement: '48%' },
  { label: 'Bundle Size', before: 45, after: 18, unit: 'MB', improvement: '60%' },
  { label: 'API Response', before: 1200, after: 320, unit: 'ms', improvement: '73%' },
  { label: 'Battery Impact', before: 8.5, after: 3.2, unit: '%/hr', improvement: '62%' },
];

const PerformanceSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [showAfter, setShowAfter] = useState(true);

  return (
    <section className="relative py-24 lg:py-32">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00FF87]/20 bg-[#00FF87]/5 text-[#00FF87] text-sm mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Performance Obsessed
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Optimization <span className="bg-gradient-to-r from-[#00FF87] to-[#00D9A3] bg-clip-text text-transparent">Results</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Real performance improvements from production apps. Every millisecond matters.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setShowAfter(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!showAfter ? 'bg-red-500/20 text-red-400' : 'text-gray-500'}`}
            >
              Before
            </button>
            <button
              onClick={() => setShowAfter(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${showAfter ? 'bg-[#00FF87]/20 text-[#00FF87]' : 'text-gray-500'}`}
            >
              After Optimization
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, i) => {
            const value = showAfter ? metric.after : metric.before;
            const maxVal = Math.max(metric.before, metric.after);
            const percentage = (value / maxVal) * 100;
            const isGoodLower = ['App Startup Time', 'Memory Usage', 'Bundle Size', 'API Response', 'Battery Impact'].includes(metric.label);
            const isImproved = showAfter && isGoodLower ? value < metric.before : showAfter && value > metric.before;

            return (
              <div
                key={metric.label}
                className={`p-6 rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-700 hover:border-[#00FF87]/20 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium text-sm">{metric.label}</h4>
                  {showAfter && (
                    <span className="px-2 py-0.5 rounded-full bg-[#00FF87]/10 text-[#00FF87] text-xs font-medium flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d={isGoodLower ? "M18 15l-6-6-6 6" : "M6 9l6 6 6-6"} />
                      </svg>
                      {metric.improvement}
                    </span>
                  )}
                </div>

                <div className="text-3xl font-bold mb-3 transition-all duration-500">
                  <span className={showAfter ? 'text-[#00FF87]' : 'text-red-400'}>
                    {value}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">{metric.unit}</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${showAfter ? 'bg-[#00FF87]' : 'bg-red-400'}`}
                    style={{
                      width: isVisible ? `${isGoodLower ? 100 - percentage + (percentage * 0.3) : percentage}%` : '0%',
                      transitionDelay: `${i * 100 + 300}ms`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-2 text-xs text-gray-600">
                  <span>Before: {metric.before}{metric.unit}</span>
                  <span>After: {metric.after}{metric.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;

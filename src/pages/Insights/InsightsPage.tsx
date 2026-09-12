import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { INSIGHT_CATEGORIES } from '@nestandkey/constants';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInsights() {
      setIsLoading(true);
      try {
        const res = await api.getInsights(activeCategory || undefined);
        setInsights(res.insights || []);
      } catch (err) {
        console.error('Failed to load insights:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadInsights();
  }, [activeCategory]);

  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 pb-6 border-b border-[#E5E0D8]">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
            Intelligence & Research
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-[#18181A] font-light">
            Dubai Real Estate Insights
          </h1>
          <p className="text-xs text-[#71717A] mt-2 max-w-xl">
            In-depth analysis, market forecasts, legal guides, and investment perspectives curated by Nestandkey's research team.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => setActiveCategory('')}
            className={`px-4 py-1.5 text-xs uppercase tracking-wider transition-all ${
              activeCategory === ''
                ? 'bg-[#18181A] text-[#C5A880] font-semibold'
                : 'bg-[#F7F5F0] text-[#71717A] border border-[#E5E0D8] hover:text-[#18181A]'
            }`}
          >
            All Research
          </button>
          {INSIGHT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#18181A] text-[#C5A880] font-semibold'
                  : 'bg-[#F7F5F0] text-[#71717A] border border-[#E5E0D8] hover:text-[#18181A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] bg-[#F7F5F0] animate-pulse border border-[#E5E0D8]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((article) => (
              <Link
                key={article.slug}
                to={`/insights/${article.slug}`}
                className="group flex flex-col bg-[#F7F5F0] border border-[#E5E0D8] hover:border-[#C5A880] transition-all overflow-hidden"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#18181A]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover luxury-image-zoom"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-2 font-mono">
                      {article.category}
                    </span>
                    <h3 className="font-serif text-xl text-[#18181A] group-hover:text-[#C5A880] transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#71717A] mt-2.5 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="pt-4 mt-6 border-t border-[#E5E0D8] text-[10px] uppercase tracking-wider text-[#71717A] flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{article.readingTimeMinutes} min read</span>
                    </div>
                    <span className="text-[#18181A] group-hover:text-[#C5A880] font-medium flex items-center gap-1">
                      Read Analysis <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

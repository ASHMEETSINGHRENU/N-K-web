import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Clock, ArrowLeft, Calendar, Share2, User } from 'lucide-react';

export const InsightDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [insight, setInsight] = useState<any | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInsight() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const res = await api.getInsightBySlug(slug);
        setInsight(res.insight);
        setRelated(res.related || []);
      } catch (err) {
        console.error('Failed to load insight:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadInsight();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return <div className="pt-36 pb-24 text-center text-xs text-[#71717A]">Loading analysis...</div>;
  }

  if (!insight) {
    return (
      <div className="pt-36 pb-24 text-center max-w-md mx-auto px-6">
        <h2 className="font-serif text-2xl mb-4">Article Not Found</h2>
        <Link to="/insights" className="text-xs uppercase text-[#C5A880] tracking-wider">
          Return to Intelligence
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <article className="max-w-4xl mx-auto px-6 lg:px-12">
        <Link
          to="/insights"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#71717A] hover:text-[#18181A] mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>All Insights</span>
        </Link>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-[#71717A] mb-4 font-mono">
          <span className="text-[#C5A880] uppercase tracking-widest font-semibold">{insight.category}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{insight.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18181A] tracking-tight mb-6 leading-tight">
          {insight.title}
        </h1>

        {/* Excerpt */}
        <p className="text-sm sm:text-base text-[#71717A] font-light italic leading-relaxed mb-8 pb-8 border-b border-[#E5E0D8]">
          {insight.excerpt}
        </p>

        {/* Cover Image */}
        <div className="aspect-[16/9] bg-[#18181A] overflow-hidden mb-12 border border-[#E5E0D8]">
          <img src={insight.coverImage} alt={insight.title} className="w-full h-full object-cover" />
        </div>

        {/* Body Content */}
        <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#3E3E42] leading-relaxed font-light space-y-6">
          <div
            dangerouslySetInnerHTML={{
              __html: insight.content
                .split('\n')
                .map((line: string) => {
                  if (line.startsWith('### ')) return `<h3 class="font-serif text-2xl text-[#18181A] mt-6 mb-2 font-normal">${line.slice(4)}</h3>`;
                  if (line.startsWith('* ')) return `<li class="ml-4 list-disc text-xs sm:text-sm mb-1">${line.slice(2)}</li>`;
                  if (line.trim().length > 0) return `<p class="mb-4">${line}</p>`;
                  return '';
                })
                .join('')
            }}
          />
        </div>

        {/* Author Footer */}
        <div className="mt-16 pt-8 border-t border-[#E5E0D8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#18181A] text-[#C5A880] flex items-center justify-center font-serif text-sm">
              AS
            </div>
            <div>
              <span className="font-serif text-base text-[#18181A] block font-medium">
                {insight.author?.name || 'Alexander Sterling'}
              </span>
              <span className="text-[11px] text-[#71717A]">
                {insight.author?.role || 'Chief Investment Strategist, Nestandkey'}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

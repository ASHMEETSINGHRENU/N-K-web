import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { OFFICIAL_DUBAI_INSIGHTS, OfficialInsightArticle } from '../../data/dubaiGovernmentInsights';
import { Clock, ArrowLeft, ShieldCheck, Share2, ArrowRight, Database } from 'lucide-react';

export const InsightDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Immediate lookup from verified official dataset
  const localArticle = slug ? OFFICIAL_DUBAI_INSIGHTS.find((a) => a.slug === slug) : null;
  const [insight, setInsight] = useState<OfficialInsightArticle | any | null>(localArticle || null);
  const [related, setRelated] = useState<any[]>(
    localArticle ? OFFICIAL_DUBAI_INSIGHTS.filter((a) => a.slug !== slug).slice(0, 3) : []
  );
  const [isLoading, setIsLoading] = useState(!localArticle);

  useEffect(() => {
    async function loadInsight() {
      if (!slug) return;
      const foundLocal = OFFICIAL_DUBAI_INSIGHTS.find((a) => a.slug === slug);
      if (foundLocal) {
        setInsight(foundLocal);
        setRelated(OFFICIAL_DUBAI_INSIGHTS.filter((a) => a.slug !== slug).slice(0, 3));
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }

      try {
        const res = await api.getInsightBySlug(slug);
        if (res?.insight) {
          setInsight(res.insight);
          if (res.related && res.related.length > 0) {
            setRelated(res.related);
          }
        }
      } catch (err) {
        // Fallback already active
      } finally {
        setIsLoading(false);
      }
    }
    loadInsight();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-36 pb-24 text-center text-xs font-mono text-[#71717A]">
        Loading verified official analysis...
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="pt-36 pb-24 text-center max-w-md mx-auto px-6">
        <h2 className="font-serif text-2xl mb-4">Report Not Found</h2>
        <Link to="/insights" className="text-xs uppercase font-mono text-[#C5A880] tracking-wider font-bold">
          Return to Market Intelligence
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen text-[#18181A]">
      <article className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Navigation & Verification Badge */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#71717A] hover:text-[#18181A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Market Intelligence</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F7F5F0] border border-[#E5E0D8] text-[10px] font-mono text-[#71717A]">
            <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
            <span>DLD Verified Dataset</span>
          </div>
        </div>

        {/* Category & Time */}
        <div className="flex items-center gap-3 text-xs text-[#71717A] mb-4 font-mono">
          <span className="text-[#C5A880] uppercase tracking-widest font-semibold">{insight.category}</span>
          <span>•</span>
          <span>{insight.publishedDate || 'September 2026'}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{insight.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18181A] tracking-tight mb-6 leading-tight">
          {insight.title}
        </h1>

        {/* Excerpt */}
        <p className="text-sm sm:text-base text-[#71717A] font-light italic leading-relaxed mb-8 pb-8 border-b border-[#E5E0D8]">
          {insight.excerpt}
        </p>

        {/* Key Stats Bar if available */}
        {insight.keyStats && insight.keyStats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 bg-[#18181A] p-4 text-white rounded-xs">
            {insight.keyStats.map((stat: any) => (
              <div key={stat.label} className="border-r last:border-r-0 border-[#2A2A2E] pr-2">
                <span className="text-[9px] uppercase font-mono text-[#C5A880] block mb-1">
                  {stat.label}
                </span>
                <span className="font-serif text-base sm:text-lg text-white font-medium block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

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
                  if (line.startsWith('### ')) {
                    return `<h3 class="font-serif text-2xl text-[#18181A] mt-8 mb-3 font-normal border-b border-[#E5E0D8] pb-2">${line.slice(4)}</h3>`;
                  }
                  if (line.startsWith('* ')) {
                    return `<li class="ml-4 list-disc text-xs sm:text-sm mb-1.5 text-[#3E3E42]">${line.slice(2)}</li>`;
                  }
                  if (line.trim().length > 0) {
                    return `<p class="mb-4 leading-relaxed font-light">${line}</p>`;
                  }
                  return '';
                })
                .join('')
            }}
          />
        </div>

        {/* Author Footer */}
        <div className="mt-16 pt-8 border-t border-[#E5E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#18181A] text-[#C5A880] flex items-center justify-center font-serif text-sm">
              {insight.author?.name ? insight.author.name.charAt(0) : 'N'}
            </div>
            <div>
              <span className="font-serif text-base text-[#18181A] block font-medium">
                {insight.author?.name || 'Alexander Sterling'}
              </span>
              <span className="text-[11px] text-[#71717A]">
                {insight.author?.role || 'Head of Quantitative Research, Nestandkey'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A]">
            <Database className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>DLD / RERA Open Data Grounding</span>
          </div>
        </div>

        {/* Related Reports Section */}
        {related && related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#E5E0D8]">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono font-semibold block mb-2">
              Explore More
            </span>
            <h3 className="font-serif text-2xl text-[#18181A] mb-8 font-light">
              Related Market Studies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/insights/${item.slug}`}
                  className="group bg-white border border-[#E5E0D8] hover:border-[#C5A880] transition-all p-4 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-[9px] uppercase font-mono text-[#C5A880] font-semibold block mb-2">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-sm text-[#18181A] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2 mb-2 font-medium">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#71717A] line-clamp-2 font-light">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#E5E0D8] flex items-center justify-between text-[10px] font-mono text-[#71717A]">
                    <span>{item.readingTimeMinutes} min read</span>
                    <span className="text-[#18181A] group-hover:text-[#C5A880] flex items-center gap-1 font-bold">
                      Read <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

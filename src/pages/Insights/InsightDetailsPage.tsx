import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { OFFICIAL_DUBAI_INSIGHTS } from '../../data/dubaiGovernmentInsights';
import { ArrowLeft, Clock, ShieldCheck, Database, ArrowRight } from 'lucide-react';

export const InsightDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const insight = OFFICIAL_DUBAI_INSIGHTS.find((i) => i.slug === slug);
  const related = OFFICIAL_DUBAI_INSIGHTS.filter((i) => i.slug !== slug).slice(0, 3);

  if (!insight) {
    return (
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 text-center font-ui">
        <h2 className="font-display text-3xl text-[#102A43] mb-4">Report Not Found</h2>
        <p className="text-xs text-[#6B7280] mb-6">
          The requested market intelligence paper could not be located in our registry.
        </p>
        <Link to="/insights" className="text-xs uppercase font-mono text-[#B08D57] tracking-wider font-bold">
          Return to Market Intelligence
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen text-[#3E4852] font-ui">
      <article className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Navigation & Verification Badge */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#6B7280] hover:text-[#102A43] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Market Intelligence</span>
          </Link>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFFDF8] border border-[#E9E1D4] text-[10px] font-mono text-[#6B7280] shadow-xs">
            <ShieldCheck className="w-3 h-3 text-[#B08D57]" />
            <span>DLD Verified Dataset</span>
          </div>
        </div>

        {/* Category & Time */}
        <div className="flex items-center gap-3 text-xs text-[#6B7280] mb-4 font-mono">
          <span className="text-[#B08D57] uppercase tracking-widest font-semibold">{insight.category}</span>
          <span>•</span>
          <span>{insight.publishedDate || 'September 2026'}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>{insight.readingTimeMinutes} min read</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-5xl font-normal text-[#102A43] tracking-tight mb-6 leading-tight">
          {insight.title}
        </h1>

        {/* Excerpt */}
        <p className="text-sm sm:text-base text-[#6B7280] font-normal italic leading-relaxed mb-8 pb-8 border-b border-[#E9E1D4]">
          {insight.excerpt}
        </p>

        {/* Key Stats Bar if available */}
        {insight.keyStats && insight.keyStats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 bg-[#102A43] p-4 text-[#F7F3EA] rounded-xs border border-[#1E3A5F] shadow-sm">
            {insight.keyStats.map((stat: any) => (
              <div key={stat.label} className="border-r last:border-r-0 border-[#1E3A5F] pr-2">
                <span className="text-[9px] uppercase font-mono text-[#D8C3A5] block mb-1">
                  {stat.label}
                </span>
                <span className="font-display text-base sm:text-lg text-white font-medium block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Cover Image */}
        <div className="aspect-[16/9] bg-[#102A43] overflow-hidden mb-12 border border-[#E9E1D4]">
          <img src={insight.coverImage} alt={insight.title} className="w-full h-full object-cover" />
        </div>

        {/* Body Content */}
        <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#3E4852] leading-relaxed font-normal space-y-6">
          <div
            dangerouslySetInnerHTML={{
              __html: insight.content
                .split('\n')
                .map((line: string) => {
                  if (line.startsWith('### ')) {
                    return `<h3 class="font-display text-2xl text-[#102A43] mt-8 mb-3 font-normal border-b border-[#E9E1D4] pb-2">${line.slice(4)}</h3>`;
                  }
                  if (line.startsWith('* ')) {
                    return `<li class="ml-4 list-disc text-xs sm:text-sm mb-1.5 text-[#3E4852]">${line.slice(2)}</li>`;
                  }
                  if (line.trim().length > 0) {
                    return `<p class="mb-4 leading-relaxed font-normal">${line}</p>`;
                  }
                  return '';
                })
                .join('')
            }}
          />
        </div>

        {/* Author Footer */}
        <div className="mt-16 pt-8 border-t border-[#E9E1D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#102A43] text-[#D8C3A5] border border-[#B08D57] flex items-center justify-center font-display text-sm">
              {insight.author?.name ? insight.author.name.charAt(0) : 'C'}
            </div>
            <div>
              <span className="font-display text-base text-[#102A43] block font-medium">
                {insight.author?.name || 'Alexander Sterling'}
              </span>
              <span className="text-[11px] text-[#6B7280]">
                {insight.author?.role || 'Head of Quantitative Research, Crestshore'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#6B7280]">
            <Database className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>DLD / RERA Open Data Grounding</span>
          </div>
        </div>

        {/* Related Reports Section */}
        {related && related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#E9E1D4]">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-mono font-semibold block mb-2">
              Explore More
            </span>
            <h3 className="font-display text-2xl text-[#102A43] mb-8 font-normal">
              Related Market Studies
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to={`/insights/${item.slug}`}
                  className="group bg-[#FFFDF8] border border-[#E9E1D4] hover:border-[#B08D57] transition-all p-4 flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-[9px] uppercase font-mono text-[#B08D57] font-semibold block mb-2">
                      {item.category}
                    </span>
                    <h4 className="font-display text-sm text-[#102A43] group-hover:text-[#B08D57] transition-colors leading-snug line-clamp-2 mb-2 font-medium">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#6B7280] line-clamp-2 font-normal">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="pt-3 mt-4 border-t border-[#E9E1D4] flex items-center justify-between text-[10px] font-mono text-[#6B7280]">
                    <span>{item.readingTimeMinutes} min read</span>
                    <span className="text-[#102A43] group-hover:text-[#B08D57] flex items-center gap-1 font-bold">
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
export default InsightDetailsPage;

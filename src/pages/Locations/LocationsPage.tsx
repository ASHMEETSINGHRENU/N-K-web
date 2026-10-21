import React from 'react';
import { Link } from 'react-router-dom';
import { DUBAI_COMMUNITIES } from '@nestandkey/constants';
import { ArrowUpRight } from 'lucide-react';

export const LocationsPage: React.FC = () => {
  return (
    <div className="pb-24 bg-[#F7F3EA] min-h-screen font-ui">
      <section className="relative min-h-[78vh] flex items-end overflow-hidden bg-[#0B2135]">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=85"
          alt="Dubai skyline"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/80 via-[#0B2135]/30 to-[#0B2135]/20" />
        <div className="relative z-10 px-6 lg:px-16 pb-14 pt-36 text-[#F7F3EA]">
          <span className="crest-kicker text-[#D8C3A5] block mb-4">Emirate Geography</span>
          <h1 className="font-display crest-title max-w-4xl">Prime Dubai locations</h1>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16">
        <div className="mb-16 pb-6 border-b border-[#E9E1D4]">
          <p className="text-xs text-[#6B7280] mt-2 max-w-xl">
            From the world-renowned archipelago of Palm Jumeirah to the lush parklands of Dubai Hills Estate, explore Dubai’s most prestigious residential quarters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUBAI_COMMUNITIES.map((c) => (
            <Link
              key={c.slug}
              to={`/communities/${c.slug}`}
              className="group bg-[#FFFDF8] border border-[#E9E1D4] hover:border-[#B08D57] transition-all overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#102A43] relative">
                <img
                  src={c.highlightImage}
                  alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#102A43]/90 backdrop-blur-sm text-[#D8C3A5] text-[10px] uppercase tracking-widest px-2.5 py-1 font-mono border border-[#B08D57]/40">
                  Avg. AED {c.avgPricePerSqFt}/sq.ft
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-display text-2xl font-normal text-[#102A43] group-hover:text-[#B08D57] transition-colors mb-2">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-3">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E9E1D4] flex items-center justify-between text-xs uppercase tracking-wider text-[#102A43]">
                  <span className="font-semibold">Explore Residences</span>
                  <ArrowUpRight className="w-4 h-4 text-[#B08D57]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LocationsPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { DUBAI_COMMUNITIES } from '@nestandkey/constants';
import { ArrowUpRight } from 'lucide-react';

export const LocationsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen font-ui">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 pb-6 border-b border-[#E9E1D4]">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-2">
            Emirate Geography
          </span>
          <h1 className="font-display text-4xl lg:text-5xl text-[#102A43] font-normal">
            Prime Dubai Locations & Enclaves
          </h1>
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

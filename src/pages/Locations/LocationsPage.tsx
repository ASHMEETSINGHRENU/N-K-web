import React from 'react';
import { Link } from 'react-router-dom';
import { DUBAI_COMMUNITIES } from '@nestandkey/constants';
import { ArrowUpRight, MapPin } from 'lucide-react';

export const LocationsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 pb-6 border-b border-[#E5E0D8]">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
            Emirate Geography
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-[#18181A] font-light">
            Prime Dubai Locations & Enclaves
          </h1>
          <p className="text-xs text-[#71717A] mt-2 max-w-xl">
            From the world-renowned archipelago of Palm Jumeirah to the lush parklands of Dubai Hills Estate, explore Dubai’s most prestigious residential quarters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUBAI_COMMUNITIES.map((c) => (
            <Link
              key={c.slug}
              to={`/communities/${c.slug}`}
              className="group bg-[#F7F5F0] border border-[#E5E0D8] hover:border-[#C5A880] transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#18181A] relative">
                <img
                  src={c.highlightImage}
                  alt={c.name}
                  className="w-full h-full object-cover luxury-image-zoom"
                />
                <div className="absolute top-4 right-4 bg-[#0B0B0C]/80 backdrop-blur-sm text-[#C5A880] text-[10px] uppercase tracking-widest px-2.5 py-1 font-mono">
                  Avg. AED {c.avgPricePerSqFt}/sq.ft
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-2xl font-normal text-[#18181A] group-hover:text-[#C5A880] transition-colors mb-2">
                    {c.name}
                  </h3>
                  <p className="text-xs text-[#71717A] leading-relaxed line-clamp-3">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E5E0D8] flex items-center justify-between text-xs uppercase tracking-wider text-[#18181A]">
                  <span className="font-semibold">Explore Residences</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

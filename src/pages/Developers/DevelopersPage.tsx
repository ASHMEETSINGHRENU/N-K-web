import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { DUBAI_DEVELOPERS } from '@nestandkey/constants';
import { Building2, ArrowUpRight, ShieldCheck } from 'lucide-react';

export const DevelopersPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 pb-6 border-b border-[#E5E0D8]">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
            Master Developers
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-[#18181A] font-light">
            Premier Dubai Real Estate Developers
          </h1>
          <p className="text-xs text-[#71717A] mt-2 max-w-xl">
            Pioneering architectural masterminds transforming the Dubai skyline with record-breaking developments and branded private residences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DUBAI_DEVELOPERS.map((dev) => (
            <div
              key={dev.slug}
              className="bg-[#F7F5F0] border border-[#E5E0D8] p-6 hover:border-[#C5A880] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-full border border-[#C5A880] flex items-center justify-center text-[#C5A880] mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#18181A] group-hover:text-[#C5A880] transition-colors">
                  {dev.name}
                </h3>
                <span className="text-[11px] text-[#71717A] block mt-1">
                  Flagship: <span className="text-[#18181A] font-medium">{dev.flagship}</span>
                </span>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E5E0D8] flex items-center justify-between">
                <Link
                  to={`/properties/off-plan?developer=${encodeURIComponent(dev.name)}`}
                  className="text-xs uppercase tracking-wider text-[#18181A] group-hover:text-[#C5A880] font-medium flex items-center gap-1"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

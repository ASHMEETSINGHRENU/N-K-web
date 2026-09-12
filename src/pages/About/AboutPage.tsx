import React from 'react';
import { ShieldCheck, Award, Users, Compass, MapPin } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-12 pb-6 border-b border-[#E5E0D8]">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
            The Brand
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-[#18181A] font-light">
            About Nestandkey
          </h1>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-[#3E3E42] leading-relaxed font-light">
          <p className="text-base sm:text-lg text-[#18181A] font-normal leading-relaxed">
            Nestandkey was founded on a singular conviction: that the acquisition of prime real estate in Dubai should reflect the sophistication, discretion, and connoisseurship of a private wealth office rather than a generic property portal.
          </p>

          <p>
            Operating from ICD Brookfield Place in DIFC, our private client advisors specialize exclusively in the highest tier of the market—representing royal families, international entrepreneurs, and sovereign funds in securing landmark architectural estates across Palm Jumeirah, Emirates Hills, and Jumeirah Bay Island.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-[#E5E0D8] my-8">
            <div className="p-4 bg-[#F7F5F0]">
              <span className="font-serif text-3xl text-[#C5A880] block font-medium">AED 2.4B+</span>
              <span className="text-xs text-[#71717A] mt-1 block">Super-Prime Advisory Volume</span>
            </div>
            <div className="p-4 bg-[#F7F5F0]">
              <span className="font-serif text-3xl text-[#C5A880] block font-medium">100%</span>
              <span className="text-xs text-[#71717A] mt-1 block">RERA Licensed & Certified</span>
            </div>
            <div className="p-4 bg-[#F7F5F0]">
              <span className="font-serif text-3xl text-[#C5A880] block font-medium">40+</span>
              <span className="text-xs text-[#71717A] mt-1 block">Off-Market Exclusive Mandates</span>
            </div>
          </div>

          <h3 className="font-serif text-2xl text-[#18181A] pt-4 font-normal">Our Standards</h3>
          <p>
            We enforce complete privacy protection: client identities and sensitive financial requirements are treated with strict institutional confidentiality.
          </p>
        </div>
      </div>
    </div>
  );
};

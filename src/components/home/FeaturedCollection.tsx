import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { formatAED, formatSqFt } from '@nestandkey/utils';
import palmJumeirah from '../../../assets/landing pages image/palm-jumeirah-atlantis.jpg';

type Residence = {
  _id: string;
  title: string;
  slug: string;
  propertyType?: string;
  purpose?: string;
  community?: string;
  priceAED?: number;
  bedrooms?: number;
  builtUpAreaSqFt?: number;
  featuredImage: string;
};

function MetaLine({ property }: { property: Residence }) {
  const details = [
    property.priceAED ? formatAED(property.priceAED) : null,
    property.bedrooms ? `${property.bedrooms} bedrooms` : null,
    property.builtUpAreaSqFt ? formatSqFt(property.builtUpAreaSqFt) : null
  ].filter(Boolean);

  return (
    <p className="text-[12px] uppercase tracking-[0.22em] text-[#D8C3A5]">
      {details.join('  ·  ')}
      {property.purpose === 'RENT' ? '  ·  per year' : ''}
    </p>
  );
}

function LeadResidence({ property }: { property: Residence }) {
  return (
    <Link
      to={`/property/${property.slug}`}
      className="group relative block min-h-[92vh] overflow-hidden bg-[#0B2135] text-[#F7F3EA]"
    >
      <img
        src="https://images.unsplash.com/photo-1721170628208-dffed6eb3514?auto=format&fit=crop&w=2400&q=85"
        alt={property.title}
        className="absolute inset-0 h-full w-full object-cover scale-[1.04] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/90 via-[#0B2135]/20 to-[#0B2135]/25" />
      <div className="relative flex min-h-[92vh] flex-col justify-end px-6 py-12 sm:px-12 lg:px-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="crest-kicker text-[#D8C3A5] mb-5">
              01{property.community ? `  ·  ${property.community}` : ''}
            </p>
            <h3 className="font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              {property.title}
            </h3>
            {property.propertyType && (
              <p className="mt-4 font-display text-2xl italic text-[#D8C3A5]">{property.propertyType}</p>
            )}
          </div>
          <div className="lg:pb-2 lg:text-right">
            <MetaLine property={property} />
            <span className="mt-5 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#F7F3EA]">
              View residence
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CompanionResidence({ property, index }: { property: Residence; index: number }) {
  return (
    <Link
      to={`/property/${property.slug}`}
      className="group flex min-h-[78vh] flex-1 basis-0 flex-col overflow-hidden bg-[#102A43] text-[#F7F3EA] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hover:flex-[1.35]"
    >
      <div className="relative min-h-[52vh] flex-1 overflow-hidden">
        <img
          src={
            property.community === 'Emirates Hills'
              ? 'https://images.unsplash.com/photo-1538424712534-4a56ef8165bf?auto=format&fit=crop&w=2000&q=85'
              : property.community === 'Palm Jumeirah'
                ? palmJumeirah
                : property.featuredImage
          }
          alt={property.title}
          className="absolute inset-0 h-full w-full object-cover scale-[1.05] transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/50 to-transparent" />
      </div>
      <div className="bg-[#0B2135] px-8 py-8 lg:px-10">
        <p className="crest-kicker text-[#D8C3A5] mb-3">
          0{index}
          {property.community ? `  ·  ${property.community}` : ''}
        </p>
        <h3 className="font-display text-3xl leading-tight sm:text-4xl group-hover:text-[#D8C3A5] transition-colors duration-500">
          {property.title}
        </h3>
        <div className="mt-4">
          <MetaLine property={property} />
        </div>
      </div>
    </Link>
  );
}

export const FeaturedCollection: React.FC<{
  isLoading: boolean;
  properties: Residence[];
}> = ({ isLoading, properties }) => {
  const lead = properties[0];
  const companions = properties.slice(1, 3);

  return (
    <section className="bg-[#F7F3EA] pt-24 lg:pt-32" aria-label="The collection">
      <div className="mb-10 flex flex-col gap-6 px-6 sm:px-12 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:px-16">
        <div className="max-w-3xl">
          <p className="crest-kicker text-[#B08D57] mb-4">The collection</p>
          <h2 className="font-display crest-title text-[#102A43]">Featured properties</h2>
          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-[#6B7280]">
            A short private list. Each residence is shown as it is held, with its place, its price, and nothing ornamental.
          </p>
        </div>
        <Link
          to="/properties"
          className="inline-flex items-center gap-3 border border-[#E9E1D4] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-[#102A43] transition-colors hover:border-[#B08D57] hover:text-[#B08D57]"
        >
          View all properties
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="min-h-[70vh] bg-[#E9E1D4]" />
      ) : lead ? (
        <>
          <LeadResidence property={lead} />
          {companions.length > 0 && (
            <div className="flex flex-col lg:flex-row">
              {companions.map((property, index) => (
                <CompanionResidence key={property._id} property={property} index={index + 2} />
              ))}
            </div>
          )}
        </>
      ) : null}
    </section>
  );
};

export default FeaturedCollection;

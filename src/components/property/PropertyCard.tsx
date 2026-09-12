import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Maximize2, MapPin, ArrowUpRight } from 'lucide-react';
import { formatAED, formatSqFt } from '@nestandkey/utils';
import { useFavorites } from '../../context/FavoritesContext';

interface PropertyCardProps {
  property: {
    _id: string;
    title: string;
    slug: string;
    propertyType: string;
    purpose: string;
    community: string;
    priceAED: number;
    rentalFrequency?: string;
    bedrooms: number;
    bathrooms: number;
    builtUpAreaSqFt: number;
    featuredImage: string;
    isNewLaunch?: boolean;
    isFeatured?: boolean;
    luxuryCollection?: string;
  };
  onInquire?: (property: any) => void;
  isHighlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onInquire,
  isHighlighted = false,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(property._id);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`group bg-[#FDFCF9] border transition-all duration-300 flex flex-col overflow-hidden relative shadow-sm hover:shadow-md ${
        isHighlighted
          ? 'border-[#C5A880] ring-2 ring-[#C5A880]/60 shadow-lg scale-[1.01]'
          : 'border-[#E5E0D8] hover:border-[#C5A880]'
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18181A]">
        <img
          src={property.featuredImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover luxury-image-zoom"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="bg-[#0B0B0C]/85 backdrop-blur-sm text-[#F7F5F0] text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 font-medium border border-[#E5E0D8]/20">
            {property.propertyType}
          </span>
          {property.isNewLaunch && (
            <span className="bg-[#C5A880] text-[#18181A] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-bold">
              New Launch
            </span>
          )}
          {property.purpose === 'RENT' && (
            <span className="bg-[#18181A]/90 text-[#C5A880] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-medium border border-[#C5A880]/30">
              For Lease
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property._id);
          }}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#0B0B0C]/60 backdrop-blur-md flex items-center justify-center text-[#F7F5F0] hover:text-[#C5A880] hover:bg-[#0B0B0C]/90 transition-all"
          title={favorited ? 'Remove from saved' : 'Save residence'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-[#C5A880] text-[#C5A880]' : ''}`} />
        </button>

        {/* Community on Image */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs text-[#F7F5F0] font-medium tracking-wide drop-shadow">
          <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{property.community}, Dubai</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Price */}
          <div className="mb-2">
            <span className="text-xl lg:text-2xl font-serif font-medium text-[#18181A] tracking-tight">
              {formatAED(property.priceAED)}
            </span>
            {property.purpose === 'RENT' && (
              <span className="text-xs text-[#71717A] ml-1.5 font-light">/ year</span>
            )}
          </div>

          {/* Title */}
          <Link to={`/property/${property.slug}`}>
            <h3 className="font-serif text-lg font-normal text-[#18181A] group-hover:text-[#C5A880] transition-colors line-clamp-1 leading-snug">
              {property.title}
            </h3>
          </Link>
        </div>

        {/* Key Statistics */}
        <div className="pt-5 mt-5 border-t border-[#E5E0D8] grid grid-cols-3 gap-2 text-xs text-[#3E3E42]">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#C5A880]" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#C5A880]" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Maximize2 className="w-4 h-4 text-[#C5A880]" />
            <span>{formatSqFt(property.builtUpAreaSqFt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 mt-4 border-t border-[#E5E0D8]/60 flex items-center justify-between">
          <Link
            to={`/property/${property.slug}`}
            className="text-xs uppercase tracking-[0.14em] font-medium text-[#18181A] group-hover:text-[#C5A880] transition-colors flex items-center gap-1"
          >
            <span>View Residence</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </Link>

          {onInquire && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onInquire(property);
              }}
              className="text-[11px] uppercase tracking-wider text-[#C5A880] hover:text-[#B8976C] font-semibold"
            >
              Private Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

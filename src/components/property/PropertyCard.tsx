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
      className={`group bg-[#FFFDF8] border transition-all duration-300 flex flex-col overflow-hidden relative shadow-sm hover:shadow-md font-ui ${
        isHighlighted
          ? 'border-[#B08D57] ring-2 ring-[#B08D57]/60 shadow-lg scale-[1.01]'
          : 'border-[#E9E1D4] hover:border-[#B08D57]'
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#102A43]">
        <img
          src={property.featuredImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover luxury-image-zoom"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/70 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className="bg-[#102A43]/85 backdrop-blur-sm text-[#F7F3EA] text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 font-medium border border-[#1E3A5F]">
            {property.propertyType}
          </span>
          {property.isNewLaunch && (
            <span className="bg-[#B08D57] text-[#102A43] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-bold">
              New Launch
            </span>
          )}
          {property.purpose === 'RENT' && (
            <span className="bg-[#102A43]/90 text-[#D8C3A5] text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-medium border border-[#B08D57]/40">
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
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#0B2135]/65 backdrop-blur-md flex items-center justify-center text-[#F7F3EA] hover:text-[#B08D57] hover:bg-[#0B2135]/90 transition-all"
          title={favorited ? 'Remove from saved' : 'Save residence'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-[#B08D57] text-[#B08D57]' : ''}`} />
        </button>

        {/* Community on Image */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs text-[#F7F3EA] font-medium tracking-wide drop-shadow font-ui">
          <MapPin className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>{property.community}, Dubai</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-[#FFFDF8]">
        <div>
          {/* Price */}
          <div className="mb-2">
            <span className="text-xl lg:text-2xl font-ui font-semibold text-[#102A43] tracking-tight">
              {formatAED(property.priceAED)}
            </span>
            {property.purpose === 'RENT' && (
              <span className="text-xs text-[#6B7280] ml-1.5 font-normal">/ year</span>
            )}
          </div>

          {/* Title - Cormorant Garamond */}
          <Link to={`/property/${property.slug}`}>
            <h3 className="font-display text-xl font-normal text-[#102A43] group-hover:text-[#B08D57] transition-colors line-clamp-1 leading-snug">
              {property.title}
            </h3>
          </Link>
        </div>

        {/* Key Statistics - DM Sans, Muted Grey, Champagne Brass icons */}
        <div className="pt-5 mt-5 border-t border-[#E9E1D4] grid grid-cols-3 gap-2 text-xs text-[#6B7280] font-ui">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-[#B08D57]" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-[#B08D57]" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 justify-end">
            <Maximize2 className="w-4 h-4 text-[#B08D57]" />
            <span>{formatSqFt(property.builtUpAreaSqFt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 mt-4 border-t border-[#E9E1D4]/60 flex items-center justify-between font-ui">
          <Link
            to={`/property/${property.slug}`}
            className="text-xs uppercase tracking-[0.14em] font-semibold text-[#102A43] group-hover:text-[#B08D57] transition-colors flex items-center gap-1"
          >
            <span>View Residence</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B08D57]" />
          </Link>

          {onInquire && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onInquire(property);
              }}
              className="text-[11px] uppercase tracking-wider text-[#B08D57] hover:text-[#D8C3A5] font-semibold"
            >
              Private Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

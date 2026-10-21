import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Maximize2, MapPin, ArrowUpRight, ShieldCheck, MessageCircle } from 'lucide-react';
import { formatAED, formatSqFt } from '@nestandkey/utils';
import { useFavorites } from '../../context/FavoritesContext';
import { getBrokerDisplayInfo } from './brokerHelper';

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
    assignedBroker?: any;
    broker?: any;
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
  const broker = getBrokerDisplayInfo(property);

  const cleanWhatsAppNumber = broker.whatsappNumber ? broker.whatsappNumber.replace(/[^0-9]/g, '') : null;
  const whatsappUrl = cleanWhatsAppNumber
    ? `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
        `Hello ${broker.name}, I am interested in viewing ${property.title} in ${property.community} (Ref: ${property.slug}).`
      )}`
    : null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`group bg-[#FFFDF8] border transition-colors duration-300 flex flex-col overflow-hidden relative font-ui ${
        isHighlighted
          ? 'border-[#B08D57]'
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
      <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between bg-[#FFFDF8]">
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
        <div className="pt-4 mt-4 border-t border-[#E9E1D4] grid grid-cols-3 gap-2 text-xs text-[#6B7280] font-ui">
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

        {/* Dedicated Broker Profile Section */}
        <div className="pt-3.5 mt-3.5 border-t border-[#E9E1D4]">
          <div className="flex items-center justify-between gap-2.5 bg-[#FAF7F0] border border-[#E9E1D4] px-3 py-2 rounded-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={broker.photoUrl}
                  alt={broker.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#B08D57]/70 shadow-xs"
                  loading="lazy"
                />
                <span
                  className="absolute -bottom-0.5 -right-0.5 bg-[#5D7A65] text-white p-0.5 rounded-full shadow-xs"
                  title="RERA Certified Broker"
                >
                  <ShieldCheck className="w-2.5 h-2.5" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#B08D57] font-mono font-bold">
                    Listed By
                  </span>
                  <span className="text-[9px] text-[#5D7A65] font-mono font-medium">
                    • RERA Verified
                  </span>
                </div>
                <p className="font-ui text-xs font-semibold text-[#102A43] truncate leading-tight">
                  {broker.name}
                </p>
                <p className="text-[10px] text-[#6B7280] font-ui truncate">
                  {broker.title}
                </p>
              </div>
            </div>

            {/* Quick Contact Button */}
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 flex items-center gap-1 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 px-2 py-1.5 rounded-xs transition-colors duration-200 text-[10px] font-semibold"
                title={`Chat with ${broker.name} on WhatsApp`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            ) : onInquire ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onInquire(property);
                }}
                className="shrink-0 flex items-center gap-1 bg-[#102A43]/5 hover:bg-[#102A43] text-[#102A43] hover:text-[#F7F3EA] border border-[#E9E1D4] px-2 py-1.5 rounded-xs transition-colors duration-200 text-[10px] font-semibold"
                title={`Contact ${broker.name}`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Contact</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3.5 mt-3.5 border-t border-[#E9E1D4]/60 flex items-center justify-between font-ui">
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


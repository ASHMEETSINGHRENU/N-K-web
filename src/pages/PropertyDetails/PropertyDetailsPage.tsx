import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { formatAED, formatSqFt } from '@nestandkey/utils';
import { useFavorites } from '../../context/FavoritesContext';
import { LeadEnquiryModal } from '../../components/forms/LeadEnquiryModal';
import { MortgageCalculatorWidget } from '../../components/forms/MortgageCalculatorWidget';
import { PropertyCard } from '../../components/property/PropertyCard';
import {
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Heart,
  Share2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Check,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export const PropertyDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<any | null>(null);
  const [similarProperties, setSimilarProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryLightboxOpen, setIsGalleryLightboxOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState<'INQUIRY' | 'VIEWING_REQUEST' | 'SPECIALIST_CALL'>('INQUIRY');

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadProperty() {
      if (!slug) return;
      setIsLoading(true);
      try {
        const res = await api.getPropertyBySlug(slug);
        setProperty(res.property);
        setSimilarProperties(res.similarProperties || []);
      } catch (err) {
        console.error('Failed to load property details:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProperty();
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12 animate-pulse space-y-8">
        <div className="h-10 bg-[#F7F5F0] w-1/3" />
        <div className="aspect-[21/9] bg-[#F7F5F0] w-full" />
        <div className="grid grid-cols-3 gap-8">
          <div className="h-40 bg-[#F7F5F0]" />
          <div className="h-40 bg-[#F7F5F0]" />
          <div className="h-40 bg-[#F7F5F0]" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="pt-36 pb-24 text-center max-w-md mx-auto px-6 font-ui">
        <h2 className="font-display text-3xl text-[#102A43] mb-4">Residence Not Found</h2>
        <p className="text-xs text-[#6B7280] mb-6">
          The requested luxury property listing may have been acquired, leased, or archived into our private vault.
        </p>
        <Link
          to="/properties"
          className="bg-[#102A43] text-[#F7F3EA] hover:bg-[#1E3A5F] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
        >
          Browse Active Portfolio
        </Link>
      </div>
    );
  }

  const allImages = property.images?.length > 0 ? property.images : [property.featuredImage];
  const broker = property.assignedBroker;
  const favorited = isFavorite(property._id);

  return (
    <div className="pt-24 pb-24 bg-[#F7F3EA] text-[#3E4852] font-ui">
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 text-[11px] text-[#6B7280] flex items-center gap-2 tracking-wider">
        <Link to="/" className="hover:text-[#102A43]">Crestshore</Link>
        <ChevronRight className="w-3 h-3 text-[#B08D57]" />
        <Link to="/properties" className="hover:text-[#102A43]">Portfolio</Link>
        <ChevronRight className="w-3 h-3 text-[#B08D57]" />
        <Link to={`/communities/${property.community.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#102A43]">
          {property.community}
        </Link>
        <ChevronRight className="w-3 h-3 text-[#B08D57]" />
        <span className="text-[#102A43] font-medium truncate max-w-xs">{property.title}</span>
      </div>

      {/* 2. FULL-SCREEN EDITORIAL GALLERY */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
          {/* Main Large Image */}
          <div
            className="lg:col-span-3 h-full relative cursor-pointer group bg-[#102A43]"
            onClick={() => setIsGalleryLightboxOpen(true)}
          >
            <img
              src={allImages[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="bg-[#102A43]/95 backdrop-blur-sm text-[#F7F3EA] text-xs px-4 py-2 border border-[#B08D57]/60 uppercase tracking-widest font-mono">
                Expand Full Gallery ({allImages.length} Photos)
              </span>
            </div>
          </div>

          {/* Thumbnails Column */}
          <div className="hidden lg:flex flex-col gap-3 h-full overflow-y-auto">
            {allImages.slice(0, 3).map((img: string, idx: number) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative flex-1 cursor-pointer overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#B08D57]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Editorial Body (8 cols) */}
        <div className="lg:col-span-8 space-y-12">
          {/* Header & Title */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#102A43] text-[#F7F3EA] text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-mono font-semibold border border-[#1E3A5F]">
                  {property.propertyType}
                </span>
                <span className="text-xs text-[#6B7280] tracking-wider">
                  Ref: <span className="font-mono text-[#102A43] font-semibold">{property.referenceNumber}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFavorite(property._id)}
                  className={`p-2 border border-[#E9E1D4] rounded transition-colors ${
                    favorited ? 'text-[#B08D57] border-[#B08D57] bg-[#B08D57]/10' : 'text-[#6B7280] hover:text-[#102A43]'
                  }`}
                  title="Bookmark"
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-[#B08D57]' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Residence link copied to clipboard.');
                    }
                  }}
                  className="p-2 border border-[#E9E1D4] rounded text-[#6B7280] hover:text-[#102A43] transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-[#102A43] tracking-tight mb-4">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-[#6B7280] tracking-wide">
              <MapPin className="w-4 h-4 text-[#B08D57]" />
              <span>
                {property.subCommunity ? `${property.subCommunity}, ` : ''}{property.community}, Dubai, United Arab Emirates
              </span>
            </div>
          </div>

          {/* Key Statistics Grid - Warm White cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#FFFDF8] border border-[#E9E1D4] shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-mono">Bedrooms</span>
              <div className="flex items-center gap-2 text-xl font-display font-semibold text-[#102A43]">
                <Bed className="w-4 h-4 text-[#B08D57]" />
                <span>{property.bedrooms}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-mono">Bathrooms</span>
              <div className="flex items-center gap-2 text-xl font-display font-semibold text-[#102A43]">
                <Bath className="w-4 h-4 text-[#B08D57]" />
                <span>{property.bathrooms}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-mono">Built-Up Area</span>
              <div className="flex items-center gap-2 text-xl font-display font-semibold text-[#102A43]">
                <Maximize2 className="w-4 h-4 text-[#B08D57]" />
                <span>{formatSqFt(property.builtUpAreaSqFt)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-mono">Completion</span>
              <div className="flex items-center gap-2 text-xl font-display font-semibold text-[#102A43]">
                <Clock className="w-4 h-4 text-[#B08D57]" />
                <span className="text-sm uppercase tracking-wider font-ui font-medium">{property.completionStatus}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#FFFDF8] p-6 lg:p-8 border border-[#E9E1D4] shadow-sm">
            <h3 className="font-display text-2xl font-normal text-[#102A43] mb-4 pb-2 border-b border-[#E9E1D4]">
              Architectural Overview
            </h3>
            <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#3E4852] leading-relaxed font-normal space-y-4">
              <p>{property.description}</p>
            </div>
          </div>

          {/* Specifications & Attributes */}
          <div className="bg-[#FFFDF8] p-6 lg:p-8 border border-[#E9E1D4] shadow-sm">
            <h3 className="font-display text-2xl font-normal text-[#102A43] mb-4 pb-2 border-b border-[#E9E1D4]">
              Residence Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
              <div>
                <span className="text-[#6B7280] block mb-0.5">Typology</span>
                <span className="font-semibold text-[#102A43]">{property.propertyType}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block mb-0.5">Developer</span>
                <span className="font-semibold text-[#102A43]">{property.developer || 'Prime Private Developer'}</span>
              </div>
              <div>
                <span className="text-[#6B7280] block mb-0.5">Furnishing</span>
                <span className="font-semibold text-[#102A43]">{property.furnishing?.replace('_', ' ')}</span>
              </div>
              {property.plotAreaSqFt && (
                <div>
                  <span className="text-[#6B7280] block mb-0.5">Plot Size</span>
                  <span className="font-semibold text-[#102A43]">{formatSqFt(property.plotAreaSqFt)}</span>
                </div>
              )}
              {property.handoverDate && (
                <div>
                  <span className="text-[#6B7280] block mb-0.5">Anticipated Handover</span>
                  <span className="font-semibold text-[#102A43]">{property.handoverDate}</span>
                </div>
              )}
              {property.views?.length > 0 && (
                <div>
                  <span className="text-[#6B7280] block mb-0.5">Panoramic Views</span>
                  <span className="font-semibold text-[#102A43]">{property.views.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Verified Amenities */}
          {property.amenities?.length > 0 && (
            <div className="bg-[#FFFDF8] p-6 lg:p-8 border border-[#E9E1D4] shadow-sm">
              <h3 className="font-display text-2xl font-normal text-[#102A43] mb-4 pb-2 border-b border-[#E9E1D4]">
                Curated Amenities & Lifestyle Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {property.amenities.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-2.5 p-3 bg-[#F7F3EA] border border-[#E9E1D4]">
                    <Check className="w-4 h-4 text-[#B08D57] shrink-0" />
                    <span className="text-[#102A43] font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floor Plans Section */}
          {property.floorPlans?.length > 0 && (
            <div className="bg-[#FFFDF8] p-6 lg:p-8 border border-[#E9E1D4] shadow-sm">
              <h3 className="font-display text-2xl font-normal text-[#102A43] mb-4 pb-2 border-b border-[#E9E1D4]">
                Architectural Floor Layouts
              </h3>
              <div className="space-y-4">
                {property.floorPlans.map((fp: any, idx: number) => (
                  <div key={idx} className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display text-lg font-semibold text-[#102A43]">{fp.title}</h4>
                      <p className="text-xs text-[#6B7280]">
                        {fp.bedrooms} Bedrooms • {fp.bathrooms} Bathrooms • {formatSqFt(fp.totalAreaSqFt)}
                      </p>
                    </div>
                    {fp.imageUrl && (
                      <button
                        onClick={() => window.open(fp.imageUrl, '_blank')}
                        className="text-xs uppercase tracking-wider text-[#B08D57] font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span>Inspect High-Res Plan</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Dubai Landmarks */}
          {property.nearbyPlaces?.length > 0 && (
            <div className="bg-[#FFFDF8] p-6 lg:p-8 border border-[#E9E1D4] shadow-sm">
              <h3 className="font-display text-2xl font-normal text-[#102A43] mb-4 pb-2 border-b border-[#E9E1D4]">
                Location & Accessibility
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {property.nearbyPlaces.map((place: any) => (
                  <div key={place.name} className="p-3 bg-[#F7F3EA] border border-[#E9E1D4]">
                    <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block">
                      {place.category}
                    </span>
                    <span className="font-display text-base font-semibold text-[#102A43] block">{place.name}</span>
                    <span className="text-[11px] text-[#6B7280] mt-1 block">
                      ~{place.distanceMinutes} minutes drive
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Embedded UAE Mortgage Calculator */}
          <div>
            <h3 className="font-display text-2xl font-normal text-[#102A43] mb-4 pb-2 border-b border-[#E9E1D4]">
              Mortgage & Financing Breakdown
            </h3>
            <MortgageCalculatorWidget initialPriceAED={property.priceAED} />
          </div>
        </div>

        {/* Right Sticky Conversion Column (4 cols) - Warm White & Champagne Brass */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 space-y-6">
            {/* Price & Action Card */}
            <div className="bg-[#FFFDF8] text-[#102A43] p-6 lg:p-8 border border-[#E9E1D4] shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block mb-1 font-mono">
                {property.purpose === 'RENT' ? 'Annual Lease Asking Price' : 'Asking Price'}
              </span>
              <div className="font-ui text-3xl sm:text-4xl text-[#102A43] font-bold tracking-tight mb-6">
                {formatAED(property.priceAED)}
                {property.purpose === 'RENT' && <span className="text-xs text-[#6B7280] font-normal ml-1">/ year</span>}
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-4 border-t border-[#E9E1D4]">
                <button
                  onClick={() => {
                    setEnquiryType('VIEWING_REQUEST');
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full bg-[#B08D57] hover:bg-[#9B7A49] text-[#102A43] py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-[#102A43]" />
                  <span>Request Private Viewing</span>
                </button>

                <button
                  onClick={() => {
                    setEnquiryType('INQUIRY');
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full border border-[#B08D57] hover:bg-[#B08D57]/10 text-[#102A43] py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-[#B08D57]" />
                  <span>Mortgage & Details Enquiry</span>
                </button>

                {broker?.whatsappNumber && (
                  <button
                    onClick={() => {
                      setEnquiryType('SPECIALIST_CALL');
                      setIsEnquiryModalOpen(true);
                    }}
                    className="w-full bg-[#5D7A65] hover:bg-[#4E6755] text-[#F7F3EA] py-3 text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Specialist</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dedicated Property Specialist Profile Card */}
            {broker && (
              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-semibold block mb-4 font-mono">
                  Dedicated Property Specialist
                </span>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={broker.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                    alt={broker.title}
                    className="w-16 h-16 rounded-full object-cover border border-[#B08D57]"
                  />
                  <div>
                    <h4 className="font-display text-lg font-semibold text-[#102A43]">{broker.title}</h4>
                    <p className="text-xs text-[#6B7280]">{broker.agencyName || 'Crestshore Luxury Real Estate'}</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#5D7A65] font-mono mt-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#5D7A65]" />
                      <span>RERA Certified • {broker.experienceYears}y Experience</span>
                    </div>
                  </div>
                </div>

                {broker.languages?.length > 0 && (
                  <div className="text-[11px] text-[#6B7280] mb-4">
                    <span>Languages: </span>
                    <span className="text-[#102A43] font-semibold">{broker.languages.join(', ')}</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setEnquiryType('SPECIALIST_CALL');
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full bg-[#102A43] hover:bg-[#1E3A5F] text-[#F7F3EA] py-2.5 text-xs uppercase tracking-widest font-semibold transition-all"
                >
                  Speak With Specialist
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 17. Similar Prime Residences */}
      {similarProperties.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 mt-24 border-t border-[#E9E1D4]">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-2 font-mono">
              Comparable Architecture
            </span>
            <h2 className="font-display text-3xl font-normal text-[#102A43]">
              Similar Luxury Residences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        </section>
      )}

      {/* Lead Enquiry Modal */}
      <LeadEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        property={property}
        leadType={enquiryType}
      />
    </div>
  );
};

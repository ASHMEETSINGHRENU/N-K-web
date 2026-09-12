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
      <div className="pt-36 pb-24 text-center max-w-md mx-auto px-6">
        <h2 className="font-serif text-3xl text-[#18181A] mb-4">Residence Not Found</h2>
        <p className="text-xs text-[#71717A] mb-6">
          The requested luxury property listing may have been acquired, leased, or archived into our private vault.
        </p>
        <Link
          to="/properties"
          className="bg-[#18181A] text-[#F7F5F0] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
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
    <div className="pt-24 pb-24 bg-[#FDFCF9] text-[#18181A] font-sans">
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 text-[11px] text-[#71717A] flex items-center gap-2 tracking-wider">
        <Link to="/" className="hover:text-[#18181A]">Nestandkey</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/properties" className="hover:text-[#18181A]">Portfolio</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to={`/communities/${property.community.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-[#18181A]">
          {property.community}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[#18181A] truncate max-w-xs">{property.title}</span>
      </div>

      {/* 2. FULL-SCREEN EDITORIAL GALLERY */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
          {/* Main Large Image */}
          <div
            className="lg:col-span-3 h-full relative cursor-pointer group bg-[#18181A]"
            onClick={() => setIsGalleryLightboxOpen(true)}
          >
            <img
              src={allImages[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="bg-[#18181A]/90 backdrop-blur-sm text-[#F7F5F0] text-xs px-4 py-2 border border-[#C5A880]/40 uppercase tracking-widest font-mono">
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
                  activeImageIndex === idx ? 'border-[#C5A880]' : 'border-transparent opacity-70 hover:opacity-100'
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
                <span className="bg-[#18181A] text-[#C5A880] text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-mono font-semibold">
                  {property.propertyType}
                </span>
                <span className="text-xs text-[#71717A] tracking-wider">
                  Ref: <span className="font-mono text-[#18181A]">{property.referenceNumber}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleFavorite(property._id)}
                  className={`p-2 border border-[#E5E0D8] rounded transition-colors ${
                    favorited ? 'text-[#C5A880] border-[#C5A880] bg-[#C5A880]/10' : 'text-[#71717A] hover:text-[#18181A]'
                  }`}
                  title="Bookmark"
                >
                  <Heart className={`w-4 h-4 ${favorited ? 'fill-[#C5A880]' : ''}`} />
                </button>
                <button
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Residence link copied to clipboard.');
                    }
                  }}
                  className="p-2 border border-[#E5E0D8] rounded text-[#71717A] hover:text-[#18181A] transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#18181A] tracking-tight mb-4">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-[#71717A] tracking-wide">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span>
                {property.subCommunity ? `${property.subCommunity}, ` : ''}{property.community}, Dubai, United Arab Emirates
              </span>
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[#F7F5F0] border border-[#E5E0D8]">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#71717A] block">Bedrooms</span>
              <div className="flex items-center gap-2 text-xl font-serif font-medium text-[#18181A]">
                <Bed className="w-4 h-4 text-[#C5A880]" />
                <span>{property.bedrooms}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#71717A] block">Bathrooms</span>
              <div className="flex items-center gap-2 text-xl font-serif font-medium text-[#18181A]">
                <Bath className="w-4 h-4 text-[#C5A880]" />
                <span>{property.bathrooms}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#71717A] block">Built-Up Area</span>
              <div className="flex items-center gap-2 text-xl font-serif font-medium text-[#18181A]">
                <Maximize2 className="w-4 h-4 text-[#C5A880]" />
                <span>{formatSqFt(property.builtUpAreaSqFt)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-[#71717A] block">Completion</span>
              <div className="flex items-center gap-2 text-xl font-serif font-medium text-[#18181A]">
                <Clock className="w-4 h-4 text-[#C5A880]" />
                <span className="text-sm uppercase tracking-wider">{property.completionStatus}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-2xl font-light text-[#18181A] mb-4 pb-2 border-b border-[#E5E0D8]">
              Architectural Overview
            </h3>
            <div className="prose prose-neutral max-w-none text-xs sm:text-sm text-[#3E3E42] leading-relaxed font-light space-y-4">
              <p>{property.description}</p>
            </div>
          </div>

          {/* Specifications & Attributes */}
          <div>
            <h3 className="font-serif text-2xl font-light text-[#18181A] mb-4 pb-2 border-b border-[#E5E0D8]">
              Residence Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-xs">
              <div>
                <span className="text-[#71717A] block mb-0.5">Typology</span>
                <span className="font-medium text-[#18181A]">{property.propertyType}</span>
              </div>
              <div>
                <span className="text-[#71717A] block mb-0.5">Developer</span>
                <span className="font-medium text-[#18181A]">{property.developer || 'Prime Private Developer'}</span>
              </div>
              <div>
                <span className="text-[#71717A] block mb-0.5">Furnishing</span>
                <span className="font-medium text-[#18181A]">{property.furnishing?.replace('_', ' ')}</span>
              </div>
              {property.plotAreaSqFt && (
                <div>
                  <span className="text-[#71717A] block mb-0.5">Plot Size</span>
                  <span className="font-medium text-[#18181A]">{formatSqFt(property.plotAreaSqFt)}</span>
                </div>
              )}
              {property.handoverDate && (
                <div>
                  <span className="text-[#71717A] block mb-0.5">Anticipated Handover</span>
                  <span className="font-medium text-[#18181A]">{property.handoverDate}</span>
                </div>
              )}
              {property.views?.length > 0 && (
                <div>
                  <span className="text-[#71717A] block mb-0.5">Panoramic Views</span>
                  <span className="font-medium text-[#18181A]">{property.views.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Verified Amenities */}
          {property.amenities?.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl font-light text-[#18181A] mb-4 pb-2 border-b border-[#E5E0D8]">
                Curated Amenities & Lifestyle Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {property.amenities.map((amenity: string) => (
                  <div key={amenity} className="flex items-center gap-2.5 p-3 bg-[#F7F5F0] border border-[#E5E0D8]">
                    <Check className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span className="text-[#18181A] font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floor Plans Section */}
          {property.floorPlans?.length > 0 && (
            <div>
              <h3 className="font-serif text-2xl font-light text-[#18181A] mb-4 pb-2 border-b border-[#E5E0D8]">
                Architectural Floor Layouts
              </h3>
              <div className="space-y-4">
                {property.floorPlans.map((fp: any, idx: number) => (
                  <div key={idx} className="p-4 bg-[#F7F5F0] border border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-serif text-lg font-medium text-[#18181A]">{fp.title}</h4>
                      <p className="text-xs text-[#71717A]">
                        {fp.bedrooms} Bedrooms • {fp.bathrooms} Bathrooms • {formatSqFt(fp.totalAreaSqFt)}
                      </p>
                    </div>
                    {fp.imageUrl && (
                      <button
                        onClick={() => window.open(fp.imageUrl, '_blank')}
                        className="text-xs uppercase tracking-wider text-[#C5A880] font-semibold flex items-center gap-1 hover:underline"
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
            <div>
              <h3 className="font-serif text-2xl font-light text-[#18181A] mb-4 pb-2 border-b border-[#E5E0D8]">
                Location & Accessibility
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {property.nearbyPlaces.map((place: any) => (
                  <div key={place.name} className="p-3 bg-[#F7F5F0] border border-[#E5E0D8]">
                    <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                      {place.category}
                    </span>
                    <span className="font-serif text-base text-[#18181A] block">{place.name}</span>
                    <span className="text-[11px] text-[#71717A] mt-1 block">
                      ~{place.distanceMinutes} minutes drive
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Embedded UAE Mortgage Calculator */}
          <div>
            <h3 className="font-serif text-2xl font-light text-[#18181A] mb-4 pb-2 border-b border-[#E5E0D8]">
              Mortgage & Financing Breakdown
            </h3>
            <MortgageCalculatorWidget initialPriceAED={property.priceAED} />
          </div>
        </div>

        {/* Right Sticky Conversion Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 space-y-6">
            {/* Price & Action Card */}
            <div className="bg-[#18181A] text-[#F7F5F0] p-6 lg:p-8 border border-[#2A2A2D] shadow-xl">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-1">
                {property.purpose === 'RENT' ? 'Annual Lease Asking Price' : 'Asking Price'}
              </span>
              <div className="font-serif text-3xl sm:text-4xl text-[#C5A880] font-light tracking-tight mb-6">
                {formatAED(property.priceAED)}
                {property.purpose === 'RENT' && <span className="text-xs text-[#A3A3A8] font-sans ml-1">/ year</span>}
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-4 border-t border-[#2A2A2D]">
                <button
                  onClick={() => {
                    setEnquiryType('VIEWING_REQUEST');
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full bg-[#C5A880] hover:bg-[#B8976C] text-[#18181A] py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Private Viewing</span>
                </button>

                <button
                  onClick={() => {
                    setEnquiryType('INQUIRY');
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full border border-[#E5E0D8]/40 hover:border-[#C5A880] text-[#F7F5F0] hover:text-[#C5A880] py-3.5 text-xs uppercase tracking-[0.16em] font-medium transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Property Details</span>
                </button>

                {broker?.whatsappNumber && (
                  <button
                    onClick={() => {
                      setEnquiryType('SPECIALIST_CALL');
                      setIsEnquiryModalOpen(true);
                    }}
                    className="w-full bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/40 py-3 text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Specialist</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dedicated Property Specialist Profile Card */}
            {broker && (
              <div className="bg-[#FDFCF9] border border-[#E5E0D8] p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-4">
                  Dedicated Property Specialist
                </span>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={broker.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                    alt={broker.title}
                    className="w-16 h-16 rounded-full object-cover border border-[#C5A880]"
                  />
                  <div>
                    <h4 className="font-serif text-lg font-medium text-[#18181A]">{broker.title}</h4>
                    <p className="text-xs text-[#71717A]">{broker.agencyName || 'Nestandkey Luxury Real Estate'}</p>
                    <div className="flex items-center gap-1 text-[11px] text-[#C5A880] font-mono mt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>RERA Certified • {broker.experienceYears}y Experience</span>
                    </div>
                  </div>
                </div>

                {broker.languages?.length > 0 && (
                  <div className="text-[11px] text-[#71717A] mb-4">
                    <span>Languages: </span>
                    <span className="text-[#18181A] font-medium">{broker.languages.join(', ')}</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    setEnquiryType('SPECIALIST_CALL');
                    setIsEnquiryModalOpen(true);
                  }}
                  className="w-full bg-[#18181A] hover:bg-[#0B0B0C] text-[#F7F5F0] hover:text-[#C5A880] py-2.5 text-xs uppercase tracking-widest font-semibold transition-all"
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
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 mt-24 border-t border-[#E5E0D8]">
          <div className="mb-12">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              Comparable Architecture
            </span>
            <h2 className="font-serif text-3xl font-light text-[#18181A]">
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

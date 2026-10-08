import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { PropertyCard } from '../../components/property/PropertyCard';
import { DUBAI_COMMUNITIES } from '@nestandkey/constants';
import { MapPin } from 'lucide-react';

export const CommunityDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const communityMeta = DUBAI_COMMUNITIES.find((c) => c.slug === slug) || {
    name: slug?.replace(/-/g, ' ').toUpperCase() || 'Dubai Prime Community',
    slug: slug || '',
    tagline: 'Exclusive Dubai luxury neighborhood with world-class residential enclaves.',
    avgPricePerSqFt: 3800,
    highlightImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    description: 'A benchmark of architectural excellence and ultra-luxury Dubai lifestyle.'
  };

  useEffect(() => {
    async function loadProperties() {
      setIsLoading(true);
      try {
        const res = await api.getProperties({ community: communityMeta.name });
        setProperties(res.properties || []);
      } catch (err) {
        console.error('Failed to load community properties:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadProperties();
  }, [slug]);

  return (
    <div className="pt-20 pb-24 bg-[#F7F3EA] min-h-screen font-ui">
      {/* Community Hero */}
      <div className="relative aspect-[21/9] min-h-[360px] bg-[#102A43] overflow-hidden flex items-end">
        <img
          src={communityMeta.highlightImage}
          alt={communityMeta.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135] via-[#0B2135]/50 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-12 w-full text-[#F7F3EA]">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D8C3A5] mb-2 font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>Dubai Enclave Guide</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-normal tracking-tight mb-3">
            {communityMeta.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#E9E1D4] max-w-2xl font-light">
            {communityMeta.tagline}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 pb-12 border-b border-[#E9E1D4]">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-3xl font-normal text-[#102A43]">
              Lifestyle & Architectural Identity
            </h2>
            <p className="text-xs sm:text-sm text-[#3E4852] leading-relaxed font-normal">
              {communityMeta.description}
            </p>
          </div>

          <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 space-y-4 text-xs shadow-sm">
            <h3 className="font-display text-xl font-normal text-[#102A43]">Market Metrics</h3>
            <div className="flex justify-between pb-2 border-b border-[#E9E1D4]">
              <span className="text-[#6B7280]">Average Price/Sq.Ft:</span>
              <span className="font-mono font-semibold text-[#102A43]">AED {communityMeta.avgPricePerSqFt}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#E9E1D4]">
              <span className="text-[#6B7280]">Active Available Listings:</span>
              <span className="font-mono font-semibold text-[#102A43]">{properties.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">Zoning Status:</span>
              <span className="text-[#B08D57] font-semibold">Ultra-Prime Freehold</span>
            </div>
          </div>
        </div>

        {/* Community Properties */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-normal text-[#102A43]">
              Available Residences in {communityMeta.name}
            </h2>
            <Link
              to={`/properties?community=${encodeURIComponent(communityMeta.name)}`}
              className="text-xs uppercase tracking-wider text-[#B08D57] hover:text-[#D8C3A5] font-semibold"
            >
              Filter Listings →
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/5] bg-[#FFFDF8] animate-pulse border border-[#E9E1D4]" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="p-12 text-center bg-[#FFFDF8] border border-[#E9E1D4]">
              <p className="text-xs text-[#6B7280]">
                No public listings are currently visible for this enclave. Contact our private desk for off-market allocations.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CommunityDetailsPage;

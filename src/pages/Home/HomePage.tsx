import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { api } from '../../services/api';
import { PropertyCard } from '../../components/property/PropertyCard';
import { SearchHero } from '../../components/search/SearchHero';
import { LeadEnquiryModal } from '../../components/forms/LeadEnquiryModal';
import { DUBAI_COMMUNITIES, LUXURY_COLLECTIONS } from '@nestandkey/constants';

export const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [newLaunches, setNewLaunches] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPropertyForInquiry, setSelectedPropertyForInquiry] = useState<any | null>(null);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [featuredRes, newLaunchRes, insightsRes] = await Promise.all([
          api.getFeaturedProperties(),
          api.getNewLaunches(),
          api.getInsights()
        ]);
        setFeaturedProperties(featuredRes.properties || []);
        setNewLaunches(newLaunchRes.properties || []);
        setInsights(insightsRes.insights?.slice(0, 3) || []);
      } catch (err) {
        console.error('Failed to load homepage data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#0B0B0C] text-[#F7F5F0] overflow-hidden pt-24 pb-16">
        {/* Background Image with subtle editorial grade */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=85"
            alt="Dubai Prime Skyline"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-[#0B0B0C]/70" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 border border-[#C5A880]/40 px-4 py-1.5 rounded-full mb-8 bg-[#18181A]/60 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-medium">
              Private Property Advisory & Luxury Estates
              hello we are doing testing
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F7F5F0] max-w-4xl leading-[1.1] mb-6">
            Find Your Place in Dubai
          </h1>

          <p className="text-sm sm:text-base text-[#D5CFC5] max-w-2xl font-light leading-relaxed mb-12">
            Curated architectural masterworks, private beachfront villas on Palm Jumeirah, and panoramic sky penthouses for discerning global collectors and sovereign families.
          </p>

          {/* Integrated Discreet Search */}
          <SearchHero />
        </div>
      </section>

      {/* 2. CURATED FEATURED RESIDENCES */}
      <section className="py-24 bg-[#FDFCF9]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E0D8]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
                Editorial Selection
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-[#18181A] font-light tracking-tight">
                Curated Luxury Residences
              </h2>
            </div>
            <Link
              to="/properties"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.16em] font-medium text-[#18181A] hover:text-[#C5A880] flex items-center gap-1.5 transition-colors"
            >
              <span>Explore Entire Portfolio</span>
              <ArrowRight className="w-4 h-4 text-[#C5A880]" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/5] bg-[#F7F5F0] animate-pulse border border-[#E5E0D8]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((prop) => (
                <PropertyCard
                  key={prop._id}
                  property={prop}
                  onInquire={(p) => setSelectedPropertyForInquiry(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. DUBAI COMMUNITIES SHOWCASE */}
      <section className="py-24 bg-[#F7F5F0] border-t border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              Dubai Enclaves
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-[#18181A] font-light tracking-tight">
              Prestige Communities
            </h2>
            <p className="text-xs text-[#71717A] mt-2 leading-relaxed">
              Explore the premier residential destinations defined by architectural distinction, private security, and lifestyle excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUBAI_COMMUNITIES.slice(0, 8).map((comm) => (
              <Link
                key={comm.slug}
                to={`/communities/${comm.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-[#18181A] flex flex-col justify-end p-6 border border-[#E5E0D8] hover:border-[#C5A880] transition-all"
              >
                <img
                  src={comm.highlightImage}
                  alt={comm.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover luxury-image-zoom opacity-80 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent" />

                <div className="relative z-10 text-[#F7F5F0]">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block mb-1">
                    Avg. AED {comm.avgPricePerSqFt}/sq.ft
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors">
                    {comm.name}
                  </h3>
                  <p className="text-[11px] text-[#D5CFC5] line-clamp-2 mt-1.5 font-light">
                    {comm.tagline}
                  </p>
                  <div className="pt-3 mt-3 border-t border-[#E5E0D8]/20 flex items-center gap-1 text-[10px] uppercase tracking-widest text-[#C5A880]">
                    <span>Explore Community</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BRANDED RESIDENCES & NEW LAUNCHES */}
      {newLaunches.length > 0 && (
        <section className="py-24 bg-[#FDFCF9]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E0D8]">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
                  Visionary Projects
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl text-[#18181A] font-light tracking-tight">
                  New Launches & Off-Plan Estates
                </h2>
              </div>
              <Link
                to="/properties/off-plan"
                className="mt-4 md:mt-0 text-xs uppercase tracking-[0.16em] font-medium text-[#18181A] hover:text-[#C5A880] flex items-center gap-1.5 transition-colors"
              >
                <span>View All Developments</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newLaunches.map((prop) => (
                <PropertyCard
                  key={prop._id}
                  property={prop}
                  onInquire={(p) => setSelectedPropertyForInquiry(p)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. LUXURY EDITORIAL COLLECTIONS */}
      <section className="py-24 bg-[#121214] text-[#F7F5F0]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              Curated Portfolios
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl text-[#F7F5F0] font-light tracking-tight">
              The Luxury Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Waterfront Villas',
                subtitle: 'Private beaches & yacht moorings',
                image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
                link: '/properties/buy?type=Mansion'
              },
              {
                title: 'Dubai Penthouse Collection',
                subtitle: 'Sky palaces with Burj Khalifa panoramas',
                image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
                link: '/properties/buy?type=Penthouse'
              },
              {
                title: 'Private Residences',
                subtitle: 'Secluded estates in championship golf enclaves',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                link: '/properties/buy?type=Villa'
              }
            ].map((col) => (
              <Link
                key={col.title}
                to={col.link}
                className="group relative aspect-[4/5] overflow-hidden border border-[#2A2A2D] hover:border-[#C5A880] transition-all flex flex-col justify-end p-8"
              >
                <img
                  src={col.image}
                  alt={col.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover luxury-image-zoom opacity-70 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/40 to-transparent" />

                <div className="relative z-10">
                  <h3 className="font-serif text-2xl font-light text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#A3A3A8] mt-1 font-light">{col.subtitle}</p>
                  <div className="pt-4 mt-4 border-t border-[#2A2A2D] flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#C5A880]">
                    <span>View Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DUBAI MARKET INSIGHTS */}
      {insights.length > 0 && (
        <section className="py-24 bg-[#FDFCF9]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#E5E0D8]">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
                  Market Intelligence
                </span>
                <h2 className="font-serif text-3xl lg:text-4xl text-[#18181A] font-light tracking-tight">
                  Dubai Real Estate Insights
                </h2>
              </div>
              <Link
                to="/insights"
                className="mt-4 md:mt-0 text-xs uppercase tracking-[0.16em] font-medium text-[#18181A] hover:text-[#C5A880] flex items-center gap-1.5 transition-colors"
              >
                <span>Read All Intelligence</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {insights.map((article) => (
                <Link
                  key={article.slug}
                  to={`/insights/${article.slug}`}
                  className="group flex flex-col bg-[#F7F5F0] border border-[#E5E0D8] hover:border-[#C5A880] transition-all overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[#18181A]">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover luxury-image-zoom"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-[#C5A880] font-semibold block mb-2">
                        {article.category}
                      </span>
                      <h3 className="font-serif text-lg text-[#18181A] group-hover:text-[#C5A880] transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="text-xs text-[#71717A] mt-2 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-[#E5E0D8] text-[10px] uppercase tracking-wider text-[#71717A] flex justify-between">
                      <span>{article.readingTimeMinutes} min read</span>
                      <span className="text-[#18181A] group-hover:text-[#C5A880] font-medium">Read Article →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. PRIVATE CONSULTATION CTA SECTION */}
      <section className="py-24 bg-[#18181A] text-[#F7F5F0] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10 space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            Bespoke Client Representation
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-[#F7F5F0]">
            Looking for something exceptional?
          </h2>
          <p className="text-xs sm:text-sm text-[#D5CFC5] max-w-xl mx-auto leading-relaxed font-light">
            Our private client team maintains confidential access to Dubai’s premier off-market residences, private beachfront plots, and penthouse allocations before public release.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-[#C5A880] hover:bg-[#B8976C] text-[#18181A] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-lg flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Speak With a Property Specialist</span>
            </button>
            <Link
              to="/contact"
              className="border border-[#E5E0D8]/40 hover:border-[#C5A880] text-[#F7F5F0] hover:text-[#C5A880] px-8 py-3.5 text-xs font-medium uppercase tracking-[0.16em] transition-all"
            >
              Visit Our DIFC Private Desk
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      <LeadEnquiryModal
        isOpen={Boolean(selectedPropertyForInquiry) || isConsultationModalOpen}
        onClose={() => {
          setSelectedPropertyForInquiry(null);
          setIsConsultationModalOpen(false);
        }}
        property={selectedPropertyForInquiry}
        leadType={selectedPropertyForInquiry ? 'INQUIRY' : 'CONSULTATION'}
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { PropertyCard } from '../../components/property/PropertyCard';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';
import {
  ArrowRight,
  ShieldCheck,
  Calculator,
  KeyRound,
  FileText,
  Handshake,
  Phone,
  MessageSquare,
  Lock,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [advisorServiceTopic, setAdvisorServiceTopic] = useState('General Advisory');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.getFeaturedProperties();
        if (res.properties && res.properties.length > 0) {
          // Show only a small selection (max 3) as per brief item #3
          setFeaturedProperties(res.properties.slice(0, 3));
        } else {
          // Graceful fallback curated sample properties
          setFeaturedProperties([
            {
              _id: 'sample-1',
              title: 'Villa Aurum, Palm Jumeirah',
              slug: 'villa-aurum-palm-jumeirah',
              propertyType: 'Signature Villa',
              purpose: 'SALE',
              community: 'Palm Jumeirah',
              priceAED: 42000000,
              bedrooms: 6,
              bathrooms: 7,
              builtUpAreaSqFt: 11200,
              featuredImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
              isFeatured: true
            },
            {
              _id: 'sample-2',
              title: 'The Sky Duplex Penthouse',
              slug: 'the-sky-duplex-downtown',
              propertyType: 'Penthouse',
              purpose: 'SALE',
              community: 'Downtown Dubai',
              priceAED: 28500000,
              bedrooms: 5,
              bathrooms: 6,
              builtUpAreaSqFt: 7800,
              featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
              isFeatured: true
            },
            {
              _id: 'sample-3',
              title: 'Bulgari Lighthouse Private Residence',
              slug: 'bulgari-lighthouse-jumeira-bay',
              propertyType: 'Branded Residence',
              purpose: 'SALE',
              community: 'Jumeira Bay Island',
              priceAED: 65000000,
              bedrooms: 4,
              bathrooms: 5,
              builtUpAreaSqFt: 9400,
              featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
              isFeatured: true
            }
          ]);
        }
      } catch (err) {
        console.error('Failed to load properties for homepage:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const openAdvisor = (topic: string = 'General Advisory') => {
    setAdvisorServiceTopic(topic);
    setIsAdvisorModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full font-ui bg-[#F7F3EA] text-[#3E4852]">
      {/* 1. HERO IMAGE SECTION (Brief Item #3) */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-[#102A43] text-[#F7F3EA] overflow-hidden pt-24 pb-20">
        {/* Background Image with Deep Navy Grade */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=85"
            alt="Dubai Prime Architecture"
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102A43] via-[#102A43]/70 to-[#102A43]/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 border border-[#B08D57]/40 px-3.5 py-1.5 rounded-full mb-8 bg-[#0B2135]/60 backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-medium">
              Where Summit Meets Shore
            </span>
          </div>

          {/* Headline (Brief Item #3: "Your property, thoughtfully managed.") */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#F7F3EA] leading-[1.08] mb-6">
            Your property, thoughtfully managed.
          </h1>

          {/* Supporting line (Brief Item #3) */}
          <p className="text-base sm:text-lg text-[#E9E1D4] max-w-2xl font-normal leading-relaxed mb-10">
            Exceptional real estate, considered financing and long-term property care for clients in Dubai and around the world.
          </p>

          {/* Buttons: Explore Properties (Warm Ivory filled) | Speak with an Advisor (Champagne Brass outline) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/properties"
              className="w-full sm:w-auto bg-[#F7F3EA] hover:bg-[#FFFDF8] text-[#102A43] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-md text-center"
            >
              Explore Properties
            </Link>
            <button
              onClick={() => openAdvisor('Homepage Hero')}
              className="w-full sm:w-auto border border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#F7F3EA] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all text-center"
            >
              Speak with an Advisor
            </button>
          </div>
        </div>
      </section>

      {/* 2. BUY, RENT AND SELL BUTTONS (Brief Item #3) */}
      <section className="py-16 bg-[#FFFDF8] border-b border-[#E9E1D4]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Buy Card */}
            <Link
              to="/properties/buy"
              className="p-8 bg-[#F7F3EA] border border-[#E9E1D4] hover:border-[#B08D57] transition-all group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
                  Portfolio Acquisition
                </span>
                <h3 className="font-display text-2xl text-[#102A43] group-hover:text-[#B08D57] transition-colors">
                  Buy
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Curated villas, penthouses, and signature architectural residences in Dubai's prime enclaves.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#102A43] group-hover:text-[#B08D57] uppercase tracking-wider">
                <span>View Available Homes</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Rent Card */}
            <Link
              to="/properties/rent"
              className="p-8 bg-[#F7F3EA] border border-[#E9E1D4] hover:border-[#B08D57] transition-all group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
                  Prime Residences
                </span>
                <h3 className="font-display text-2xl text-[#102A43] group-hover:text-[#B08D57] transition-colors">
                  Rent
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Discreet long-term luxury tenancies with institutional lease governance and Ejari management.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#102A43] group-hover:text-[#B08D57] uppercase tracking-wider">
                <span>View Prime Rentals</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            {/* Sell Card */}
            <Link
              to="/properties/sell"
              className="p-8 bg-[#F7F3EA] border border-[#E9E1D4] hover:border-[#B08D57] transition-all group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
                  Private Representation
                </span>
                <h3 className="font-display text-2xl text-[#102A43] group-hover:text-[#B08D57] transition-colors">
                  Sell
                </h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Discreet representation connecting your estate to verified international collectors and family offices.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#102A43] group-hover:text-[#B08D57] uppercase tracking-wider">
                <span>List With Crestshore</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. A SMALL SELECTION OF FEATURED PROPERTIES (Brief Item #3) */}
      <section className="py-24 bg-[#F7F3EA]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-[#E9E1D4] gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-1">
                Editorial Collection
              </span>
              <h2 className="font-display text-3xl sm:text-4xl text-[#102A43] font-light">
                Featured Properties
              </h2>
            </div>
            <Link
              to="/properties"
              className="text-xs uppercase tracking-[0.16em] text-[#102A43] hover:text-[#B08D57] font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>View All Properties</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. MORTGAGE CALCULATOR INVITATION (Brief Item #3) */}
      <section className="py-20 bg-[#FFFDF8] border-y border-[#E9E1D4]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
              Financing Advisory
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#102A43] font-light">
              Considered Property Financing
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Model loan-to-value limits, down payment schedules, and monthly instalments under UAE Central Bank regulations for prime Dubai real estate.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/mortgage"
              className="w-full sm:w-auto bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all text-center shadow-sm"
            >
              Open Mortgage Calculator
            </Link>
            <button
              onClick={() => openAdvisor('Mortgage Financing')}
              className="w-full sm:w-auto border border-[#E9E1D4] hover:border-[#B08D57] bg-[#FFFDF8] text-[#102A43] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all text-center"
            >
              Financing Consultation
            </button>
          </div>
        </div>
      </section>

      {/* 5. PROPERTY CARE MESSAGE (Brief Item #3 & #6) */}
      <section className="py-24 bg-[#102A43] text-[#F7F3EA] border-b border-[#1E3A5F]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-semibold block">
            Enduring Commitment
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-light text-[#F7F3EA] max-w-3xl mx-auto leading-tight">
            “We do not disappear after the transaction.”
          </h2>
          <p className="text-sm sm:text-base text-[#E9E1D4]/90 max-w-2xl mx-auto leading-relaxed font-light">
            Crestshore remains available to help coordinate the practical life of your property — from handover snagging and rental management to preventative maintenance, quarterly inspections, and institutional document safekeeping.
          </p>

          <div className="pt-6">
            <Link
              to="/property-care"
              className="inline-block bg-[#F7F3EA] hover:bg-[#FFFDF8] text-[#102A43] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-md"
            >
              Explore Property Care Services
            </Link>
          </div>
        </div>
      </section>

      {/* 6. PRIVATE CLIENT LOGIN INVITATION (Brief Item #3 & #8) */}
      <section className="py-20 bg-[#F7F3EA] border-b border-[#E9E1D4]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#B08D57]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold">
                Private Client Office
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#102A43] font-light">
              Secure Document Vault & Portfolio Access
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Institutional safekeeping for your Dubai title deeds, Ejari contracts, snagging audits, and Golden Visa documentation. Request care services and view live status updates 24/7.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/private-clients"
              className="w-full sm:w-auto bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all text-center shadow-sm"
            >
              Private Client Office
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto border border-[#E9E1D4] hover:border-[#B08D57] bg-[#FFFDF8] text-[#102A43] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all text-center"
            >
              Client Login
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PARTNER NETWORK INVITATION (Brief Item #3 & #7) */}
      <section className="py-20 bg-[#FFFDF8] border-b border-[#E9E1D4]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <Handshake className="w-4 h-4 text-[#B08D57]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold">
                Partner Network
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-[#102A43] font-light">
              For Wealth Managers & Family Offices
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              Introduce clients with institutional confidence. Submit referrals in under two minutes without disclosing personal contact data upfront, protected by signed master agreements and guaranteed fee splits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/partner-network"
              className="w-full sm:w-auto bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all text-center shadow-sm"
            >
              Partner Portal
            </Link>
            <a
              href="https://wa.me/971501123456?text=Hello%20Crestshore,%20I%20am%20interested%20in%20the%20Partner%20Network."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Leadership</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION (Brief Item #3) */}
      <section className="py-24 bg-[#F7F3EA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B08D57] font-semibold block">
            Direct Private Desk
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#102A43] font-light">
            Speak with Crestshore
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] max-w-xl mx-auto leading-relaxed">
            Whether inquiring on private listings, planning an acquisition, or arranging property care, our senior directors in DIFC are at your disposal.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openAdvisor('Direct Contact Section')}
              className="w-full sm:w-auto bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-sm"
            >
              Speak with an Advisor
            </button>
            <a
              href="https://wa.me/971501123456"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#102A43] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp (+971 50 112 3456)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Universal Advisor Consultation Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService={advisorServiceTopic}
      />
    </div>
  );
};

export default HomePage;

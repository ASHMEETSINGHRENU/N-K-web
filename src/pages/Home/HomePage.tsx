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
          setFeaturedProperties(res.properties.slice(0, 3));
        } else {
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
    <div className="flex flex-col w-full font-ui bg-[#F7F3EA] text-[#3E4852] antialiased">
      {/* ============================================================
          GLOBAL LUXURY STYLES (scoped)
          ============================================================ */}
      <style>{`
        .lux-serif { font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif; }
        .lux-eyebrow {
          font-size: 10px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .lux-hairline {
          background: linear-gradient(90deg, transparent, #B08D57 50%, transparent);
          height: 1px;
        }
        .lux-btn {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .lux-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.9s cubic-bezier(0.22,1,0.36,1);
          z-index: -1;
        }
        .lux-btn:hover::after { transform: translateX(100%); }
        .lux-card {
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.4s, box-shadow 0.5s;
        }
        .lux-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px -30px rgba(16,42,67,0.35);
        }
        .lux-underline {
          background-image: linear-gradient(#B08D57, #B08D57);
          background-size: 0% 1px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          transition: background-size 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .lux-underline:hover { background-size: 100% 1px; }
        @keyframes luxFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lux-fade-up { animation: luxFadeUp 1s cubic-bezier(0.22,1,0.36,1) both; }
        .lux-delay-1 { animation-delay: 0.15s; }
        .lux-delay-2 { animation-delay: 0.3s; }
        .lux-delay-3 { animation-delay: 0.45s; }
      `}</style>

      {/* ============================================================
          1. HERO — editorial, cinematic
          ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#102A43] text-[#F7F3EA] overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=85"
            alt="Dubai Prime Architecture"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#102A43] via-[#102A43]/75 to-[#102A43]" />
          {/* Gold hairline top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B08D57]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
          {/* Eyebrow with flanking rules */}
          <div className="flex items-center gap-4 mb-10 lux-fade-up">
            <span className="hidden sm:block w-10 h-px bg-[#B08D57]/60" />
            <span className="lux-eyebrow text-[#D8C3A5]">Where Summit Meets Shore</span>
            <span className="hidden sm:block w-10 h-px bg-[#B08D57]/60" />
          </div>

          {/* Headline */}
          <h1 className="lux-serif text-[2.6rem] sm:text-6xl lg:text-[5.25rem] font-light tracking-tight text-[#F7F3EA] leading-[1.05] mb-8 lux-fade-up lux-delay-1">
            Your property,
            <br />
            <span className="italic text-[#D8C3A5]">thoughtfully</span> managed.
          </h1>

          {/* Hairline divider */}
          <div className="w-24 lux-hairline my-2 mb-8 lux-fade-up lux-delay-2" />

          {/* Supporting line */}
          <p className="text-base sm:text-lg text-[#E9E1D4] max-w-2xl font-light leading-relaxed mb-12 lux-fade-up lux-delay-2">
            Exceptional real estate, considered financing and long-term property care for clients in Dubai and around the world.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lux-fade-up lux-delay-3">
            <Link
              to="/properties"
              className="lux-btn group w-full sm:w-auto bg-[#F7F3EA] hover:bg-[#FFFDF8] text-[#102A43] px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all shadow-[0_10px_40px_-15px_rgba(176,141,87,0.5)] text-center"
            >
              <span className="inline-flex items-center gap-2">
                Explore Properties
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <button
              onClick={() => openAdvisor('Homepage Hero')}
              className="group w-full sm:w-auto border border-[#B08D57]/70 hover:border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#F7F3EA] px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all text-center"
            >
              Speak with an Advisor
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="lux-eyebrow text-[#D8C3A5] text-[9px]">Scroll</span>
          <span className="w-px h-10 bg-gradient-to-b from-[#B08D57] to-transparent" />
        </div>
      </section>

      {/* ============================================================
          2. BUY / RENT / SELL — three-column editorial
          ============================================================ */}
      <section className="py-24 lg:py-28 bg-[#FFFDF8] border-b border-[#E9E1D4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="lux-eyebrow text-[#B08D57] block mb-4">Our Disciplines</span>
            <h2 className="lux-serif text-3xl sm:text-4xl lg:text-5xl text-[#102A43] font-light">
              A considered approach to every mandate
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                eyebrow: 'Portfolio Acquisition',
                title: 'Buy',
                desc: "Curated villas, penthouses, and signature architectural residences in Dubai's prime enclaves.",
                to: '/properties/buy',
                cta: 'View Available Homes'
              },
              {
                eyebrow: 'Prime Residences',
                title: 'Rent',
                desc: 'Discreet long-term luxury tenancies with institutional lease governance and Ejari management.',
                to: '/properties/rent',
                cta: 'View Prime Rentals'
              },
              {
                eyebrow: 'Private Representation',
                title: 'Sell',
                desc: 'Discreet representation connecting your estate to verified international collectors and family offices.',
                to: '/properties/sell',
                cta: 'List With Crestshore'
              }
            ].map((item, i) => (
              <Link
                key={item.title}
                to={item.to}
                className="lux-card group relative p-10 lg:p-12 bg-[#F7F3EA] border border-[#E9E1D4] hover:border-[#B08D57] flex flex-col justify-between space-y-10 overflow-hidden"
              >
                {/* Corner accent */}
                <div className="absolute top-0 left-0 w-12 h-px bg-[#B08D57] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div className="absolute top-0 left-0 w-px h-12 bg-[#B08D57] origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />

                {/* Number */}
                <span className="absolute top-8 right-8 lux-serif text-4xl text-[#B08D57]/25 group-hover:text-[#B08D57]/60 transition-colors">
                  0{i + 1}
                </span>

                <div className="space-y-4 relative">
                  <span className="lux-eyebrow text-[#B08D57] block">{item.eyebrow}</span>
                  <h3 className="lux-serif text-3xl lg:text-4xl text-[#102A43] group-hover:text-[#B08D57] transition-colors font-light">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-semibold text-[#102A43] group-hover:text-[#B08D57] uppercase tracking-[0.2em] transition-colors">
                  <span>{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. FEATURED PROPERTIES — editorial collection
          ============================================================ */}
      <section className="py-24 lg:py-32 bg-[#F7F3EA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 mb-14 border-b border-[#E9E1D4] gap-6">
            <div className="space-y-3">
              <span className="lux-eyebrow text-[#B08D57] block">Editorial Collection</span>
              <h2 className="lux-serif text-3xl sm:text-4xl lg:text-5xl text-[#102A43] font-light">
                Featured Properties
              </h2>
            </div>
            <Link
              to="/properties"
              className="lux-underline text-[10px] uppercase tracking-[0.22em] text-[#102A43] hover:text-[#B08D57] font-semibold flex items-center gap-2 transition-colors pb-1 self-start sm:self-auto"
            >
              <span>View All Properties</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredProperties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          4. MORTGAGE — split editorial
          ============================================================ */}
      <section className="py-24 lg:py-28 bg-[#FFFDF8] border-y border-[#E9E1D4]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-5">
              <span className="lux-eyebrow text-[#B08D57] block">Financing Advisory</span>
              <h2 className="lux-serif text-3xl sm:text-4xl lg:text-5xl text-[#102A43] font-light leading-tight">
                Considered <span className="italic text-[#B08D57]">Property</span> Financing
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-xl">
                Model loan-to-value limits, down payment schedules, and monthly instalments under UAE Central Bank regulations for prime Dubai real estate.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col gap-3">
              <Link
                to="/mortgage"
                className="lux-btn group w-full bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all text-center shadow-sm"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Calculator className="w-3.5 h-3.5" />
                  Open Mortgage Calculator
                </span>
              </Link>
              <button
                onClick={() => openAdvisor('Mortgage Financing')}
                className="w-full border border-[#E9E1D4] hover:border-[#B08D57] hover:text-[#B08D57] bg-[#FFFDF8] text-[#102A43] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all text-center"
              >
                Financing Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. PROPERTY CARE — pull quote
          ============================================================ */}
      <section className="relative py-28 lg:py-36 bg-[#102A43] text-[#F7F3EA] border-b border-[#1E3A5F] overflow-hidden">
        {/* Decorative gold hairline */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 lux-hairline" />

        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center space-y-8">
          <span className="lux-eyebrow text-[#D8C3A5] block">Enduring Commitment</span>

          <div className="lux-serif text-6xl text-[#B08D57]/40 leading-none">&ldquo;</div>

          <blockquote className="lux-serif text-3xl sm:text-5xl lg:text-[3.5rem] font-light text-[#F7F3EA] leading-[1.15] tracking-tight">
            We do not disappear
            <br />
            <span className="italic text-[#D8C3A5]">after the transaction.</span>
          </blockquote>

          <div className="w-16 lux-hairline mx-auto" />

          <p className="text-sm sm:text-base text-[#E9E1D4]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Crestshore remains available to help coordinate the practical life of your property — from handover snagging and rental management to preventative maintenance, quarterly inspections, and institutional document safekeeping.
          </p>

          <div className="pt-4">
            <Link
              to="/property-care"
              className="lux-btn group inline-flex items-center gap-2 bg-[#F7F3EA] hover:bg-[#FFFDF8] text-[#102A43] px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all shadow-[0_10px_40px_-15px_rgba(176,141,87,0.5)]"
            >
              Explore Property Care
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. PRIVATE CLIENT — split editorial
          ============================================================ */}
      <section className="py-24 lg:py-28 bg-[#F7F3EA] border-b border-[#E9E1D4]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-[#B08D57]" />
                <span className="lux-eyebrow text-[#B08D57]">Private Client Office</span>
              </div>
              <h2 className="lux-serif text-3xl sm:text-4xl lg:text-5xl text-[#102A43] font-light leading-tight">
                Secure Document Vault &amp; <span className="italic text-[#B08D57]">Portfolio Access</span>
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-xl">
                Institutional safekeeping for your Dubai title deeds, Ejari contracts, snagging audits, and Golden Visa documentation. Request care services and view live status updates 24/7.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col gap-3">
              <Link
                to="/private-clients"
                className="lux-btn group w-full bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all text-center shadow-sm"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Private Client Office
                </span>
              </Link>
              <Link
                to="/login"
                className="w-full border border-[#E9E1D4] hover:border-[#B08D57] hover:text-[#B08D57] bg-[#FFFDF8] text-[#102A43] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all text-center"
              >
                Client Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. PARTNER NETWORK — split editorial
          ============================================================ */}
      <section className="py-24 lg:py-28 bg-[#FFFDF8] border-b border-[#E9E1D4]">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <Handshake className="w-4 h-4 text-[#B08D57]" />
                <span className="lux-eyebrow text-[#B08D57]">Partner Network</span>
              </div>
              <h2 className="lux-serif text-3xl sm:text-4xl lg:text-5xl text-[#102A43] font-light leading-tight">
                For Wealth Managers &amp; <span className="italic text-[#B08D57]">Family Offices</span>
              </h2>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-xl">
                Introduce clients with institutional confidence. Submit referrals in under two minutes without disclosing personal contact data upfront, protected by signed master agreements and guaranteed fee splits.
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col gap-3">
              <Link
                to="/partner-network"
                className="lux-btn group w-full bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all text-center shadow-sm"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Partner Portal
                </span>
              </Link>
              <a
                href="https://wa.me/971501123456?text=Hello%20Crestshore,%20I%20am%20interested%20in%20the%20Partner%20Network."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-[#25D366]/60 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white text-[#25D366] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Leadership</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CONTACT — closing editorial
          ============================================================ */}
      <section className="py-28 lg:py-36 bg-[#F7F3EA]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center space-y-7">
          <span className="lux-eyebrow text-[#B08D57] block">Direct Private Desk</span>

          <h2 className="lux-serif text-4xl sm:text-5xl lg:text-6xl text-[#102A43] font-light leading-tight">
            Speak with <span className="italic text-[#B08D57]">Crestshore</span>
          </h2>

          <div className="w-16 lux-hairline mx-auto" />

          <p className="text-sm text-[#6B7280] max-w-xl mx-auto leading-relaxed">
            Whether inquiring on private listings, planning an acquisition, or arranging property care, our senior directors in DIFC are at your disposal.
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openAdvisor('Direct Contact Section')}
              className="lux-btn group w-full sm:w-auto bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all shadow-sm"
            >
              <span className="inline-flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                Speak with an Advisor
              </span>
            </button>
            <a
              href="https://wa.me/971501123456"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#102A43] px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366] group-hover:text-current" />
              <span>WhatsApp (+971 50 112 3456)</span>
            </a>
          </div>
        </div>
      </section>

      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService={advisorServiceTopic}
      />
    </div>
  );
};

export default HomePage;
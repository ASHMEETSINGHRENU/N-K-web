import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { FeaturedCollection } from '../../components/home/FeaturedCollection';
import { SearchHero } from '../../components/search/SearchHero';
import { CoverSlideSequence } from '../../components/home/CoverSlideSequence';
import { DeveloperMarquee } from '../../components/home/DeveloperMarquee';
import { MandatePanels } from '../../components/home/MandatePanels';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';
import { DUBAI_COMMUNITIES } from '@nestandkey/constants';
import palmJumeirah from '../../../assets/landing pages image/palm-jumeirah-atlantis.jpg';
import dubaiMarina from '../../../assets/landing pages image/dubai-marina.jpg';
import houseAdvisory from '../../../assets/landing pages image/house-advisory.jpg';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';

const COMMUNITY_IMAGES: Record<string, string> = {
  'palm-jumeirah': palmJumeirah,
  'emirates-hills': 'https://images.unsplash.com/photo-1538424712534-4a56ef8165bf?auto=format&fit=crop&w=2000&q=85',
  'dubai-marina': dubaiMarina
};

const FEATURED_COMMUNITIES = [
  'palm-jumeirah',
  'downtown-dubai',
  'emirates-hills',
  'dubai-marina'
]
  .map((slug) => DUBAI_COMMUNITIES.find((community) => community.slug === slug))
  .filter((community): community is (typeof DUBAI_COMMUNITIES)[number] => Boolean(community));

const FALLBACK_PROPERTIES = [
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
    featuredImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2000&q=85',
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
    featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
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
    featuredImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    isFeatured: true
  }
];

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
          setFeaturedProperties(FALLBACK_PROPERTIES);
        }
      } catch (err) {
        console.error('Failed to load properties for homepage:', err);
        setFeaturedProperties(FALLBACK_PROPERTIES);
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
      <section className="relative min-h-[100svh] flex items-end bg-[#0B2135] text-[#F7F3EA] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2800&q=85"
          alt="Dubai waterfront skyline at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2135]/80 via-[#0B2135]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/75 via-transparent to-[#0B2135]/30" />

        <div className="relative z-10 w-full px-5 sm:px-10 lg:px-16 pb-28 sm:pb-32 pt-36">
          <p className="crest-kicker text-[#D8C3A5] mb-6">Where Summit Meets Shore</p>
          <h1 className="font-display crest-hero text-[#F7F3EA] max-w-6xl">
            Residences of
            <span className="italic text-[#D8C3A5]"> quiet </span>
            distinction
          </h1>
          <p className="mt-8 max-w-lg text-base sm:text-lg font-light leading-relaxed text-[#E9E1D4]">
            Exceptional real estate, considered financing, and long-term property care for clients in Dubai and around the world.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 bg-[#B08D57] hover:bg-[#9B7A49] text-[#102A43] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors"
            >
              Explore properties
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => openAdvisor('Homepage Hero')}
              className="inline-flex items-center justify-center border border-[#D8C3A5]/80 hover:bg-[#F7F3EA] hover:text-[#102A43] text-[#F7F3EA] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] transition-colors"
            >
              Speak with an Advisor
            </button>
          </div>
        </div>
      </section>

      <section className="relative z-30 -mt-14 bg-[#F7F3EA] px-5 sm:px-10 lg:px-16 pt-8 pb-16 sm:pb-20">
        <div className="max-w-[1440px] mx-auto">
          <SearchHero />
        </div>
      </section>

      <DeveloperMarquee />

      <CoverSlideSequence />

      <MandatePanels />

      <FeaturedCollection isLoading={isLoading} properties={featuredProperties} />

      <section className="relative bg-[#F7F3EA]">
        <div className="px-5 sm:px-10 lg:px-16 pt-16 pb-8">
          <p className="crest-kicker text-[#B08D57] mb-4">Places</p>
          <h2 className="font-display crest-title text-[#102A43]">Communities</h2>
        </div>
        {FEATURED_COMMUNITIES.map((community, index) => (
          <div
            key={community.slug}
            className="community-stick sticky"
            style={{
              top: `calc(5rem + ${index} * 3.5rem)`,
              zIndex: index + 1,
              height: `calc(100svh - 5rem - ${index} * 3.5rem)`
            }}
          >
            <Link
              to={`/communities/${community.slug}`}
              className="group relative flex h-full flex-col overflow-hidden bg-[#102A43] shadow-[0_-28px_50px_-20px_rgba(11,33,53,0.55)]"
            >
              <div className="relative z-10 flex h-14 shrink-0 items-center gap-4 border-b border-[#B08D57]/50 bg-[#0B2135] px-6 sm:px-10 lg:px-16">
                <span className="font-display text-2xl text-[#D8C3A5]">0{index + 1}</span>
                <span className="font-display text-xl sm:text-2xl text-[#F7F3EA]">{community.name}</span>
              </div>
              <div className="relative min-h-0 flex-1">
                <img
                  src={COMMUNITY_IMAGES[community.slug] ?? community.highlightImage}
                  alt={community.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover luxury-image-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/85 via-[#0B2135]/25 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-6 sm:p-12 lg:p-16 text-[#F7F3EA]">
                  <h3 className="font-display text-5xl sm:text-7xl lg:text-8xl max-w-4xl">{community.name}</h3>
                  <p className="mt-5 max-w-md text-base font-light text-[#E9E1D4] leading-relaxed">{community.tagline}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#D8C3A5]">
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>

      <section className="relative z-20 grid grid-cols-1 lg:grid-cols-2 bg-[#FFFDF8]">
        <div className="relative min-h-[80vh] overflow-hidden bg-[#0B2135]">
          <img
            src={houseAdvisory}
            alt="The Dubai Frame overlooking the city"
            loading="lazy"
            className="absolute inset-0 h-full min-h-[80vh] w-full object-cover object-center scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2135]/45 via-transparent to-[#0B2135]/15" />
          <div className="pointer-events-none absolute inset-5 border border-[#D8C3A5]/35 sm:inset-8" />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 sm:px-12 lg:px-20">
          <p className="crest-kicker text-[#B08D57] mb-5">The house</p>
          <h2 className="font-display crest-title text-[#102A43]">
            Advisory that remains after the keys
          </h2>
          <p className="mt-8 max-w-lg text-base font-light leading-relaxed text-[#3E4852]">
            Crestshore advises private clients on acquisition, leasing, financing, and the practical life of a property — handover, rental coordination, inspections, and document safekeeping.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link to="/about" className="inline-flex items-center justify-center bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-7 py-4 text-[12px] uppercase tracking-[0.2em]">
              About Crestshore
            </Link>
            <Link to="/property-care" className="inline-flex items-center justify-center border border-[#E9E1D4] hover:border-[#B08D57] text-[#102A43] px-7 py-4 text-[12px] uppercase tracking-[0.2em]">
              Property care
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 px-5 sm:px-10 lg:px-16">
        <p className="crest-kicker text-[#B08D57] mb-4">Further</p>
        <h2 className="font-display crest-title text-[#102A43] mb-12">Services beside the residence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E9E1D4] border border-[#E9E1D4]">
          {[
            { title: 'Financing', text: 'Model loan-to-value, deposits, and monthly instalments under UAE Central Bank rules.', to: '/mortgage', action: 'Open calculator' },
            { title: 'Private clients', text: 'Portfolio access and safekeeping for title deeds, leases, and supporting documents.', to: '/private-clients', action: 'Open the office' },
            { title: 'Partner network', text: 'A referral desk for wealth managers and family offices, with agreed fee splits.', to: '/partner-network', action: 'Partner portal' }
          ].map((item) => (
            <Link key={item.title} to={item.to} className="group bg-[#FFFDF8] p-8 lg:p-12 flex flex-col min-h-[280px]">
              <h3 className="font-display text-4xl text-[#102A43] group-hover:text-[#B08D57] transition-colors">{item.title}</h3>
              <p className="mt-5 text-sm font-light text-[#6B7280] leading-relaxed flex-1">{item.text}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#102A43]">
                {item.action}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#102A43] text-[#F7F3EA]">
        <img
          src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=2400&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#0B2135]/55" />
        <div className="relative z-10 max-w-3xl px-6 py-24 text-center">
          <p className="crest-kicker text-[#D8C3A5] mb-5">Private desk</p>
          <h2 className="font-display crest-title">Speak with Crestshore</h2>
          <p className="mt-6 text-base font-light text-[#E9E1D4] leading-relaxed">
            Tell us what you are looking for. A director in DIFC will follow up with the next practical step.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openAdvisor('Direct Contact Section')}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#B08D57] hover:bg-[#9B7A49] text-[#102A43] px-8 py-4 text-[12px] uppercase tracking-[0.2em] font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              Speak with an Advisor
            </button>
            <a
              href="https://wa.me/971501123456"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-[#D8C3A5] hover:bg-[#F7F3EA] hover:text-[#102A43] px-8 py-4 text-[12px] uppercase tracking-[0.2em]"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
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

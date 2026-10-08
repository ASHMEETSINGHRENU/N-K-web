import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Compass,
  KeyRound,
  FileText,
  Handshake,
  ArrowRight,
  Sparkles,
  Phone,
  MessageSquare,
  Building2,
  Check,
  Calculator,
  Wrench,
  Users2
} from 'lucide-react';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';

export const AboutPage: React.FC = () => {
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [selectedAdvisorTopic, setSelectedAdvisorTopic] = useState('General Advisory');

  const openAdvisor = (topic: string) => {
    setSelectedAdvisorTopic(topic);
    setIsAdvisorModalOpen(true);
  };

  const teamMembers = [
    {
      title: 'Founder / Principal Advisor',
      role: 'Leadership & Strategy',
      name: 'Tariq Al-Mansoor',
      bio: 'Leads client relationships, acquisition strategy, partner relationships and the overall direction of Crestshore.',
      languages: 'English, Arabic, French',
      markets: 'Dubai (DIFC, Palm Jumeirah, Emirates Hills), International Private Desks',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Property Advisor',
      role: 'Acquisitions & Advisory',
      name: 'Elena Rostova',
      bio: 'Supports property research, private viewings, negotiation and transaction coordination within the relevant market and licensing framework.',
      languages: 'English, Russian',
      markets: 'Palm Jumeirah, Jumeira Bay Island, Downtown Dubai',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Mortgage Advisor / Lending Partner',
      role: 'Financing Desk',
      name: 'Marcus Vance',
      bio: 'Supports financing enquiries, loan-to-value structuring and lender coordination across approved UAE banking partners.',
      languages: 'English',
      markets: 'UAE Central Bank Residential & Commercial Financing',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Property Care Coordinator',
      role: 'Operations & Upkeep',
      name: 'Soraya Haddad',
      bio: 'Coordinates handover, snagging, maintenance, rental and resale support through Crestshore and vetted specialist providers.',
      languages: 'English, Arabic',
      markets: 'Dubai Luxury Residential Estates',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Client Services / Private Office',
      role: 'Vault & Concierge',
      name: 'Julian Sterling',
      bio: 'Supports document organisation, encrypted vault custody, client requests, updates and concierge coordination.',
      languages: 'English, German',
      markets: 'Private Client Office & Document Custody',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Professional Network',
      role: 'Strategic Specialists',
      name: 'Institutional Panel',
      bio: 'CAs, wealth managers, legal, tax, banking, visa, insurance and specialist providers engaged when appropriate under strict discretion.',
      languages: 'Multilingual Global Coverage',
      markets: 'Cross-Border Wealth & Tax Coordination',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="bg-[#F7F3EA] text-[#3E4852] font-ui pt-24 min-h-screen">
      {/* ======================================================== */}
      {/* 1. ABOUT PAGE SECTION (Brief Item #1)                    */}
      {/* ======================================================== */}
      <section className="bg-[#102A43] text-[#F7F3EA] py-20 px-6 lg:px-12 border-b border-[#1E3A5F]">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-semibold block">
            Crestshore Philosophy & Mandate
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-light text-[#F7F3EA] leading-[1.08]">
            A more considered way to own property.
          </h1>
          <p className="text-base sm:text-lg text-[#E9E1D4] leading-relaxed font-light">
            Crestshore is a global real estate and property advisory for private clients, families, investors and trusted professional partners. We help people make thoughtful property decisions in Dubai and across selected international markets—from acquisition and finance to handover, property care, rental, resale and the practical details that follow.
          </p>
        </div>
      </section>

      {/* Narrative & Balance */}
      <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto space-y-8 text-xs sm:text-sm leading-relaxed text-[#3E4852]">
        <div className="p-6 bg-[#FFFDF8] border-l-4 border-l-[#B08D57] border border-[#E9E1D4] space-y-3 shadow-sm">
          <p className="text-sm sm:text-base text-[#102A43] font-normal leading-relaxed">
            We believe a property relationship should not end when a contract is signed. For clients living in Dubai or abroad, we remain a trusted point of contact for the life of the property—coordinating the right people, keeping records organised and helping reduce the everyday burden of ownership.
          </p>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
            <strong className="text-[#102A43]">Where Summit Meets Shore.</strong> is more than a line. It expresses the balance at the centre of Crestshore: ambition with perspective, opportunity with responsibility, and the height of a property decision with the practical care required to sustain it.
          </p>
        </div>

        {/* What We Do */}
        <div className="pt-6 space-y-6">
          <h2 className="font-display text-3xl text-[#102A43]">What we do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-5 space-y-2 shadow-sm">
              <span className="font-display text-lg text-[#102A43] font-semibold block">Acquire</span>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Curated opportunities for buying, investing and building a considered property position.
              </p>
            </div>

            <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-5 space-y-2 shadow-sm">
              <span className="font-display text-lg text-[#102A43] font-semibold block">Advise</span>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Clear guidance shaped around the client’s objectives, circumstances and time horizon.
              </p>
            </div>

            <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-5 space-y-2 shadow-sm">
              <span className="font-display text-lg text-[#102A43] font-semibold block">Finance</span>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Mortgage calculation and coordination with appropriate lending partners, subject to eligibility and applicable requirements.
              </p>
            </div>

            <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-5 space-y-2 shadow-sm">
              <span className="font-display text-lg text-[#102A43] font-semibold block">Care</span>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Handover, snagging, rental, maintenance, documentation and resale coordination through Crestshore and selected providers.
              </p>
            </div>

            <div className="sm:col-span-2 bg-[#FFFDF8] border border-[#E9E1D4] p-5 space-y-2 shadow-sm">
              <span className="font-display text-lg text-[#102A43] font-semibold block">Connect</span>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                A trusted network of brokers, agents, CAs, wealth managers, family offices and specialists working with discretion.
              </p>
            </div>
          </div>
        </div>

        {/* Who We Serve */}
        <div className="pt-6 space-y-3">
          <h2 className="font-display text-3xl text-[#102A43]">Who we serve</h2>
          <p className="text-xs sm:text-sm text-[#3E4852] leading-relaxed">
            Our clients include private individuals, international owners, entrepreneurs, investors, families, family offices and their trusted advisors. We also work with brokers, agents, chartered accountants, wealth managers and other professional partners who value clear communication and long-term relationships.
          </p>
        </div>

        {/* How We Work */}
        <div className="pt-6 space-y-4">
          <h2 className="font-display text-3xl text-[#102A43]">How we work</h2>
          <div className="space-y-2.5">
            {[
              'We listen before we recommend.',
              'We present fewer, better-matched opportunities rather than unnecessary volume.',
              'We communicate clearly and keep commitments visible.',
              'We protect confidentiality and share information on a need-to-know basis.',
              'We stay available after the transaction, when ownership becomes operational.'
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-[#FFFDF8] border border-[#E9E1D4]">
                <Check className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                <span className="text-xs text-[#3E4852] font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Line */}
        <div className="py-8 border-t border-[#E9E1D4] text-center space-y-2">
          <p className="font-display text-xl sm:text-2xl text-[#102A43] italic">
            “Property is not only acquired. It is owned, operated, protected and lived with. Crestshore is here for the journey.”
          </p>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FOUNDER'S VOICE (Brief Item #2)                       */}
      {/* ======================================================== */}
      <section className="py-20 bg-[#FFFDF8] border-y border-[#E9E1D4]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="border-b border-[#E9E1D4] pb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-1">
              Founder’s Voice
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#102A43]">
              A personal commitment to how property should be handled.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-5 text-xs sm:text-sm text-[#3E4852] leading-relaxed">
              <p>
                I created Crestshore with a simple belief: property advice should feel more personal, more considered and more dependable.
              </p>
              <p>
                A property decision is rarely only a transaction. It can involve a family, a portfolio, a new chapter, or a long-term responsibility—especially when the owner lives in another country.
              </p>
              <p>
                My role is to understand what matters to each client, identify the right opportunities and remain involved beyond the signing. That may mean helping coordinate a purchase, arranging mortgage support, following a handover, addressing snagging, preparing a property for rental or supporting a future resale.
              </p>
              <p>
                I do not believe in disappearing after completion. Crestshore is designed to be a trusted point of contact in Dubai for private clients, families, family offices and professional partners. We work with a selected network where specialist involvement is required, while keeping communication clear and responsibility visible.
              </p>
              <p>
                Our ambition is not to become the loudest name in property. It is to become the name people trust when the decision matters and the relationship needs to last.
              </p>

              {/* Founder Signature Block */}
              <div className="pt-6 border-t border-[#E9E1D4] space-y-1">
                <span className="font-display text-xl text-[#102A43] font-medium block">
                  Tariq Al-Mansoor
                </span>
                <span className="text-xs text-[#B08D57] block font-semibold">Founder, Crestshore</span>
                <span className="text-[11px] text-[#6B7280] block">
                  Where Summit Meets Shore. • Global real estate & wealth advisory
                </span>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#F7F3EA] border border-[#E9E1D4] p-5 text-center space-y-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                alt="Tariq Al-Mansoor - Founder"
                className="w-32 h-32 rounded-full object-cover mx-auto border-2 border-[#B08D57]"
              />
              <div>
                <h4 className="font-display text-lg text-[#102A43]">Tariq Al-Mansoor</h4>
                <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block">
                  Founder & Principal Advisor
                </span>
              </div>
              <button
                onClick={() => openAdvisor('Founder Direct Conversation')}
                className="w-full bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] py-2 text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Speak with Tariq
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. MEET THE TEAM (Brief Item #3)                         */}
      {/* ======================================================== */}
      <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
            Founder-Led Approach & Specialist Network
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#102A43]">
            Meet the team
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
            Crestshore is led with a direct, founder-led approach and supported by a trusted network of specialists. Our clients benefit from one clear relationship, with the right expertise brought in when required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm flex flex-col justify-between space-y-6 hover:border-[#B08D57]/60 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border border-[#B08D57]"
                  />
                  <div>
                    <h3 className="font-display text-xl text-[#102A43]">{member.name}</h3>
                    <span className="text-[11px] text-[#B08D57] font-semibold block">{member.title}</span>
                    <span className="text-[10px] text-[#6B7280]">{member.role}</span>
                  </div>
                </div>

                <p className="text-xs text-[#3E4852] leading-relaxed">
                  {member.bio}
                </p>

                <div className="pt-3 border-t border-[#E9E1D4] space-y-1 text-[11px] text-[#6B7280]">
                  <div><strong className="text-[#102A43]">Languages:</strong> {member.languages}</div>
                  <div><strong className="text-[#102A43]">Markets:</strong> {member.markets}</div>
                </div>
              </div>

              <button
                onClick={() => openAdvisor(`Consultation with ${member.name}`)}
                className="w-full bg-[#F7F3EA] hover:bg-[#102A43] hover:text-[#FFFDF8] text-[#102A43] py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors text-center"
              >
                Speak with {member.name.split(' ')[0]}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Universal Advisor Consultation Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService={selectedAdvisorTopic}
      />
    </div>
  );
};

export default AboutPage;

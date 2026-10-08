import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  FileCheck,
  KeyRound,
  Wrench,
  Eye,
  TrendingUp,
  FolderLock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';

export const PropertyCarePage: React.FC = () => {
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Handover & Snagging');

  const services = [
    {
      id: 'handover-snagging',
      title: 'Handover & Snagging',
      subtitle: 'Rigorous architectural inspection prior to key handover',
      description:
        'Our certified engineers inspect every millimeter of your developer handover. From MEP systems and thermal isolation to marble finishes, joinery alignment, and paint quality, we log developer rectifications before you sign acceptance.',
      icon: FileCheck,
      details: [
        'Full 400-point developer architectural audit',
        'Formal snagging report submitted directly to developer',
        'De-snagging reinspection prior to final title release',
        'Utility connection & DEWA activation coordination'
      ]
    },
    {
      id: 'rental-coordination',
      title: 'Rental Coordination',
      subtitle: 'Discreet tenant placement and lease governance',
      description:
        'Protect your yield without day-to-day administrative burdens. We curate qualified high-net-worth tenants, execute compliant Dubai Ejari contracts, collect rental cheques, and manage tenancy transitions seamlessly.',
      icon: KeyRound,
      details: [
        'Vetted tenant qualification & background verification',
        'Official Dubai Land Department Ejari contract registration',
        'Security deposit escrow & rental cheque management',
        'Tenancy renewal negotiations & rent index adjustments'
      ]
    },
    {
      id: 'maintenance-coordination',
      title: 'Maintenance Coordination',
      subtitle: 'Vetted luxury contractors & 24/7 preventative upkeep',
      description:
        'Dubai’s climate requires specialized care. We oversee vetted specialists for central chiller systems, private pools, landscaping, facade cleaning, smart home automation, and emergency repairs.',
      icon: Wrench,
      details: [
        'Vetted luxury maintenance service providers',
        'Quarterly preventative HVAC & MEP diagnostics',
        'Direct emergency dispatch hotline for your residence',
        'Transparent contractor quotes & oversight'
      ]
    },
    {
      id: 'property-inspections',
      title: 'Property Inspections',
      subtitle: 'Periodic photographic audits for overseas owners',
      description:
        'Whether your residence is rented or vacant while you travel, receive structured quarterly condition audits with high-resolution photography, inventory checks, and structural verification.',
      icon: Eye,
      details: [
        'Comprehensive photographic condition reports',
        'Inventory audits for furnished luxury residences',
        'Vacant residence security and air-circulation checks',
        'Direct upload to your Private Client Document Vault'
      ]
    },
    {
      id: 'resale-preparation',
      title: 'Resale Preparation',
      subtitle: 'Capital appreciation optimization & staging',
      description:
        'When the time arrives to reposition your capital, we prepare your estate for maximum market value. From bespoke interior staging and minor cosmetic enhancements to professional videography and off-market positioning.',
      icon: TrendingUp,
      details: [
        'Comprehensive valuation & comparative market analysis',
        'Interior styling, touch-up painting & landscape enhancement',
        'Cinematic architectural photography & floor plan drafting',
        'Discreet off-market or global marketing launch'
      ]
    },
    {
      id: 'document-management',
      title: 'Document Management',
      subtitle: 'Institutional safekeeping of titles, leases, and warranties',
      description:
        'Every title deed, developer sales agreement, mortgage statement, warranty document, and service contract is digitally cataloged, backed up, and securely accessible 24/7 in your Private Client Office.',
      icon: FolderLock,
      details: [
        'Encrypted cloud storage with 8 category classifications',
        'Title deed, Oqood & SPA digital archival',
        'Builder warranty & equipment manual tracking',
        'One-click download for tax, banking, or legal filings'
      ]
    }
  ];

  return (
    <div className="bg-[#F7F3EA] text-[#3E4852] font-ui pt-24">
      {/* 1. Header Banner */}
      <section className="bg-[#102A43] text-[#F7F3EA] py-20 px-6 lg:px-12 border-b border-[#1E3A5F]">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-mono font-semibold">
            Long-Term Asset Management
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-light text-[#F7F3EA] tracking-tight">
            Property Care
          </h1>
          <p className="font-display text-xl sm:text-2xl text-[#E9E1D4] font-normal italic max-w-3xl mx-auto leading-relaxed pt-2">
            “We do not disappear after the transaction. Crestshore remains available to help coordinate the practical life of your property.”
          </p>
          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setSelectedService('General Property Care');
                setIsAdvisorModalOpen(true);
              }}
              className="px-6 py-3 bg-[#B08D57] hover:bg-[#A07D48] text-[#102A43] text-xs uppercase tracking-wider font-semibold transition-all shadow-md"
            >
              Speak with a Property Care Advisor
            </button>
            <Link
              to="/private-clients"
              className="px-6 py-3 border border-[#E9E1D4]/40 hover:bg-[#1E3A5F] text-[#F7F3EA] text-xs uppercase tracking-wider font-semibold transition-all"
            >
              Access Client Document Vault
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Core Services Grid (Six Services) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-mono font-semibold">
            Six Comprehensive Pillars
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[#102A43] font-light">
            Enduring Support for Dubai Real Estate
          </h2>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            From final key handover through decades of tenancy and capital appreciation, our private desk protects your asset.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 flex flex-col justify-between hover:border-[#B08D57] transition-all shadow-sm group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-sm bg-[#F7F3EA] border border-[#E9E1D4] text-[#102A43] flex items-center justify-center group-hover:bg-[#102A43] group-hover:text-[#D8C3A5] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-[#102A43] font-normal group-hover:text-[#B08D57] transition-colors">
                      {svc.title}
                    </h3>
                    <span className="text-[11px] text-[#B08D57] font-mono font-medium block mt-1">
                      {svc.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-[#3E4852] leading-relaxed">
                    {svc.description}
                  </p>

                  <div className="pt-4 border-t border-[#E9E1D4] space-y-2">
                    {svc.details.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-[#6B7280]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5D7A65] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E9E1D4]">
                  <button
                    onClick={() => {
                      setSelectedService(svc.title);
                      setIsAdvisorModalOpen(true);
                    }}
                    className="w-full py-2.5 bg-[#F7F3EA] hover:bg-[#102A43] text-[#102A43] hover:text-[#FFFDF8] text-[11px] uppercase tracking-wider font-semibold transition-all border border-[#E9E1D4] flex items-center justify-center gap-1.5"
                  >
                    <span>Request {svc.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B08D57]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Reassurance & Founder Commitment Banner */}
      <section className="bg-[#FFFDF8] border-t border-b border-[#E9E1D4] py-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-mono font-semibold">
              Discreet Wealth Governance
            </span>
            <h3 className="font-display text-2xl text-[#102A43]">
              Need specialized assistance for your Dubai residence?
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-xl">
              Connect with our dedicated Property Care coordinator. Whether you reside locally or in London, Singapore, or New York, your residence is thoughtfully attended to.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedService('Custom Property Care Inquiry');
              setIsAdvisorModalOpen(true);
            }}
            className="px-6 py-3.5 bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] text-xs uppercase tracking-wider font-semibold transition-all shadow-sm shrink-0"
          >
            Speak with an Advisor
          </button>
        </div>
      </section>

      {/* Advisor Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        defaultTopic={`Property Care: ${selectedService}`}
      />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Lock, Building2, Check, ArrowRight } from 'lucide-react';

export const LegalPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'privacy';

  const setTab = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen font-ui text-[#3E4852]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 space-y-10">
        {/* Header */}
        <div className="border-b border-[#E9E1D4] pb-6 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B08D57] font-semibold block">
            Crestshore Governance & Compliance
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-[#102A43] font-normal">
            Legal & Regulatory Disclosures
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed max-w-2xl">
            Crestshore operates as an authorized real estate and private advisory practice adhering to strict regulatory frameworks in the Emirate of Dubai and international governance standards.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-[#E9E1D4] gap-2 overflow-x-auto pb-px">
          {[
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms of Advisory' },
            { id: 'regulatory', label: 'Legal & Regulatory Information' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`px-5 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 whitespace-nowrap transition-all ${
                currentTab === tab.id
                  ? 'border-[#B08D57] text-[#102A43] bg-[#FFFDF8]'
                  : 'border-transparent text-[#6B7280] hover:text-[#102A43]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Privacy Policy */}
        {currentTab === 'privacy' && (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm space-y-6 text-xs leading-relaxed">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E9E1D4]">
              <Lock className="w-5 h-5 text-[#B08D57]" />
              <h2 className="font-display text-2xl text-[#102A43]">Privacy & Data Governance</h2>
            </div>

            <div className="space-y-4">
              <p>
                At Crestshore, confidentiality is central to our advisory practice. We serve private individuals, families, family offices, and professional partners where discretion is non-negotiable.
              </p>
              <h3 className="font-semibold text-sm text-[#102A43]">1. Regulatory Alignment</h3>
              <p>
                Our privacy framework complies with the Dubai International Financial Centre (DIFC) Data Protection Law No. 5 of 2020 and UAE Federal Decree-Law No. 45 of 2021 regarding Personal Data Protection (PDPL).
              </p>

              <h3 className="font-semibold text-sm text-[#102A43]">2. Information We Collect</h3>
              <p>
                We collect personal information necessary to facilitate real estate advisory, property acquisition, conveyance, property care, and partner collaboration:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#6B7280]">
                <li>Contact details (name, electronic mail, telephone, geographic jurisdiction).</li>
                <li>Property preferences, investment mandates, and acquisition criteria.</li>
                <li>Documentation required for Know-Your-Customer (KYC) and Anti-Money Laundering (AML) verifications as required by UAE law.</li>
                <li>Referral and transaction records maintained in our secure, partner-specific registry.</li>
              </ul>

              <h3 className="font-semibold text-sm text-[#102A43]">3. How Your Information is Shared</h3>
              <p>
                We do not sell, rent, or commercialize your personal information. Information is shared strictly on a need-to-know basis with:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#6B7280]">
                <li>Directly assigned Crestshore advisors responsible for your mandate.</li>
                <li>Selected lending partners, conveyancers, or property care providers with your explicit consent.</li>
                <li>Regulatory bodies when compelled by statutory UAE legislation.</li>
              </ul>

              <h3 className="font-semibold text-sm text-[#102A43]">4. Data Security & Electronic Vault</h3>
              <p>
                Client records and agreements are stored using enterprise encryption. Access to our Private Client document repository is restricted to authorized principals and audited regularly.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Terms of Advisory */}
        {currentTab === 'terms' && (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm space-y-6 text-xs leading-relaxed">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E9E1D4]">
              <FileText className="w-5 h-5 text-[#B08D57]" />
              <h2 className="font-display text-2xl text-[#102A43]">Terms of Advisory & Platform Use</h2>
            </div>

            <div className="space-y-4">
              <p>
                By accessing this website or engaging Crestshore advisory services, you accept and agree to be bound by these terms.
              </p>

              <h3 className="font-semibold text-sm text-[#102A43]">1. Nature of Services</h3>
              <p>
                Crestshore provides real estate advisory, transaction coordination, property care coordination, and partner networking services. Crestshore is not an institutional bank, registered broker-dealer, or tax advisory firm; specialist financial or legal advice should be sought independently from qualified professionals.
              </p>

              <h3 className="font-semibold text-sm text-[#102A43]">2. Mortgage & Financing Estimates</h3>
              <p className="p-4 bg-[#F7F3EA] border-l-4 border-l-[#B08D57] text-[#102A43] font-medium">
                Our mortgage calculation tools and estimates are indicative only and do not constitute a formal loan offer, pre-approval, guarantee, or financial advice. All financing terms are subject to formal underwriting by licensed UAE lending partners.
              </p>

              <h3 className="font-semibold text-sm text-[#102A43]">3. Partner Agreements & Digital Signatures</h3>
              <p>
                Partner relationships, commission schedules, and commercial arrangements are governed exclusively by partner-specific agreements uploaded by Crestshore and formally accepted online. Digital sign-offs and timestamps comply with UAE Federal Decree-Law No. 46 of 2021 on Electronic Transactions and Trust Services.
              </p>

              <h3 className="font-semibold text-sm text-[#102A43]">4. Property Availability</h3>
              <p>
                Property listings, valuations, and availability are subject to prior transaction, market fluctuations, and developer updates. Crestshore reserves the right to withdraw listings without prior notice.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Regulatory Information */}
        {currentTab === 'regulatory' && (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm space-y-6 text-xs leading-relaxed">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E9E1D4]">
              <Building2 className="w-5 h-5 text-[#B08D57]" />
              <h2 className="font-display text-2xl text-[#102A43]">Regulatory Information & Licensing</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#B08D57] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#102A43] block text-sm">Dubai RERA Compliance</span>
                  <span className="text-[#6B7280]">
                    Licensed by the Dubai Real Estate Regulatory Agency (RERA), Land Department, Government of Dubai. ORN: 28941.
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-sm text-[#102A43]">Jurisdiction & Domicile</h3>
              <p>
                Crestshore Luxury Real Estate LLC is incorporated in Dubai, United Arab Emirates, with corporate headquarters situated at Level 42, ICD Brookfield Place, DIFC, Dubai, UAE. Tax Registration Number (TRN): 100293848100003.
              </p>

              <h3 className="font-semibold text-sm text-[#102A43]">Advertising Standards & Permits</h3>
              <p>
                All property advertisements, listings, and marketing materials strictly follow the Dubai Land Department (DLD) electronic advertising guidelines, incorporating Trakheesi permits and developer project verifications where mandated.
              </p>

              <h3 className="font-semibold text-sm text-[#102A43]">Anti-Money Laundering (AML) Compliance</h3>
              <p>
                In compliance with UAE Cabinet Decision No. 10 of 2019 and relevant ministerial resolutions, Crestshore enforces thorough AML and Counter-Terrorism Financing checks on all property acquisitions and financial transactions.
              </p>

              <div className="pt-4 border-t border-[#E9E1D4]">
                <p className="text-[#6B7280]">
                  For regulatory queries or formal compliance correspondence, please direct inquiries to{' '}
                  <a href="mailto:private@crestshore.co" className="text-[#102A43] underline font-semibold">
                    private@crestshore.co
                  </a>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back navigation */}
        <div className="pt-4 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#102A43] hover:text-[#B08D57] font-semibold transition-colors"
          >
            <span>Have a compliance or private inquiry? Speak with our desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;

import React, { useState } from 'react';
import { MortgageCalculatorWidget } from '../../components/forms/MortgageCalculatorWidget';
import { ShieldCheck, FileText, Check, Phone, Info } from 'lucide-react';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';

export const MortgagePage: React.FC = () => {
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);

  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen font-ui">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-6 border-b border-[#E9E1D4] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-2">
              Private Wealth Advisory
            </span>
            <h1 className="font-display text-4xl lg:text-5xl text-[#102A43] font-normal">
              Dubai Mortgage Calculator
            </h1>
            <p className="text-xs text-[#6B7280] mt-2 max-w-xl">
              Model property purchase financing, loan-to-value limits, down payment schedules, and statutory DLD acquisition costs.
            </p>
          </div>

          <button
            onClick={() => setIsAdvisorModalOpen(true)}
            className="border border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#102A43] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors self-start md:self-auto"
          >
            Speak with an Advisor
          </button>
        </div>

        {/* Mortgage Calculator Widget */}
        <MortgageCalculatorWidget
          initialPriceAED={28000000}
          onEnquire={() => setIsAdvisorModalOpen(true)}
        />

        {/* Mandatory Legal Disclaimer (Brief Item #5) */}
        <div className="mt-8 p-4 bg-[#FFFDF8] border border-[#E9E1D4] flex items-start gap-3 text-xs text-[#6B7280]">
          <Info className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#102A43]">Legal Disclaimer:</strong> This calculator is an estimate only and is not an approval, offer, financial recommendation or guarantee.
          </p>
        </div>

        {/* Regulatory Guidance Accordion / Notes */}
        <div className="mt-12 pt-10 border-t border-[#E9E1D4] grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#3E4852]">
          <div className="p-6 bg-[#FFFDF8] border border-[#E9E1D4]">
            <ShieldCheck className="w-5 h-5 text-[#B08D57] mb-3" />
            <h4 className="font-display text-lg text-[#102A43] mb-2 font-normal">UAE Central Bank Caps</h4>
            <p className="leading-relaxed text-[#6B7280]">
              Under UAE central bank rules, non-residents and expatriates can finance up to 80% for properties, and up to 70% for properties exceeding AED 5M.
            </p>
          </div>

          <div className="p-6 bg-[#FFFDF8] border border-[#E9E1D4]">
            <FileText className="w-5 h-5 text-[#B08D57] mb-3" />
            <h4 className="font-display text-lg text-[#102A43] mb-2 font-normal">Statutory DLD Fees</h4>
            <p className="leading-relaxed text-[#6B7280]">
              Dubai Land Department (DLD) levies a standard 4% transfer fee payable upon registration, in addition to nominal administrative registration trustee charges.
            </p>
          </div>

          <div className="p-6 bg-[#FFFDF8] border border-[#E9E1D4]">
            <Check className="w-5 h-5 text-[#B08D57] mb-3" />
            <h4 className="font-display text-lg text-[#102A43] mb-2 font-normal">Pre-Approval Assistance</h4>
            <p className="leading-relaxed text-[#6B7280]">
              Our in-house financing desk coordinates expedited pre-approvals across tier-1 UAE financial institutions including Emirates NBD, FAB, and HSBC.
            </p>
          </div>
        </div>
      </div>

      {/* Universal Advisor Consultation Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService="Mortgage Financing Consultation"
      />
    </div>
  );
};

export default MortgagePage;

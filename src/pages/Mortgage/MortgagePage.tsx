import React from 'react';
import { MortgageCalculatorWidget } from '../../components/forms/MortgageCalculatorWidget';
import { ShieldCheck, HelpCircle, FileText, Check } from 'lucide-react';

export const MortgagePage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="mb-12 pb-6 border-b border-[#E5E0D8]">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
            Private Wealth Advisory
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-[#18181A] font-light">
            Dubai Prime Mortgage Simulator
          </h1>
          <p className="text-xs text-[#71717A] mt-2 max-w-xl">
            Simulate monthly instalments, Loan-to-Value (LTV) limits, and statutory acquisition costs for Dubai residential purchases.
          </p>
        </div>

        <MortgageCalculatorWidget initialPriceAED={28000000} />

        {/* Regulatory Guidance Accordion / Notes */}
        <div className="mt-16 pt-12 border-t border-[#E5E0D8] grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#3E3E42]">
          <div className="p-6 bg-[#F7F5F0] border border-[#E5E0D8]">
            <ShieldCheck className="w-5 h-5 text-[#C5A880] mb-3" />
            <h4 className="font-serif text-lg text-[#18181A] mb-2 font-medium">UAE Central Bank Caps</h4>
            <p className="leading-relaxed text-[#71717A]">
              Under UAE central bank rules, non-residents and expatriates can finance up to 80% for properties under AED 5M, and up to 70% for properties exceeding AED 5M.
            </p>
          </div>

          <div className="p-6 bg-[#F7F5F0] border border-[#E5E0D8]">
            <FileText className="w-5 h-5 text-[#C5A880] mb-3" />
            <h4 className="font-serif text-lg text-[#18181A] mb-2 font-medium">Statutory DLD Fees</h4>
            <p className="leading-relaxed text-[#71717A]">
              Dubai Land Department (DLD) levies a standard 4% transfer fee payable upon registration, in addition to nominal administrative registration trustee charges.
            </p>
          </div>

          <div className="p-6 bg-[#F7F5F0] border border-[#E5E0D8]">
            <Check className="w-5 h-5 text-[#C5A880] mb-3" />
            <h4 className="font-serif text-lg text-[#18181A] mb-2 font-medium">Pre-Approval Assistance</h4>
            <p className="leading-relaxed text-[#71717A]">
              Our in-house financing desk coordinates expedited pre-approvals across tier-1 UAE financial institutions including Emirates NBD, FAB, and HSBC.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

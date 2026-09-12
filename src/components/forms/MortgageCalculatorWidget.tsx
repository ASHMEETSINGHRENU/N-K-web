import React, { useState } from 'react';
import { calculateDubaiMortgage, formatAED } from '@nestandkey/utils';
import { Calculator, Shield, HelpCircle } from 'lucide-react';

interface MortgageCalculatorWidgetProps {
  initialPriceAED?: number;
}

export const MortgageCalculatorWidget: React.FC<MortgageCalculatorWidgetProps> = ({
  initialPriceAED = 25000000
}) => {
  const [propertyPrice, setPropertyPrice] = useState(initialPriceAED);
  const [downPaymentPct, setDownPaymentPct] = useState(25);
  const [interestRate, setInterestRate] = useState(4.25);
  const [loanTermYears, setLoanTermYears] = useState(25);

  const calc = calculateDubaiMortgage({
    propertyPrice,
    downPaymentPercent: downPaymentPct,
    interestRate,
    loanTermYears
  });

  return (
    <div className="bg-[#FDFCF9] border border-[#E5E0D8] p-6 lg:p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-[#C5A880]" />
        <div>
          <h3 className="font-serif text-2xl font-light text-[#18181A]">UAE Mortgage Calculator</h3>
          <p className="text-[11px] uppercase tracking-wider text-[#71717A]">
            UAE Central Bank Residential Financing Guidelines
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders and Controls */}
        <div className="lg:col-span-7 space-y-5 text-xs">
          {/* Property Price */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#71717A] font-medium">
                Property Price (AED)
              </span>
              <span className="font-serif text-base font-semibold text-[#18181A]">
                {formatAED(propertyPrice)}
              </span>
            </div>
            <input
              type="range"
              min={2000000}
              max={150000000}
              step={500000}
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#71717A] font-medium">
                Down Payment ({downPaymentPct}%)
              </span>
              <span className="font-serif text-base font-semibold text-[#18181A]">
                {formatAED(calc.downPaymentAmount)}
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={70}
              step={5}
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full accent-[#C5A880] cursor-pointer"
            />
            <span className="text-[10px] text-[#71717A] mt-1 block">
              * Minimum 20% down payment required by UAE Central Bank for properties under AED 5M.
            </span>
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] uppercase tracking-wider text-[#71717A] font-medium">
                  Interest Rate
                </span>
                <span className="font-medium text-[#18181A]">{interestRate}%</span>
              </div>
              <input
                type="number"
                step="0.05"
                min="1"
                max="12"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] uppercase tracking-wider text-[#71717A] font-medium">
                  Loan Tenure
                </span>
                <span className="font-medium text-[#18181A]">{loanTermYears} Years</span>
              </div>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years (Max UAE)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-[#18181A] text-[#F7F5F0] p-6 border border-[#2A2A2D]">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-semibold block mb-1">
            Estimated Monthly Instalment
          </span>
          <div className="font-serif text-3xl lg:text-4xl text-[#C5A880] font-medium tracking-tight mb-4">
            {formatAED(calc.monthlyPayment)}
            <span className="text-xs text-[#A3A3A8] font-sans ml-1">/ month</span>
          </div>

          <div className="space-y-2.5 text-xs pt-4 border-t border-[#2A2A2D]">
            <div className="flex justify-between text-[#A3A3A8]">
              <span>Loan Amount:</span>
              <span className="text-[#F7F5F0] font-medium">{formatAED(calc.loanAmount)}</span>
            </div>
            <div className="flex justify-between text-[#A3A3A8]">
              <span>Total Interest Payable:</span>
              <span className="text-[#F7F5F0] font-medium">{formatAED(calc.totalInterest)}</span>
            </div>
            <div className="flex justify-between text-[#A3A3A8]">
              <span>DLD 4% Transfer Fee:</span>
              <span className="text-[#F7F5F0] font-medium">{formatAED(calc.dldFeeAED)}</span>
            </div>
            <div className="flex justify-between text-[#A3A3A8]">
              <span>Agency 2% + VAT:</span>
              <span className="text-[#F7F5F0] font-medium">{formatAED(calc.agencyFeeAED)}</span>
            </div>
            <div className="flex justify-between text-[#C5A880] font-semibold pt-2 border-t border-[#2A2A2D]">
              <span>Initial Cash Required:</span>
              <span>{formatAED(calc.totalUpfrontCashNeeded)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

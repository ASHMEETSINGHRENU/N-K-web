import React, { useState } from 'react';
import { calculateDubaiMortgage, formatAED } from '@nestandkey/utils';
import { Calculator } from 'lucide-react';

interface MortgageCalculatorWidgetProps {
  initialPriceAED?: number;
  onEnquire?: () => void;
}

export const MortgageCalculatorWidget: React.FC<MortgageCalculatorWidgetProps> = ({
  initialPriceAED = 25000000,
  onEnquire
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
    <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 lg:p-8 shadow-sm font-ui">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#102A43] text-[#D8C3A5] flex items-center justify-center shrink-0">
          <Calculator className="w-5 h-5 text-[#B08D57]" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-normal text-[#102A43]">UAE Mortgage Calculator</h3>
          <p className="text-[11px] uppercase tracking-wider text-[#6B7280]">
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
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium">
                Property Price (AED)
              </span>
              <span className="font-display text-lg font-semibold text-[#102A43]">
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
              className="w-full accent-[#B08D57] cursor-pointer"
            />
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium">
                Down Payment ({downPaymentPct}%)
              </span>
              <span className="font-display text-lg font-semibold text-[#102A43]">
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
              className="w-full accent-[#B08D57] cursor-pointer"
            />
            <span className="text-[10px] text-[#6B7280] mt-1 block">
              * Minimum 20% down payment required by UAE Central Bank for properties under AED 5M.
            </span>
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium">
                  Interest Rate
                </span>
                <span className="font-medium text-[#102A43]">{interestRate}%</span>
              </div>
              <input
                type="number"
                step="0.05"
                min="1"
                max="12"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium">
                  Loan Tenure
                </span>
                <span className="font-medium text-[#102A43]">{loanTermYears} Years</span>
              </div>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
              >
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={25}>25 Years (Max UAE)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card - Deep Navy #102A43, no black */}
        <div className="lg:col-span-5 bg-[#102A43] text-[#F7F3EA] p-6 border border-[#1E3A5F] shadow-sm">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8C3A5] font-semibold block mb-1">
            Estimated Monthly Instalment
          </span>
          <div className="font-display text-3xl lg:text-4xl text-[#D8C3A5] font-normal tracking-tight mb-4">
            {formatAED(calc.monthlyPayment)}
            <span className="text-xs text-[#E9E1D4]/70 font-ui ml-1">/ month</span>
          </div>

          <div className="space-y-2.5 text-xs pt-4 border-t border-[#1E3A5F]">
            <div className="flex justify-between text-[#E9E1D4]/80">
              <span>Loan Amount:</span>
              <span className="text-[#FFFDF8] font-medium">{formatAED(calc.loanAmount)}</span>
            </div>
            <div className="flex justify-between text-[#E9E1D4]/80">
              <span>Total Interest Payable:</span>
              <span className="text-[#FFFDF8] font-medium">{formatAED(calc.totalInterest)}</span>
            </div>
            <div className="flex justify-between text-[#E9E1D4]/80">
              <span>DLD 4% Transfer Fee:</span>
              <span className="text-[#FFFDF8] font-medium">{formatAED(calc.dldFeeAED)}</span>
            </div>
            <div className="flex justify-between text-[#E9E1D4]/80">
              <span>Agency 2% + VAT:</span>
              <span className="text-[#FFFDF8] font-medium">{formatAED(calc.agencyFeeAED)}</span>
            </div>
            <div className="flex justify-between text-[#D8C3A5] font-semibold pt-2 border-t border-[#1E3A5F]">
              <span>Initial Cash Required:</span>
              <span>{formatAED(calc.totalUpfrontCashNeeded)}</span>
            </div>
          </div>

          {onEnquire && (
            <div className="mt-5 pt-4 border-t border-[#1E3A5F]">
              <button
                type="button"
                onClick={onEnquire}
                className="w-full bg-[#B08D57] hover:bg-[#D8C3A5] text-[#102A43] py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors text-center"
              >
                Submit Mortgage Enquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

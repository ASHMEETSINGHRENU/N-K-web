import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const MANDATES = [
  {
    index: '01',
    title: 'Buy',
    line: 'A residence, chosen',
    desc: 'Villas, penthouses, and signature homes in Dubai’s prime enclaves, presented with patience rather than noise.',
    to: '/properties/buy',
    image: 'https://plus.unsplash.com/premium_photo-1661877049198-e81833f96f6d?auto=format&fit=crop&w=2000&q=85'
  },
  {
    index: '02',
    title: 'Rent',
    line: 'A tenancy, arranged',
    desc: 'Long-term luxury leases with discreet coordination, from the first viewing through to Ejari.',
    to: '/properties/rent',
    image: 'https://images.unsplash.com/photo-1653972233678-5d1c28d2a99f?auto=format&fit=crop&w=2000&q=85'
  },
  {
    index: '03',
    title: 'Sell',
    line: 'A private representation',
    desc: 'For families, collectors, and family offices who prefer the sale to remain quiet.',
    to: '/properties/sell',
    image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?auto=format&fit=crop&w=2000&q=85'
  }
];

export const MandatePanels: React.FC = () => {
  return (
    <section aria-label="Buy, rent, or sell" className="bg-[#0B2135]">
      <div className="flex flex-col lg:h-[88vh] lg:flex-row">
        {MANDATES.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="group relative flex min-h-[72vh] flex-1 basis-0 overflow-hidden bg-[#102A43] transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hover:flex-[1.72]"
          >
            <img
              src={item.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover scale-[1.06] transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/88 via-[#0B2135]/25 to-[#0B2135]/15 transition-opacity duration-700 group-hover:from-[#0B2135]/75" />
            <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-[#B08D57] transition-transform duration-700 ease-out group-hover:scale-x-100" />

            <div className="relative mt-auto flex w-full flex-col justify-end p-8 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 lg:p-12">
              <p className="crest-kicker text-[#D8C3A5] mb-4">{item.index}</p>
              <h2 className="font-display text-6xl text-[#F7F3EA] sm:text-7xl">
                {item.title}
              </h2>
              <p className="mt-3 font-display text-2xl italic text-[#D8C3A5] transition-all duration-700 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                {item.line}
              </p>
              <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-[#E9E1D4]">
                {item.desc}
              </p>
              <span className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#D8C3A5]">
                Continue
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MandatePanels;

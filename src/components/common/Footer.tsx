import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, Award, ArrowUpRight } from 'lucide-react';
import { DUBAI_COMMUNITIES } from '@nestandkey/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#121214] text-[#F7F5F0] border-t border-[#2A2A2D] pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#2A2A2D]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full border border-[#C5A880] flex items-center justify-center text-[#C5A880]">
                <span className="font-serif font-bold text-sm">NK</span>
              </div>
              <span className="font-serif text-2xl tracking-[0.18em] uppercase text-[#F7F5F0]">
                NESTANDKEY
              </span>
            </Link>
            <p className="text-[#A3A3A8] text-sm leading-relaxed max-w-sm font-light">
              Nestandkey is Dubai’s premier private real estate advisory and luxury property discovery platform, connecting sovereign wealth, private offices, and international collectors to the emirate’s finest architectural masterpieces.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#C5A880] font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Licensed by Dubai Real Estate Regulatory Agency (RERA ORN 28941)</span>
            </div>

            <div className="space-y-2 pt-2 text-xs text-[#A3A3A8]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>Level 42, ICD Brookfield Place, DIFC, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+971 4 456 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>private@nestandkey.com</span>
              </div>
            </div>
          </div>

          {/* Prime Communities */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-6">
              Prime Communities
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#A3A3A8]">
              {DUBAI_COMMUNITIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/communities/${c.slug}`}
                    className="hover:text-[#F7F5F0] transition-colors flex items-center justify-between group"
                  >
                    <span>{c.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#C5A880] transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-6">
              Portfolios
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#A3A3A8]">
              <li>
                <Link to="/properties/buy" className="hover:text-[#F7F5F0] transition-colors">
                  Signature Villas
                </Link>
              </li>
              <li>
                <Link to="/properties/buy?type=Penthouse" className="hover:text-[#F7F5F0] transition-colors">
                  Dubai Penthouse Collection
                </Link>
              </li>
              <li>
                <Link to="/properties/off-plan" className="hover:text-[#F7F5F0] transition-colors">
                  Branded New Launches
                </Link>
              </li>
              <li>
                <Link to="/properties/rent" className="hover:text-[#F7F5F0] transition-colors">
                  Prime Rentals
                </Link>
              </li>
              <li>
                <Link to="/mortgage-calculator" className="hover:text-[#F7F5F0] transition-colors">
                  UAE Mortgage Calculator
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#F7F5F0] transition-colors">
                  Market Insights & Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Operations */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold mb-6">
              Platform Ecosystem
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#A3A3A8]">
              <li>
                <a
                  href="http://localhost:5174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <span>Broker Workspace</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:5175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] transition-colors flex items-center gap-1.5"
                >
                  <span>Admin Control Center</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F7F5F0] transition-colors">
                  About Nestandkey
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F7F5F0] transition-colors">
                  Private Desk
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="hover:text-[#C5A880] transition-colors font-medium">
                  VIP Advisory Request
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Privacy Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#71717A] tracking-wider space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} Nestandkey Luxury Real Estate LLC. All Rights Reserved. TRN: 100293848100003.
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-[#C5A880]">Privacy Protected Platform</span>
            <Link to="/contact" className="hover:text-[#F7F5F0]">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#F7F5F0]">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-[#F7F5F0]">RERA Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

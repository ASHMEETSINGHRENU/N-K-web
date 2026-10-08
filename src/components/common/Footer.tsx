import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, Mail, ArrowUpRight, MessageSquare } from 'lucide-react';
import { DUBAI_COMMUNITIES } from '@nestandkey/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B2135] text-[#F7F3EA] border-t border-[#1E3A5F] pt-20 pb-12 font-ui">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#1E3A5F]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-[#B08D57] flex items-center justify-center text-[#D8C3A5] bg-[#102A43]">
                <span className="font-display font-bold text-sm tracking-widest">CS</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-[0.2em] uppercase text-[#F7F3EA] font-semibold leading-none">
                  CRESTSHORE
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#D8C3A5] uppercase font-ui mt-1 font-medium">
                  Where Summit Meets Shore.
                </span>
              </div>
            </Link>
            <p className="text-[#E9E1D4]/80 text-sm leading-relaxed max-w-sm font-normal">
              Global real estate & wealth advisory for private clients, families, family offices and trusted professional partners.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#D8C3A5] font-ui">
              <ShieldCheck className="w-4 h-4 text-[#B08D57] shrink-0" />
              <span>Licensed by Dubai Real Estate Regulatory Agency (RERA ORN 28941)</span>
            </div>

            <div className="space-y-2.5 pt-2 text-xs text-[#E9E1D4]/75 font-ui">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                <span>Level 42, ICD Brookfield Place, DIFC, Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B08D57] shrink-0" />
                <a href="tel:+97144567890" className="hover:text-[#F7F3EA] transition-colors">
                  +971 4 456 7890
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#B08D57] shrink-0" />
                <a
                  href="https://wa.me/971501123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7F3EA] transition-colors"
                >
                  +971 50 112 3456 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B08D57] shrink-0" />
                <a href="mailto:hello@crestshore.co" className="hover:text-[#F7F3EA] transition-colors">
                  hello@crestshore.co
                </a>
              </div>
            </div>
          </div>

          {/* Prime Communities */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D8C3A5] font-semibold mb-6 font-ui">
              Prime Communities
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#E9E1D4]/75 font-ui">
              {DUBAI_COMMUNITIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/communities/${c.slug}`}
                    className="hover:text-[#F7F3EA] transition-colors flex items-center justify-between group"
                  >
                    <span>{c.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-[#B08D57] transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portfolios & Services */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D8C3A5] font-semibold mb-6 font-ui">
              Services & Portfolios
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#E9E1D4]/75 font-ui">
              <li>
                <Link to="/properties/buy" className="hover:text-[#F7F3EA] transition-colors">
                  Buy Property
                </Link>
              </li>
              <li>
                <Link to="/properties/rent" className="hover:text-[#F7F3EA] transition-colors">
                  Rent Property
                </Link>
              </li>
              <li>
                <Link to="/properties/sell" className="hover:text-[#F7F3EA] transition-colors">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link to="/mortgage" className="hover:text-[#F7F3EA] transition-colors">
                  Mortgage Financing
                </Link>
              </li>
              <li>
                <Link to="/property-care" className="hover:text-[#F7F3EA] transition-colors">
                  Property Care
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-[#F7F3EA] transition-colors">
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Mandate & Network */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#D8C3A5] font-semibold mb-6 font-ui">
              Crestshore Network
            </h4>
            <ul className="space-y-3 text-xs tracking-wider text-[#E9E1D4]/75 font-ui">
              <li>
                <Link to="/partner-network" className="hover:text-[#D8C3A5] transition-colors flex items-center gap-1.5">
                  <span>Partner Network</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B08D57]" />
                </Link>
              </li>
              <li>
                <Link to="/private-clients" className="hover:text-[#D8C3A5] transition-colors flex items-center gap-1.5">
                  <span>Private Clients Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B08D57]" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F7F3EA] transition-colors">
                  About Crestshore
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F7F3EA] transition-colors">
                  Contact Advisory Desk
                </Link>
              </li>
              <li>
                <a
                  href="http://localhost:5174"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D8C3A5] transition-colors flex items-center gap-1.5 text-[#E9E1D4]/60"
                >
                  <span>Broker Workspace</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B08D57]" />
                </a>
              </li>
              <li>
                <a
                  href="http://localhost:5175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D8C3A5] transition-colors flex items-center gap-1.5 text-[#E9E1D4]/60"
                >
                  <span>Admin Control</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B08D57]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Exact Client Brief Footer Navigation Row (Item #5) */}
        <div className="py-6 border-b border-[#1E3A5F]/70 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs tracking-wider text-[#D8C3A5] font-medium font-ui">
          <Link to="/properties" className="hover:text-[#FFFDF8] transition-colors">Properties</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/mortgage" className="hover:text-[#FFFDF8] transition-colors">Mortgage</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/property-care" className="hover:text-[#FFFDF8] transition-colors">Property Care</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/partner-network" className="hover:text-[#FFFDF8] transition-colors">Partner Network</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/private-clients" className="hover:text-[#FFFDF8] transition-colors">Private Client Login</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/about" className="hover:text-[#FFFDF8] transition-colors">About</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/contact" className="hover:text-[#FFFDF8] transition-colors">Contact</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/privacy" className="hover:text-[#FFFDF8] transition-colors">Privacy</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/terms" className="hover:text-[#FFFDF8] transition-colors">Terms</Link>
          <span className="text-[#1E3A5F]">·</span>
          <Link to="/legal" className="hover:text-[#FFFDF8] transition-colors">Legal/Regulatory Information</Link>
        </div>

        {/* Bottom Legal & Privacy Notice */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#E9E1D4]/60 tracking-wider space-y-4 md:space-y-0 font-ui">
          <div>
            © {new Date().getFullYear()} Crestshore Luxury Real Estate LLC. All Rights Reserved. TRN: 100293848100003.
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-[#B08D57]">Discreet Advisory House</span>
            <Link to="/privacy" className="hover:text-[#F7F3EA] transition-colors">DIFC Data Protection</Link>
            <Link to="/legal" className="hover:text-[#F7F3EA] transition-colors">RERA Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

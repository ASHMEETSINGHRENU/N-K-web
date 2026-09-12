import React, { useState } from 'react';
import { api } from '../../services/api';
import { MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadRef, setLeadRef] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.submitLead({
        name,
        email,
        mobile,
        preferredContactMethod: 'WHATSAPP',
        leadType: 'INQUIRY',
        source: 'DIRECT',
        message
      });
      setLeadRef(res.leadReference);
      setIsSuccess(true);
    } catch (err) {
      alert('Failed to transmit message. Please call our private desk directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <div className="mb-12 pb-6 border-b border-[#E5E0D8]">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
            Private Client Desk
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl text-[#18181A] font-light">
            Contact Nestandkey
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Office info */}
          <div className="lg:col-span-5 space-y-8 text-xs">
            <div>
              <h3 className="font-serif text-2xl text-[#18181A] mb-4">DIFC Headquarters</h3>
              <p className="text-[#71717A] leading-relaxed">
                Our primary advisory rooms are situated within Dubai International Financial Centre (DIFC), available by appointment for confidential property consultations and portfolio reviews.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#E5E0D8]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <span className="font-semibold text-[#18181A] block">Address</span>
                  <span className="text-[#71717A]">Level 42, ICD Brookfield Place, DIFC, Dubai, United Arab Emirates</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <div>
                  <span className="font-semibold text-[#18181A] block">Telephone</span>
                  <span className="text-[#71717A]">+971 4 456 7890</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <div>
                  <span className="font-semibold text-[#18181A] block">Electronic Correspondence</span>
                  <span className="text-[#71717A]">private@nestandkey.com</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                <div>
                  <span className="font-semibold text-[#18181A] block">Operating Hours</span>
                  <span className="text-[#71717A]">Monday – Saturday: 09:00 AM – 08:00 PM GST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-[#F7F5F0] border border-[#E5E0D8] p-8">
            {isSuccess ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto" />
                <h4 className="font-serif text-2xl text-[#18181A]">Message Transmitted</h4>
                <p className="text-xs text-[#71717A] max-w-sm mx-auto leading-relaxed">
                  Your reference is <span className="font-mono font-bold text-[#18181A]">{leadRef}</span>. Our senior partner will respond within two hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <h3 className="font-serif text-2xl text-[#18181A] mb-4">Direct Message</h3>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                      Contact Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                    Message or Mandate Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding your target properties, preferred communities, or advisory needs..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#18181A] hover:bg-[#0B0B0C] text-[#F7F5F0] hover:text-[#C5A880] py-3 text-xs uppercase tracking-widest font-semibold transition-all"
                  >
                    {isSubmitting ? 'Transmitting...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

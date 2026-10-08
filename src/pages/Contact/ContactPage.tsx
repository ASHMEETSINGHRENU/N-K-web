import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Lock,
  ArrowRight,
  UserCheck,
  Building2,
  FileText
} from 'lucide-react';
import { api } from '../../services/api';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [clientType, setClientType] = useState('Private client');
  const [message, setMessage] = useState('');
  const [preferredMethod, setPreferredMethod] = useState<'WHATSAPP' | 'PHONE' | 'EMAIL'>('WHATSAPP');
  const [preferredTime, setPreferredTime] = useState('');
  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadRef, setLeadRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);

  const clientTypes = [
    'Private client',
    'Family office',
    'Investor',
    'Buyer',
    'Seller',
    'Tenant/Landlord',
    'Broker/Agent',
    'CA/Wealth manager',
    'Mortgage enquiry',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg('Please confirm your consent to be contacted.');
      return;
    }
    if (!email && !mobile) {
      setErrorMsg('Please provide either an email or a WhatsApp contact number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);
    try {
      const response: any = await api.submitLead({
        name,
        email: email.trim().toLowerCase(),
        mobile,
        clientType,
        preferredContactMethod: preferredMethod,
        preferredTime: preferredTime || 'Any time during business hours',
        message: `[Category: ${clientType}] ${message || 'No additional note provided.'}`,
        leadType: 'INQUIRY',
        source: 'CONTACT_PAGE'
      });
      setLeadRef(response.leadReference || `CS-INQ-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Unable to transmit enquiry at this time. Please contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setMobile('');
    setClientType('Private client');
    setMessage('');
    setPreferredMethod('WHATSAPP');
    setPreferredTime('');
    setConsent(false);
    setIsSuccess(false);
    setLeadRef('');
    setErrorMsg('');
  };

  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen font-ui text-[#3E4852]">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-12">
        {/* ======================================================== */}
        {/* PAGE HEADER (Brief Item #4)                              */}
        {/* ======================================================== */}
        <div className="border-b border-[#E9E1D4] pb-8 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#B08D57] font-semibold block">
            Private Client Desk & Global Inquiries
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-[#102A43] font-normal leading-tight">
            Begin a private conversation.
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280] max-w-3xl leading-relaxed">
            Whether you are acquiring, selling, renting, financing or caring for property in Dubai, we welcome a discreet first conversation. Tell us what you are considering and we will direct your enquiry to the right person.
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAdvisorModalOpen(true)}
              className="bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
            >
              Speak with an Advisor
            </button>
            <a
              href="https://wa.me/971501123456"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFFDF8] hover:bg-[#F7F3EA] text-[#102A43] border border-[#E9E1D4] px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+97144567890"
              className="bg-[#FFFDF8] hover:bg-[#F7F3EA] text-[#102A43] border border-[#E9E1D4] px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Call</span>
            </a>
            <a
              href="mailto:hello@crestshore.co"
              className="bg-[#FFFDF8] hover:bg-[#F7F3EA] text-[#102A43] border border-[#E9E1D4] px-5 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all inline-flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-[#B08D57]" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN TWO-COLUMN CONTENT                                  */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Details Block & Reassurance */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Details Block */}
            <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm space-y-6">
              <div>
                <span className="font-display text-2xl text-[#102A43] block">Crestshore</span>
                <span className="text-[11px] uppercase tracking-wider text-[#B08D57] font-semibold block mt-0.5">
                  Global real estate & wealth advisory
                </span>
                <span className="text-xs text-[#6B7280] block mt-1">
                  Dubai, United Arab Emirates
                </span>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E9E1D4] text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#102A43] block">Advisory Rooms</span>
                    <span className="text-[#6B7280] leading-relaxed">
                      Level 42, ICD Brookfield Place, DIFC, Dubai, United Arab Emirates
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-[#B08D57] shrink-0" />
                  <div>
                    <span className="font-semibold text-[#102A43] block">WhatsApp (Direct)</span>
                    <a
                      href="https://wa.me/971501123456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#102A43] hover:text-[#B08D57] font-medium transition-colors"
                    >
                      +971 50 112 3456
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B08D57] shrink-0" />
                  <div>
                    <span className="font-semibold text-[#102A43] block">Telephone Desk</span>
                    <a
                      href="tel:+97144567890"
                      className="text-[#102A43] hover:text-[#B08D57] font-medium transition-colors"
                    >
                      +971 4 456 7890
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E9E1D4] space-y-2">
                  <span className="font-semibold text-[#102A43] block text-[11px] uppercase tracking-wider">
                    Segmented Electronic Mail
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">General Inquiries:</span>
                    <a href="mailto:hello@crestshore.co" className="text-[#102A43] hover:text-[#B08D57] font-mono">
                      hello@crestshore.co
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Private Clients Desk:</span>
                    <a href="mailto:private@crestshore.co" className="text-[#102A43] hover:text-[#B08D57] font-mono">
                      private@crestshore.co
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#6B7280]">Partner Network Desk:</span>
                    <a href="mailto:partners@crestshore.co" className="text-[#102A43] hover:text-[#B08D57] font-mono">
                      partners@crestshore.co
                    </a>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E9E1D4] space-y-2">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#102A43] block">Advisory Hours</span>
                      <span className="text-[#6B7280]">Monday – Saturday: 09:00 AM – 08:00 PM GST</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#102A43] block">Response Standard</span>
                      <span className="text-[#6B7280]">Same-day response; within 2 hours during business hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Page Reassurance */}
            <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm space-y-4 text-xs">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
                Contact Reassurances & Privacy
              </span>

              <ul className="space-y-3 text-[#3E4852] leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <Lock className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                  <span>Private enquiries are handled discreetly under strict confidential protocols.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                  <span>Information is shared only with the relevant Crestshore advisor or selected professional partner where necessary.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                  <span>
                    For existing private clients, use the secure{' '}
                    <Link to="/private-clients" className="text-[#102A43] underline font-semibold hover:text-[#B08D57]">
                      Private Client portal
                    </Link>{' '}
                    for documents and ongoing requests.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#B08D57] shrink-0 mt-0.5" />
                  <span>
                    For partners, use the{' '}
                    <Link to="/partner-network" className="text-[#102A43] underline font-semibold hover:text-[#B08D57]">
                      Partner Network
                    </Link>{' '}
                    for referrals, agreements and commission records.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm">
            {isSuccess ? (
              <div className="text-center py-12 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#F7F3EA] border border-[#B08D57] flex items-center justify-center mx-auto text-[#B08D57]">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-3xl text-[#102A43]">Thank you.</h3>
                  <p className="text-sm text-[#102A43] font-medium">
                    Your enquiry has been received.
                  </p>
                  <p className="text-xs text-[#6B7280] max-w-md mx-auto leading-relaxed">
                    A member of Crestshore will respond within 2 hours during business hours.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] max-w-xs mx-auto text-center space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block">Enquiry Reference</span>
                  <span className="font-mono text-base font-bold text-[#102A43]">{leadRef}</span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/971501123456?text=${encodeURIComponent(`Hello Crestshore, I submitted enquiry reference ${leadRef}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] px-6 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Connect on WhatsApp
                  </a>
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto bg-[#F7F3EA] hover:bg-[#E9E1D4] text-[#102A43] px-6 py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors border border-[#E9E1D4]"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div className="border-b border-[#E9E1D4] pb-4">
                  <h3 className="font-display text-2xl text-[#102A43] font-normal">
                    Submit an Enquiry
                  </h3>
                  <p className="text-[#6B7280] text-xs mt-1">
                    Please provide your contact details and how our advisory practice may assist you.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                    {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full name or principal identity"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57] transition-colors"
                  />
                </div>

                {/* Email and WhatsApp / Contact Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                      WhatsApp or Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57] transition-colors"
                    />
                  </div>
                </div>

                {/* I am a: Dropdown */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                    I am a *
                  </label>
                  <select
                    value={clientType}
                    onChange={(e) => setClientType(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57] transition-colors"
                  >
                    {clientTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* What can we help with? */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                    What can we help with?
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your property acquisition, sale, financing, care requirement or advisory objective..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57] transition-colors"
                  />
                </div>

                {/* Preferred Contact Method & Preferred Time/Timezone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WHATSAPP', 'PHONE', 'EMAIL'] as const).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setPreferredMethod(method)}
                          className={`py-2 text-[11px] uppercase tracking-wider font-semibold border transition-all text-center ${
                            preferredMethod === method
                              ? 'bg-[#102A43] text-[#FFFDF8] border-[#102A43]'
                              : 'bg-[#FFFDF8] text-[#6B7280] border-[#E9E1D4] hover:border-[#B08D57]'
                          }`}
                        >
                          {method === 'WHATSAPP' ? 'WhatsApp' : method === 'PHONE' ? 'Call' : 'Email'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                      Preferred Time or Time Zone <span className="text-[#6B7280] font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2:00 PM GST or London (GMT)"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57] transition-colors"
                    />
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 accent-[#102A43] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-[11px] text-[#6B7280] leading-relaxed">
                      I consent to Crestshore contacting me regarding my enquiry in accordance with their privacy standards and advisory guidelines. *
                    </span>
                  </label>
                </div>

                {/* Primary Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] py-3.5 text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
                  >
                    {isSubmitting ? 'Transmitting Enquiry...' : 'Speak with an Advisor'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Universal Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService="Private Client Consultation"
      />
    </div>
  );
};

export default ContactPage;

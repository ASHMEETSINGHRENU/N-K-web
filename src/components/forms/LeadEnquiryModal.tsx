import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { CheckCircle2, Shield, Phone, MessageSquare, Mail, Calendar, UserCheck } from 'lucide-react';

interface LeadEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: {
    _id: string;
    title: string;
    priceAED: number;
    community: string;
    assignedBroker?: any;
  } | null;
  leadType?: 'INQUIRY' | 'VIEWING_REQUEST' | 'SPECIALIST_CALL' | 'CONSULTATION';
}

export const LeadEnquiryModal: React.FC<LeadEnquiryModalProps> = ({
  isOpen,
  onClose,
  property,
  leadType = 'INQUIRY'
}) => {
  const { user } = useAuth();
  const { fetchNotifications } = useNotifications();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.phone || '');
  const [preferredMethod, setPreferredMethod] = useState<'WHATSAPP' | 'PHONE' | 'EMAIL'>('WHATSAPP');
  const [message, setMessage] = useState('');
  const [type, setType] = useState(leadType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadRef, setLeadRef] = useState('');
  const [assignedBroker, setAssignedBroker] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill or sync when user changes or modal opens
  useEffect(() => {
    if (user && isOpen) {
      if (!name) setName(user.name || '');
      if (!email) setEmail(user.email || '');
      if (!mobile) setMobile(user.phone || '');
    }
  }, [user, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
      setErrorMsg('Please provide your name, email address, and contact number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        name,
        email: email.trim().toLowerCase(),
        mobile,
        preferredContactMethod: preferredMethod,
        leadType: type,
        message: message || (property ? `Inquiry regarding ${property.title}` : 'General private advisory request'),
        propertyId: property?._id,
        source: 'WEBSITE'
      };

      const response: any = await api.submitLead(payload);
      setLeadRef(response.leadReference);
      if (response.assignedBroker) {
        setAssignedBroker(response.assignedBroker);
      }
      setIsSuccess(true);
      // Immediately refresh client's notifications
      fetchNotifications();
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to submit inquiry. Please try again or contact our private desk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!user) {
      setName('');
      setEmail('');
      setMobile('');
    }
    setMessage('');
    setIsSuccess(false);
    setAssignedBroker(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetForm}
      title={property ? 'Private Residence Enquiry' : 'Private Advisory Consultation'}
      subtitle={property ? `${property.community}, Dubai` : 'Bespoke Dubai Real Estate Advisory'}
    >
      {isSuccess ? (
        <div className="text-center py-8 space-y-4 font-ui">
          <div className="w-14 h-14 rounded-full bg-[#B08D57]/20 text-[#B08D57] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-display text-2xl font-normal text-[#102A43]">Enquiry Transmitted</h4>
          <p className="text-xs text-[#6B7280] max-w-sm mx-auto leading-relaxed">
            Your inquiry has been registered under reference <span className="font-mono font-bold text-[#102A43]">{leadRef}</span>.
          </p>
          {assignedBroker && (
            <div className="p-3 bg-[#F7F3EA] border border-[#E9E1D4] max-w-sm mx-auto rounded-xs text-left flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#102A43] border border-[#B08D57] flex items-center justify-center text-[#D8C3A5] font-display text-sm font-semibold">
                {assignedBroker.name?.charAt(0) || 'B'}
              </div>
              <div className="text-xs">
                <span className="text-[10px] uppercase tracking-wider text-[#B08D57] block font-semibold">
                  Assigned Private Advisor
                </span>
                <span className="font-display text-sm font-medium text-[#102A43] block">
                  {assignedBroker.name}
                </span>
                <span className="text-[11px] text-[#6B7280] block">
                  {assignedBroker.title || 'Private Client Specialist'}
                </span>
              </div>
            </div>
          )}
          <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
            You will receive live status notifications and updates in your client profile and notification bell.
          </p>
          <div className="pt-4">
            <button
              onClick={resetForm}
              className="bg-[#102A43] text-[#FFFDF8] hover:text-[#D8C3A5] hover:bg-[#0B2135] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-ui">
          {property && (
            <div className="p-3 bg-[#F7F3EA] border border-[#E9E1D4] mb-4">
              <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block">
                Selected Residence
              </span>
              <span className="font-display text-base font-normal text-[#102A43] line-clamp-1 mt-0.5">
                {property.title}
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Lead Type Buttons */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#102A43] mb-1.5 font-semibold">
              Purpose of Request
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('INQUIRY')}
                className={`py-2 px-3 border text-center transition-all ${
                  type === 'INQUIRY'
                    ? 'border-[#B08D57] bg-[#102A43] text-[#F7F3EA] font-semibold'
                    : 'border-[#E9E1D4] bg-[#F7F3EA] text-[#6B7280] hover:text-[#102A43] hover:border-[#B08D57]'
                }`}
              >
                Request Details & Brochure
              </button>
              <button
                type="button"
                onClick={() => setType('VIEWING_REQUEST')}
                className={`py-2 px-3 border text-center transition-all ${
                  type === 'VIEWING_REQUEST'
                    ? 'border-[#B08D57] bg-[#102A43] text-[#F7F3EA] font-semibold'
                    : 'border-[#E9E1D4] bg-[#F7F3EA] text-[#6B7280] hover:text-[#102A43] hover:border-[#B08D57]'
                }`}
              >
                Schedule Private Viewing
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#102A43] mb-1 font-semibold">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lord Marcus Kensington"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
            />
          </div>

          {/* Email & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#102A43] mb-1 font-semibold">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="private@client.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#102A43] mb-1 font-semibold">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+971 50 123 4567"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
              />
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#102A43] mb-1.5 font-semibold">
              Preferred Contact Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPreferredMethod('WHATSAPP')}
                className={`py-2 px-2 border flex items-center justify-center gap-1.5 transition-all ${
                  preferredMethod === 'WHATSAPP'
                    ? 'border-[#B08D57] bg-[#102A43] text-[#F7F3EA] font-semibold'
                    : 'border-[#E9E1D4] bg-[#F7F3EA] text-[#6B7280] hover:text-[#102A43] hover:border-[#B08D57]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => setPreferredMethod('PHONE')}
                className={`py-2 px-2 border flex items-center justify-center gap-1.5 transition-all ${
                  preferredMethod === 'PHONE'
                    ? 'border-[#B08D57] bg-[#102A43] text-[#F7F3EA] font-semibold'
                    : 'border-[#E9E1D4] bg-[#F7F3EA] text-[#6B7280] hover:text-[#102A43] hover:border-[#B08D57]'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Telephone</span>
              </button>
              <button
                type="button"
                onClick={() => setPreferredMethod('EMAIL')}
                className={`py-2 px-2 border flex items-center justify-center gap-1.5 transition-all ${
                  preferredMethod === 'EMAIL'
                    ? 'border-[#B08D57] bg-[#102A43] text-[#F7F3EA] font-semibold'
                    : 'border-[#E9E1D4] bg-[#F7F3EA] text-[#6B7280] hover:text-[#102A43] hover:border-[#B08D57]'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Message / Requirements */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#102A43] mb-1 font-semibold">
              Special Inquiries or Confidential Requirements
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Inquiring regarding private viewing availability, off-market comparable units, or payment plans..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
            />
          </div>

          {/* Privacy Notice */}
          <div className="flex items-center gap-2 text-[10px] text-[#6B7280] pt-1">
            <Shield className="w-3.5 h-3.5 text-[#B08D57] shrink-0" />
            <span>
              Client confidentiality guaranteed. Personal contact information is strictly protected and never shared or made public.
            </span>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all disabled:opacity-50 shadow-sm"
            >
              {isSubmitting ? 'Submitting Confidential Request...' : 'Transmit Private Inquiry'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};
export default LeadEnquiryModal;

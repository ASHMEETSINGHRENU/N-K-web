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
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 text-[#C5A880] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-serif text-2xl font-light text-[#18181A]">Enquiry Transmitted</h4>
          <p className="text-xs text-[#71717A] max-w-sm mx-auto leading-relaxed">
            Your inquiry has been registered under reference <span className="font-mono font-bold text-[#18181A]">{leadRef}</span>.
          </p>
          {assignedBroker && (
            <div className="p-3 bg-[#F7F5F0] border border-[#C5A880]/40 max-w-sm mx-auto rounded-xs text-left flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#18181A] border border-[#C5A880] flex items-center justify-center text-[#C5A880] font-serif text-sm">
                {assignedBroker.name?.charAt(0) || 'B'}
              </div>
              <div className="text-xs">
                <span className="text-[10px] uppercase tracking-wider font-mono text-[#C5A880] block font-semibold">
                  Assigned Private Advisor
                </span>
                <span className="font-serif text-sm font-medium text-[#18181A] block">
                  {assignedBroker.name}
                </span>
                <span className="text-[11px] text-[#71717A] block">
                  {assignedBroker.title || 'Private Client Specialist'}
                </span>
              </div>
            </div>
          )}
          <p className="text-xs text-[#71717A] max-w-sm mx-auto">
            You will receive live status notifications and updates in your client profile and notification bell.
          </p>
          <div className="pt-4">
            <button
              onClick={resetForm}
              className="bg-[#18181A] text-[#F7F5F0] hover:text-[#C5A880] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          {property && (
            <div className="p-3 bg-[#F7F5F0] border border-[#E5E0D8] mb-4">
              <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                Selected Residence
              </span>
              <span className="font-serif text-sm font-medium text-[#18181A] line-clamp-1">
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
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#71717A] mb-1.5 font-medium">
              Purpose of Request
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('INQUIRY')}
                className={`py-2 px-3 border text-center transition-all ${
                  type === 'INQUIRY'
                    ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-semibold'
                    : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A]'
                }`}
              >
                Request Details & Brochure
              </button>
              <button
                type="button"
                onClick={() => setType('VIEWING_REQUEST')}
                className={`py-2 px-3 border text-center transition-all ${
                  type === 'VIEWING_REQUEST'
                    ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-semibold'
                    : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A]'
                }`}
              >
                Schedule Private Viewing
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#71717A] mb-1 font-medium">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lord Marcus Kensington"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3.5 py-2.5 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Email & Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#71717A] mb-1 font-medium">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="private@client.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3.5 py-2.5 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#71717A] mb-1 font-medium">
                Mobile Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+971 50 123 4567"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3.5 py-2.5 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#71717A] mb-1.5 font-medium">
              Preferred Contact Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPreferredMethod('WHATSAPP')}
                className={`py-2 px-2 border flex items-center justify-center gap-1.5 transition-all ${
                  preferredMethod === 'WHATSAPP'
                    ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-semibold'
                    : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A]'
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
                    ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-semibold'
                    : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A]'
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
                    ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-semibold'
                    : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A]'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Message / Requirements */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#71717A] mb-1 font-medium">
              Special Inquiries or Confidential Requirements
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Inquiring regarding private viewing availability, off-market comparable units, or payment plans..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3.5 py-2.5 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          {/* Privacy Notice */}
          <div className="flex items-center gap-2 text-[10px] text-[#71717A] pt-1">
            <Shield className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>
              Client confidentiality guaranteed. Personal contact information is strictly protected and never shared or made public.
            </span>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#18181A] hover:bg-[#0B0B0C] text-[#F7F5F0] hover:text-[#C5A880] py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Confidential Request...' : 'Transmit Private Inquiry'}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

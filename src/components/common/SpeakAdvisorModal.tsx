import React, { useState } from 'react';
import { Modal } from './Modal';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { MessageSquare, Phone, Mail, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface SpeakAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
  initialService?: string;
}

export const SpeakAdvisorModal: React.FC<SpeakAdvisorModalProps> = ({
  isOpen,
  onClose,
  defaultTopic = 'General Advisory',
  initialService
}) => {
  const { user } = useAuth();
  const { fetchNotifications } = useNotifications();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.phone || '');
  const [topic, setTopic] = useState(initialService || defaultTopic);
  const [preferredMethod, setPreferredMethod] = useState<'WHATSAPP' | 'PHONE' | 'EMAIL'>('WHATSAPP');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadRef, setLeadRef] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const WHATSAPP_NUMBER = '971501123456';
  const OFFICE_PHONE = '+971 4 456 7890';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !mobile) {
      setErrorMsg('Please provide your name, email, and contact number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response: any = await api.submitLead({
        name,
        email: email.trim().toLowerCase(),
        mobile,
        preferredContactMethod: preferredMethod,
        leadType: 'CONSULTATION',
        message: `[Topic: ${topic}] ${message || 'Client requested conversation with a Crestshore advisor.'}`,
        source: 'ADVISOR_REQUEST'
      });

      setLeadRef(response.leadReference || `CS-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSuccess(true);
      fetchNotifications();
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to submit request. Please reach us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setMessage('');
    setErrorMsg('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-[#E9E1D4] pb-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-mono font-semibold">
            Private Client Advisory Desk
          </span>
          <h2 className="font-display text-2xl font-light text-[#102A43] mt-1">
            Speak with an Advisor
          </h2>
          <p className="text-xs text-[#6B7280] font-light mt-1">
            Direct, discreet access to licensed advisors in Dubai for acquisitions, financing, and property care.
          </p>
        </div>

        {/* Quick Direct Channels */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Crestshore, I would like to speak with an advisor regarding luxury property in Dubai.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#FFFDF8] hover:bg-[#F7F3EA] border border-[#E9E1D4] flex items-center gap-2.5 transition-colors group shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#6B7280] font-mono block">Instant Chat</span>
              <span className="text-xs font-semibold text-[#102A43] group-hover:text-[#B08D57]">WhatsApp Desk</span>
            </div>
          </a>

          <a
            href={`tel:${OFFICE_PHONE.replace(/\s+/g, '')}`}
            className="p-3 bg-[#FFFDF8] hover:bg-[#F7F3EA] border border-[#E9E1D4] flex items-center gap-2.5 transition-colors group shadow-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#F7F3EA] border border-[#E9E1D4] text-[#102A43] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#6B7280] font-mono block">Direct Line</span>
              <span className="text-xs font-semibold text-[#102A43] group-hover:text-[#B08D57]">DIFC Office</span>
            </div>
          </a>
        </div>

        {isSuccess ? (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#B08D57] font-mono block">
                Reference: {leadRef}
              </span>
              <h3 className="font-display text-xl text-[#102A43] mt-1">Advisory Mandate Registered</h3>
              <p className="text-xs text-[#3E4852] font-light mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, {name}. A dedicated Crestshore senior advisor will reach out to you via {preferredMethod.toLowerCase()} shortly.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                Area of Interest *
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
              >
                <option value="Property Acquisition (Buy)">Property Acquisition (Buy)</option>
                <option value="Luxury Rental (Rent)">Luxury Rental (Rent)</option>
                <option value="Listing a Property (Sell)">Listing a Property (Sell)</option>
                <option value="Mortgage & Financing">Mortgage & Financing</option>
                <option value="Property Care & Management">Property Care & Management</option>
                <option value="Private Wealth & Portfolio Advisory">Private Wealth & Portfolio Advisory</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord Marcus Kensington"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] placeholder-[#6B7280] focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                  Contact Telephone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+971 50 000 0000"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] placeholder-[#6B7280] focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] placeholder-[#6B7280] focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                Preferred Communication Channel
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['WHATSAPP', 'PHONE', 'EMAIL'] as const).map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPreferredMethod(method)}
                    className={`py-2 text-[10px] uppercase tracking-wider font-semibold border transition-all ${
                      preferredMethod === method
                        ? 'bg-[#102A43] text-[#FFFDF8] border-[#102A43]'
                        : 'bg-[#FFFDF8] text-[#6B7280] border-[#E9E1D4] hover:border-[#B08D57]'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                Brief Note (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Specific requirements, budget range, or preferred time for consultation..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#F7F3EA] border border-[#E9E1D4] p-2.5 text-xs text-[#102A43] placeholder-[#6B7280] focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] text-xs uppercase tracking-wider font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Transmitting Request...' : 'Speak with an Advisor'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6B7280] pt-1">
              <ShieldCheck className="w-3 h-3 text-[#B08D57]" />
              <span>Strictly confidential. No promotional spam or public disclosure.</span>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

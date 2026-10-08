import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl'
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-ui">
      {/* Light dismiss backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2135]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative bg-[#FFFDF8] text-[#3E4852] border border-[#E9E1D4] rounded-none shadow-2xl w-full ${maxWidth} z-10 overflow-hidden my-8`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-[#E9E1D4] bg-[#F7F3EA]">
          <div>
            {title && (
              <h3 className="font-display text-2xl font-normal tracking-wide text-[#102A43]">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs uppercase tracking-[0.14em] text-[#B08D57] mt-1 font-medium">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B7280] hover:text-[#102A43] hover:bg-[#E9E1D4]/50 transition-colors rounded-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
};

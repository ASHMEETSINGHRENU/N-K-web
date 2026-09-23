import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Eye, EyeOff, Lock, Mail, User, Phone, Check, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, login, register } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>(authModalMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Sync mode with context
  React.useEffect(() => {
    setMode(authModalMode);
    setErrorMessage(null);
  }, [authModalMode, isAuthModalOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!regName || !regEmail || !regPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (regPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone || undefined
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoClient = () => {
    setLoginEmail('client@nestandkey.com');
    setLoginPassword('Client@123456');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-[#0A0A0B]/85 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#18181A] border border-[#2A2A2E] rounded-sm text-white shadow-2xl overflow-hidden z-10 my-8 transition-all">
        {/* Top Gold Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#8F7453] via-[#C5A880] to-[#E5D2B8]" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-[#71717A] hover:text-[#C5A880] transition-colors rounded-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.25em] font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Nestandkey Private Client Portal</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-tight text-[#FDFCF9]">
            {mode === 'login' ? 'Access Your Portfolio' : 'Create Private Account'}
          </h2>
          <p className="text-xs text-[#A1A1AA] font-light mt-1.5 max-w-sm mx-auto">
            {mode === 'login'
              ? 'Sign in to access saved residences, private viewings, and off-market intelligence.'
              : 'Join Nestandkey to unlock off-market listings, direct broker advisory, and market research.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#2A2A2E] mx-8 font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center transition-all uppercase tracking-wider ${
              mode === 'login'
                ? 'border-b-2 border-[#C5A880] text-[#C5A880] font-bold'
                : 'text-[#71717A] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center transition-all uppercase tracking-wider ${
              mode === 'register'
                ? 'border-b-2 border-[#C5A880] text-[#C5A880] font-bold'
                : 'text-[#71717A] hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 pt-6">
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-950/40 border border-red-800/60 rounded-xs text-red-200 text-xs font-mono">
              {errorMessage}
            </div>
          )}

          {mode === 'login' ? (
            /* ================= LOGIN FORM ================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setErrorMessage('Please contact advisory at private@nestandkey.com to reset access.')}
                    className="text-[10px] text-[#C5A880] hover:underline font-mono"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs pl-10 pr-10 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Credentials Chip */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleFillDemoClient}
                  className="w-full text-left p-2.5 bg-[#212124] hover:bg-[#2A2A2E] border border-[#2A2A2E] hover:border-[#C5A880]/50 rounded-xs transition-colors flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span className="text-[11px] font-mono text-[#C5A880]">Quick Test:</span>
                    <span className="text-[11px] text-[#A1A1AA]">client@nestandkey.com</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#C5A880] font-semibold">
                    Auto-Fill
                  </span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-[#C5A880] hover:bg-[#B8976C] text-[#18181A] py-3 rounded-xs text-xs font-bold uppercase tracking-[0.18em] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#18181A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Sign In to Account</span>
                )}
              </button>
            </form>
          ) : (
            /* ================= REGISTER FORM ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Lord Alexander Sterling"
                    className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="alexander@familyoffice.ae"
                    className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min. 8 chars"
                      className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs px-3 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs px-3 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#A1A1AA]">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Strict confidentiality and UAE Data Protection compliance guaranteed.</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-[#C5A880] hover:bg-[#B8976C] text-[#18181A] py-3 rounded-xs text-xs font-bold uppercase tracking-[0.18em] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#18181A] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Create Private Account</span>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer info */}
        <div className="px-8 py-4 bg-[#121214] border-t border-[#2A2A2E] text-center text-[10px] font-mono text-[#71717A]">
          <span>Protected by Nestandkey Luxury Client Protocol • Encrypted Session</span>
        </div>
      </div>
    </div>
  );
};

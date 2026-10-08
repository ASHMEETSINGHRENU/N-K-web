import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, Eye, EyeOff, Lock, Mail, User, Phone, Check, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { GoogleAuthButton } from './GoogleAuthButton';

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
    setLoginEmail('client@crestshore.com');
    setLoginPassword('Client@123456');
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-ui">
      {/* Dimmed Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B2135]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-[#FFFDF8] border border-[#E9E1D4] rounded-sm text-[#3E4852] shadow-2xl overflow-hidden z-10 my-8 transition-all">
        {/* Top Gold Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#B08D57] via-[#D8C3A5] to-[#B08D57]" />

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-[#6B7280] hover:text-[#102A43] hover:bg-[#E9E1D4]/50 transition-colors rounded-sm"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 text-[#B08D57] text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Crestshore Private Client Portal</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-[#102A43]">
            {mode === 'login' ? 'Access Your Portfolio' : 'Create Private Account'}
          </h2>
          <p className="text-xs text-[#6B7280] font-normal mt-1.5 max-w-sm mx-auto">
            {mode === 'login'
              ? 'Sign in to access saved residences, private viewings, and off-market intelligence.'
              : 'Join Crestshore to unlock off-market listings, direct broker advisory, and market research.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E9E1D4] mx-8 text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center transition-all uppercase tracking-wider ${
              mode === 'login'
                ? 'border-b-2 border-[#B08D57] text-[#102A43] font-bold'
                : 'text-[#6B7280] hover:text-[#102A43]'
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
                ? 'border-b-2 border-[#B08D57] text-[#102A43] font-bold'
                : 'text-[#6B7280] hover:text-[#102A43]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 pt-6">
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xs text-red-800 text-xs font-mono">
              {errorMessage}
            </div>
          )}

          {mode === 'login' ? (
            /* ================= LOGIN FORM ================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#102A43] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#102A43] placeholder-[#6B7280]/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#102A43]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setErrorMessage('Please contact advisory at private@crestshore.com to reset access.')}
                    className="text-[10px] text-[#B08D57] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-10 py-2.5 text-xs text-[#102A43] placeholder-[#6B7280]/60 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#102A43]"
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
                  className="w-full text-left p-2.5 bg-[#F7F3EA] hover:bg-[#E9E1D4]/60 border border-[#E9E1D4] hover:border-[#B08D57]/50 rounded-xs transition-colors flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span className="text-[11px] font-semibold text-[#B08D57]">Quick Test:</span>
                    <span className="text-[11px] text-[#6B7280]">client@crestshore.com</span>
                  </div>
                  <span className="text-[10px] uppercase text-[#B08D57] font-semibold">
                    Auto-Fill
                  </span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] py-3 rounded-xs text-xs font-semibold uppercase tracking-[0.18em] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#FFFDF8] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Sign In to Account</span>
                )}
              </button>
            </form>
          ) : (
            /* ================= REGISTER FORM ================= */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#102A43] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Lord Alexander Sterling"
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#102A43] placeholder-[#6B7280]/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#102A43] mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="alexander@familyoffice.ae"
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#102A43] placeholder-[#6B7280]/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#102A43] mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#102A43] placeholder-[#6B7280]/60 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#102A43] mb-1.5">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min. 8 chars"
                      className="w-full bg-[#F7F3EA] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs px-3 py-2.5 text-xs text-[#102A43] placeholder-[#6B7280]/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#102A43] mb-1.5">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full bg-[#F7F3EA] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs px-3 py-2.5 text-xs text-[#102A43] placeholder-[#6B7280]/60 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#6B7280]">
                <ShieldCheck className="w-4 h-4 text-[#B08D57] shrink-0" />
                <span>Strict confidentiality and UAE Data Protection compliance guaranteed.</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] py-3 rounded-xs text-xs font-semibold uppercase tracking-[0.18em] transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#FFFDF8] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Create Private Account</span>
                )}
              </button>
            </form>
          )}

          {/* Luxury Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E9E1D4]" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-[#FFFDF8] px-3 text-[#6B7280]">
                {mode === 'login' ? 'Or Continue With' : 'Or Register With'}
              </span>
            </div>
          </div>

          {/* Google Authentication */}
          <GoogleAuthButton
            mode={mode === 'login' ? 'signin' : 'signup'}
            onSuccess={() => closeAuthModal()}
          />
        </div>

        {/* Footer info */}
        <div className="px-8 py-4 bg-[#F7F3EA] border-t border-[#E9E1D4] text-center text-[10px] text-[#6B7280]">
          <span>Protected by Crestshore Luxury Client Protocol • Encrypted Session</span>
        </div>
      </div>
    </div>
  );
};
export default AuthModal;

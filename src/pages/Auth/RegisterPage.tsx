import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, Mail, Lock, Eye, EyeOff, User, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { GoogleAuthButton } from '../../components/auth/GoogleAuthButton';

export const RegisterPage: React.FC = () => {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name || !email || !password) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register({
        name,
        email,
        password,
        phone: phone || undefined
      });
      navigate('/profile', { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create account. Please check details and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[#0D0D0E] relative overflow-hidden px-4 sm:px-6">
      {/* Background Architectural Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transform"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85")'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] via-[#0D0D0E]/80 to-transparent" />

      {/* Main Card Container */}
      <div className="relative w-full max-w-lg bg-[#18181A] border border-[#2A2A2E] rounded-sm shadow-2xl p-8 sm:p-10 z-10 text-white">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8F7453] via-[#C5A880] to-[#E5D2B8]" />

        {/* Brand Tag */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.25em] font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Nestandkey Private Client</span>
          </div>
          <h1 className="font-serif text-3xl font-light tracking-tight text-[#FDFCF9]">
            Create Private Account
          </h1>
          <p className="text-xs text-[#A1A1AA] font-light mt-1.5">
            Register to unlock bespoke off-market residences, direct specialist consultations, and portfolio tracking.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-950/50 border border-red-800/60 rounded-xs text-red-200 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs px-3 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs px-3 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 text-[11px] text-[#A1A1AA]">
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

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2A2A2E]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
            <span className="bg-[#18181A] px-3 text-[#71717A]">Or Register With</span>
          </div>
        </div>

        {/* Google Authentication */}
        <GoogleAuthButton
          mode="signup"
          onSuccess={() => {
            navigate('/profile', { replace: true });
          }}
        />

        {/* Footer Navigation Switch */}
        <div className="mt-8 pt-6 border-t border-[#2A2A2E] text-center text-xs">
          <p className="text-[#A1A1AA]">
            Already have an active account?{' '}
            <Link to="/login" className="text-[#C5A880] hover:underline font-bold font-mono">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

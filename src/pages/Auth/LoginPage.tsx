import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { GoogleAuthButton } from '../../components/auth/GoogleAuthButton';

export const LoginPage: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as any)?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email || !password) {
      setErrorMessage('Please enter your email and password.');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      const from = (location.state as any)?.from?.pathname || '/profile';
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid credentials. Please verify and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('client@nestandkey.com');
    setPassword('Client@123456');
    setErrorMessage(null);
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
      <div className="relative w-full max-w-md bg-[#18181A] border border-[#2A2A2E] rounded-sm shadow-2xl p-8 sm:p-10 z-10 text-white">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8F7453] via-[#C5A880] to-[#E5D2B8]" />

        {/* Brand Tag */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[#C5A880] text-[10px] font-mono uppercase tracking-[0.25em] font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Nestandkey Private Client</span>
          </div>
          <h1 className="font-serif text-3xl font-light tracking-tight text-[#FDFCF9]">
            Client Portal Sign In
          </h1>
          <p className="text-xs text-[#A1A1AA] font-light mt-1.5">
            Access your curated Dubai residences, private valuations, and direct broker advisory.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-950/50 border border-red-800/60 rounded-xs text-red-200 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@nestandkey.com"
                className="w-full bg-[#212124] border border-[#2A2A2E] focus:border-[#C5A880] rounded-xs pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#52525B] focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] uppercase tracking-wider font-mono text-[#A1A1AA]">
                Password
              </label>
              <span className="text-[10px] text-[#C5A880] font-mono">Confidential</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Quick Demo Credentials Chip */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full text-left p-2.5 bg-[#212124] hover:bg-[#2A2A2E] border border-[#2A2A2E] hover:border-[#C5A880]/50 rounded-xs transition-colors flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="text-[11px] font-mono text-[#C5A880]">Demo Test:</span>
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

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#2A2A2E]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
            <span className="bg-[#18181A] px-3 text-[#71717A]">Or Continue With</span>
          </div>
        </div>

        {/* Google Authentication */}
        <GoogleAuthButton
          mode="signin"
          onSuccess={() => {
            const from = (location.state as any)?.from?.pathname || '/profile';
            navigate(from, { replace: true });
          }}
        />

        {/* Footer Navigation Switch */}
        <div className="mt-8 pt-6 border-t border-[#2A2A2E] text-center text-xs">
          <p className="text-[#A1A1AA]">
            Don't have a private account yet?{' '}
            <Link to="/register" className="text-[#C5A880] hover:underline font-bold font-mono">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass, Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
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
    setEmail('client@crestshore.com');
    setPassword('Client@123456');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 flex items-center justify-center bg-[#F7F3EA] relative overflow-hidden px-4 sm:px-6 font-ui">
      {/* Background Architectural Atmosphere with Warm Navy/Ivory tone */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-multiply scale-105 transform"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=85")'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#F7F3EA] via-[#F7F3EA]/80 to-transparent" />

      {/* Main Card Container - Warm White #FFFDF8 */}
      <div className="relative w-full max-w-md bg-[#FFFDF8] border border-[#E9E1D4] rounded-sm shadow-2xl p-8 sm:p-10 z-10 text-[#3E4852]">
        {/* Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B08D57] via-[#D8C3A5] to-[#B08D57]" />

        {/* Brand Tag */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-[#B08D57] text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Crestshore Private Client</span>
          </div>
          <h1 className="font-display text-3xl font-medium tracking-tight text-[#102A43]">
            Client Portal Sign In
          </h1>
          <p className="text-xs text-[#6B7280] font-normal mt-1.5">
            Access your curated Dubai residences, private valuations, and direct broker advisory.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-xs text-red-800 text-xs font-mono">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#102A43] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@crestshore.com"
                className="w-full bg-[#F7F3EA] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#102A43] placeholder-[#6B7280]/60 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#102A43]">
                Password
              </label>
              <span className="text-[10px] text-[#B08D57]">Confidential</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {/* Quick Demo Credentials Chip */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full text-left p-2.5 bg-[#F7F3EA] hover:bg-[#E9E1D4]/60 border border-[#E9E1D4] hover:border-[#B08D57]/50 rounded-xs transition-colors flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                <span className="text-[11px] font-semibold text-[#B08D57]">Demo Test:</span>
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

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E9E1D4]" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
            <span className="bg-[#FFFDF8] px-3 text-[#6B7280]">Or Continue With</span>
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
        <div className="mt-8 pt-6 border-t border-[#E9E1D4] text-center text-xs">
          <p className="text-[#6B7280]">
            Don't have a private account yet?{' '}
            <Link to="/register" className="text-[#B08D57] hover:underline font-semibold">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;

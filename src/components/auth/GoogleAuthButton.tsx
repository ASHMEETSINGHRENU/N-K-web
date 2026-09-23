import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  initGoogleIdentity,
  renderGoogleButton,
  loadGoogleScript
} from '../../services/googleAuth';
import { AlertCircle, Loader2 } from 'lucide-react';
import { GOOGLE_AUTH_CONFIG } from '../../config/googleAuth';

interface GoogleAuthButtonProps {
  mode?: 'signin' | 'signup' | 'continue';
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  mode = 'continue',
  onSuccess,
  onError,
  className = ''
}) => {
  const { loginWithGoogle } = useAuth();
  const googleBtnContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const getButtonText = (): 'signin_with' | 'signup_with' | 'continue_with' => {
    if (mode === 'signup') return 'signup_with';
    if (mode === 'signin') return 'signin_with';
    return 'continue_with';
  };

  const handleCredentialSuccess = async (credential: string) => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      await loginWithGoogle(credential);
      onSuccess?.();
    } catch (err: any) {
      const msg = err.message || 'Google authentication failed';
      setAuthError(msg);
      onError?.(msg);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleInitError = (err: any) => {
    console.warn('Google Identity warning/error:', err);
    // If it's an origin mismatch, provide a friendly hint
    if (String(err?.type || err).includes('origin_mismatch')) {
      setAuthError(
        'Origin not yet authorized in Google Cloud Console. Please add http://localhost:5173 to Authorized JavaScript origins.'
      );
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function setupGoogle() {
      try {
        await loadGoogleScript();
        if (!isMounted) return;

        initGoogleIdentity(
          (credential) => {
            if (isMounted) handleCredentialSuccess(credential);
          },
          (err) => {
            if (isMounted) handleInitError(err);
          }
        );

        if (googleBtnContainerRef.current) {
          googleBtnContainerRef.current.innerHTML = '';
          renderGoogleButton(googleBtnContainerRef.current, {
            text: getButtonText(),
            theme: 'filled_black',
            size: 'large',
            width: '100%'
          });
          setIsReady(true);
        }
      } catch (err) {
        console.warn('Google script load failed or was blocked by browser:', err);
      }
    }

    setupGoogle();

    // Listen for popup OAuth token response
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === 'GOOGLE_AUTH_TOKEN' && e.data?.credential) {
        handleCredentialSuccess(e.data.credential);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      isMounted = false;
      window.removeEventListener('message', handleMessage);
    };
  }, [mode]);

  // Fallback OAuth popup handler in case GIS button doesn't mount or is blocked
  const handleFallbackClick = () => {
    setAuthError(null);
    const redirectUri = window.location.origin;
    const scope = encodeURIComponent(GOOGLE_AUTH_CONFIG.scopes);
    const clientId = encodeURIComponent(GOOGLE_AUTH_CONFIG.clientId);
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token%20id_token&scope=${scope}&nonce=n-${Date.now()}`;
    
    // Open in popup window
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      url,
      'GoogleOAuthSignIn',
      `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no`
    );

    if (!popup) {
      setAuthError('Popup blocked. Please allow popups for Google Sign-In.');
    }
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Official GIS Button Container */}
      <div className="w-full relative flex items-center justify-center min-h-[44px]">
        {/* Render container for Google Identity Services */}
        <div
          ref={googleBtnContainerRef}
          className={`w-full flex justify-center [&>div]:w-full transition-opacity duration-200 ${
            isReady && !isAuthenticating ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
          }`}
        />

        {/* Custom Luxury Dark Google Button (visible while loading or as fallback) */}
        {(!isReady || isAuthenticating) && (
          <button
            type="button"
            onClick={handleFallbackClick}
            disabled={isAuthenticating}
            className="w-full h-11 px-4 bg-[#1F1F23] hover:bg-[#27272B] active:bg-[#18181A] border border-[#2A2A2E] hover:border-[#C5A880]/60 rounded-xs text-white transition-all flex items-center justify-center gap-3 text-xs font-mono font-medium shadow-sm"
          >
            {isAuthenticating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#C5A880]" />
                <span className="text-[#C5A880]">Authenticating with Google...</span>
              </>
            ) : (
              <>
                {/* Official Google G Logo SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.665-5.17 3.665-9.12z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.39 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.13z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.61 1.25 6.58l4.03 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
                  />
                </svg>
                <span className="tracking-wide">
                  {mode === 'signup'
                    ? 'Sign up with Google'
                    : mode === 'signin'
                    ? 'Sign in with Google'
                    : 'Continue with Google'}
                </span>
              </>
            )}
          </button>
        )}
      </div>

      {authError && (
        <div className="w-full mt-2.5 p-2.5 bg-red-950/40 border border-red-800/50 rounded-xs flex items-start gap-2 text-red-300 text-[11px] font-mono leading-relaxed">
          <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
          <p>{authError}</p>
        </div>
      )}
    </div>
  );
};

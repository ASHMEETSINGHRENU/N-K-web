import { GOOGLE_AUTH_CONFIG } from '../config/googleAuth';

export interface GoogleUserPayload {
  iss?: string;
  sub: string;
  email: string;
  email_verified?: boolean;
  name: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: number;
  exp?: number;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string; select_by?: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            prompt_parent_id?: string;
            error_callback?: (error: any) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              type?: 'standard' | 'icon';
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'small' | 'medium' | 'large';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              logo_alignment?: 'left' | 'center';
              width?: number | string;
              locale?: string;
            }
          ) => void;
          prompt: (momentListener?: (notification: any) => void) => void;
          disableAutoSelect: () => void;
        };
      };
    };
  }
}

/**
 * Safely decodes the Google JWT ID token payload
 */
export function decodeGoogleJwt(token: string): GoogleUserPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token format');
    }
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as GoogleUserPayload;
  } catch (err) {
    console.error('Failed to decode Google ID Token:', err);
    return null;
  }
}

let scriptLoadPromise: Promise<void> | null = null;

/**
 * Dynamically loads the Google Identity Services client script
 */
export function loadGoogleScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();

  if (window.google?.accounts?.id) {
    return Promise.resolve();
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    // Check if script element already exists
    const existingScript = document.querySelector(`script[src="${GOOGLE_AUTH_CONFIG.scriptUrl}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.src = GOOGLE_AUTH_CONFIG.scriptUrl;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve();
    };
    script.onerror = (err) => {
      console.error('Failed to load Google Identity Services script:', err);
      scriptLoadPromise = null;
      reject(new Error('Google Identity Services script failed to load. Check network or ad-blocker.'));
    };
    document.head.appendChild(script);
  });

  return scriptLoadPromise;
}

/**
 * Initializes Google Identity Services with client ID and callback
 */
export function initGoogleIdentity(
  onSuccess: (credential: string) => void,
  onError?: (err: any) => void
): void {
  if (!window.google?.accounts?.id) {
    console.warn('Google accounts ID library not yet initialized');
    return;
  }

  try {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_AUTH_CONFIG.clientId,
      callback: (response) => {
        if (response?.credential) {
          onSuccess(response.credential);
        } else {
          onError?.(new Error('No credential returned from Google'));
        }
      },
      auto_select: false,
      cancel_on_tap_outside: true,
      error_callback: (error) => {
        console.warn('Google Identity error callback:', error);
        onError?.(error);
      }
    });
  } catch (err) {
    console.error('Error during Google Identity initialization:', err);
    onError?.(err);
  }
}

/**
 * Renders the Google Sign-In button into a specified container
 */
export function renderGoogleButton(
  container: HTMLElement,
  options: {
    text?: 'signin_with' | 'signup_with' | 'continue_with';
    theme?: 'outline' | 'filled_blue' | 'filled_black';
    size?: 'small' | 'medium' | 'large';
    width?: number | string;
  } = {}
): void {
  if (!window.google?.accounts?.id) {
    console.warn('Cannot render Google button: Google Identity library not ready');
    return;
  }

  window.google.accounts.id.renderButton(container, {
    type: 'standard',
    theme: options.theme || 'filled_black',
    size: options.size || 'large',
    text: options.text || 'continue_with',
    shape: 'rectangular',
    logo_alignment: 'left',
    width: options.width || '100%'
  });
}

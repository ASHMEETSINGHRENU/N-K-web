import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { decodeGoogleJwt, GoogleUserPayload } from '../services/googleAuth';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  avatar?: string;
  createdAt?: string;
  brokerProfile?: any;
  isGoogleAuth?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  updateProfile: (data: { name?: string; phone?: string; avatar?: string }) => Promise<void>;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('nestandkey_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    async function loadUser() {
      // 1. Try standard backend JWT token
      if (token) {
        try {
          const res = await api.getMe();
          if (res?.user) {
            // Restore Google avatar if not saved on backend
            const cachedGoogle = localStorage.getItem('nestandkey_google_session');
            if (cachedGoogle) {
              try {
                const parsed = JSON.parse(cachedGoogle);
                if (parsed.user?.avatar && !res.user.avatar) {
                  res.user.avatar = parsed.user.avatar;
                }
              } catch (_) {}
            }
            setUser(res.user);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Backend token invalid or expired, checking fallback session.');
          localStorage.removeItem('nestandkey_token');
          setToken(null);
        }
      }

      // 2. Try Google local authenticated session
      const cachedGoogle = localStorage.getItem('nestandkey_google_session');
      if (cachedGoogle) {
        try {
          const parsed = JSON.parse(cachedGoogle);
          if (parsed?.user && parsed.expiresAt && Date.now() < parsed.expiresAt) {
            setUser(parsed.user);
            setIsLoading(false);
            return;
          } else {
            localStorage.removeItem('nestandkey_google_session');
          }
        } catch (_) {
          localStorage.removeItem('nestandkey_google_session');
        }
      }

      setUser(null);
      setIsLoading(false);
    }
    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await api.login({ email, password });
    if (!res?.token) {
      throw new Error(res?.message || 'Authentication failed');
    }
    localStorage.setItem('nestandkey_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setIsAuthModalOpen(false);
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string }) => {
    const res = await api.register({ ...data, role: 'CLIENT' });
    if (!res?.token) {
      throw new Error(res?.message || 'Registration failed');
    }
    localStorage.setItem('nestandkey_token', res.token);
    setToken(res.token);
    setUser(res.user);
    setIsAuthModalOpen(false);
  };

  const loginWithGoogle = async (credential: string) => {
    setIsLoading(true);
    try {
      const payload = decodeGoogleJwt(credential);
      if (!payload || !payload.email) {
        throw new Error('Could not decode Google user credentials.');
      }

      // Deterministic password for synchronization with database
      const syntheticPassword = `GoogleAuth_${payload.sub.slice(0, 10)}_Nk2026!`;

      let backendUser: any = null;
      let backendToken: string | null = null;

      // Try login first with existing synced account
      try {
        const loginRes = await api.login({
          email: payload.email,
          password: syntheticPassword
        });
        if (loginRes?.token) {
          backendToken = loginRes.token;
          backendUser = loginRes.user;
        }
      } catch (_) {
        // Not registered yet or different password
      }

      // If not yet registered, create user in backend MongoDB
      if (!backendToken) {
        try {
          const regRes = await api.register({
            name: payload.name || 'Google Client',
            email: payload.email,
            password: syntheticPassword,
            role: 'CLIENT'
          });
          if (regRes?.token) {
            backendToken = regRes.token;
            backendUser = regRes.user;
          }
        } catch (_) {
          // If backend registration failed, proceed to local session
        }
      }

      if (backendToken && backendUser) {
        if (payload.picture && !backendUser.avatar) {
          backendUser.avatar = payload.picture;
          api.updateProfile({ avatar: payload.picture }).catch(() => {});
        }
        localStorage.setItem('nestandkey_token', backendToken);
        setToken(backendToken);
        const fullUser = {
          ...backendUser,
          avatar: payload.picture || backendUser.avatar,
          isGoogleAuth: true
        };
        setUser(fullUser);
        localStorage.setItem(
          'nestandkey_google_session',
          JSON.stringify({
            user: fullUser,
            credential,
            expiresAt: payload.exp ? payload.exp * 1000 : Date.now() + 7 * 86400000
          })
        );
      } else {
        // Resilient Google session fallback
        const localGoogleUser: User = {
          _id: `google_${payload.sub}`,
          name: payload.name || 'Google VIP Client',
          email: payload.email,
          avatar: payload.picture,
          role: 'CLIENT',
          createdAt: new Date().toISOString(),
          isGoogleAuth: true
        };
        localStorage.setItem(
          'nestandkey_google_session',
          JSON.stringify({
            user: localGoogleUser,
            credential,
            expiresAt: payload.exp ? payload.exp * 1000 : Date.now() + 7 * 86400000
          })
        );
        setUser(localGoogleUser);
      }

      setIsAuthModalOpen(false);
    } catch (err: any) {
      console.error('Google Sign-In error:', err);
      throw new Error(err.message || 'Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: { name?: string; phone?: string; avatar?: string }) => {
    // If backend token is present, update on server
    if (token) {
      const res = await api.updateProfile(data);
      if (res?.user) {
        setUser((prev) => (prev ? { ...prev, ...res.user } : res.user));
      }
    } else if (user) {
      // Update local Google session
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      const cached = localStorage.getItem('nestandkey_google_session');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          localStorage.setItem(
            'nestandkey_google_session',
            JSON.stringify({ ...parsed, user: updatedUser })
          );
        } catch (_) {}
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('nestandkey_token');
    localStorage.removeItem('nestandkey_google_session');
    setToken(null);
    setUser(null);
    if (window.google?.accounts?.id?.disableAutoSelect) {
      try {
        window.google.accounts.id.disableAutoSelect();
      } catch (_) {}
    }
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        loginWithGoogle,
        updateProfile,
        logout,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

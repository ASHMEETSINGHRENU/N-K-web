const DEFAULT_CLIENT_ID = [
  '398965293452-h343m34lp84fatu70ucr8rnk1gps75c8',
  'apps.googleusercontent.com'
].join('.');

export const GOOGLE_AUTH_CONFIG = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || DEFAULT_CLIENT_ID,
  scriptUrl: 'https://accounts.google.com/gsi/client',
  scopes: 'openid email profile'
};

const ACCESS_TOKEN_KEY = 'accessToken';

export const tokenStorage = {
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};

export const applyAuthorizationHeader = (headers: any, token: string) => {
  if (!headers) return;

  if ('set' in headers && typeof headers.set === 'function') {
    headers.set('Authorization', token);
  } else {
    headers['Authorization'] = token;
  }
};

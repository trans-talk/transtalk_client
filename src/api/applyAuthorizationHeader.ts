export const applyAuthorizationHeader = (headers: any, token: string) => {
  if (!headers) return;

  if ('set' in headers && typeof headers.set === 'function') {
    headers.set('Authorization', `Bearer ${token}`);
  } else {
    headers['Authorization'] = `Bearer ${token}`;
  }
};

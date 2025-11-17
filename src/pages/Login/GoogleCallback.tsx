import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useLogin from '@pages/Login/hooks/use-login';

export default function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogin } = useLogin();

  const hasCalled = useRef(false);

  useEffect(() => {
    // To solve Strict mode problem
    if (hasCalled.current) return;
    hasCalled.current = true;

    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    console.log(code);

    if (!code) {
      console.error('Authorization code not found');
      return;
    }

    handleLogin(code);
  }, [location.search, handleLogin, navigate]);

  return null;
}

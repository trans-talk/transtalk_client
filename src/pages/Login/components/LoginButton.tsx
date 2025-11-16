import { useTranslation } from 'react-i18next';

import GoogleLogo from '@assets/logo/google-logo.svg';
import useLogin from '@pages/Login/hooks/use-login';

export default function LoginButton() {
  const { t } = useTranslation();

  const { handleAuthorizationCode } = useLogin();

  const handleLogin = async () => {
    try {
      const response = await handleAuthorizationCode();
      const redirectUrl = response.data;

      if (!redirectUrl) {
        console.error('Empty redirect URL from /auth');
        return;
      }

      window.location.href = redirectUrl;
    } catch (e) {
      console.error('Login error', e);
    }
  };

  return (
    <button
      type='button'
      className='flex w-[80%] max-w-[30rem] flex-row items-center justify-center gap-[1rem] rounded-[1rem] bg-white py-[1.2rem] shadow-[0_0_20px_0_rgba(0,0,0,0.15)]'
      onClick={handleLogin}
    >
      <img className='h-[2rem] w-[2rem]' src={GoogleLogo} alt='Google Logo' />
      <span className='body-14'>{t('login.button')}</span>
    </button>
  );
}

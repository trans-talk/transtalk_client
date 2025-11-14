import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '@router/routes';
import GoogleLogo from '@assets/logo/google-logo.svg';

export default function LoginButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // TODO: Social Login API integration
  const handleLogin = () => {
    navigate(ROUTES.HOME);
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

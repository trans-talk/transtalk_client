import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@router/routes';
import GoogleLogo from '@assets/logo/google-logo.svg';

export default function LoginButton() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <button
      type='button'
      className='flex w-[80%] max-w-[30rem] flex-row items-center justify-center gap-[1rem] rounded-[1rem] bg-white py-[1.2rem] shadow-[4px_4px_4px_0_rgba(0,0,0,0.25),0_0_4px_0_rgba(0,0,0,0.25)]'
      onClick={handleLogin}
    >
      <img className='h-[2rem] w-[2rem]' src={GoogleLogo} alt='Google Logo' />
      <span className='body-14'>Sign With Google</span>
    </button>
  );
}

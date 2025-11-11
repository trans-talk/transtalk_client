import TransTalkLogo from '@assets/logo/transtalk-logo.svg';
import LoginButton from '@pages/Login/components/LoginButton';

export default function Login() {
  return (
    <div className='absolute top-1/2 left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[4.5rem]'>
      <div className='flex flex-col items-center gap-[2.4rem]'>
        <img
          className='h-[8rem] w-[8rem]'
          src={TransTalkLogo}
          alt='TransTalk Logo'
        />
        <h1 className='header-20'>TransTalk</h1>
        <span className='body-16'>메시지를 보내면 자동으로 번역됩니다.</span>
      </div>
      <LoginButton />
      <span className='body-14 text-grayscale-4'>
        로그인하여 TransTalk을 시작하세요!
      </span>
    </div>
  );
}

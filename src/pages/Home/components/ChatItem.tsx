import { ROUTES } from '@router/routes';
import { useNavigate } from 'react-router-dom';

export interface ChatItemType {
  chatId: number;
  profileImage: string;
  name: string;
  originalMessage: string;
  translatedMessage: string;
  language: string;
  recentChatTime: string;
  unreadChatCount: number;
}

export default function ChatItem({
  chatId,
  profileImage,
  name,
  originalMessage,
  translatedMessage,
  language,
  recentChatTime,
  unreadChatCount,
}: ChatItemType) {
  const navigate = useNavigate();

  // TODO : update navigate logic
  const handleToChatRoom = () => {
    alert(`${chatId}번 방으로 이동`);
    navigate(ROUTES.HOME);
  };

  return (
    <button
      className='border-grayscale-3 flex flex-row items-start border-b p-[2rem]'
      type='button'
      onClick={handleToChatRoom}
    >
      <div className='flex w-full flex-row gap-[1.4rem]'>
        <img
          className='h-[6rem] w-[6rem] rounded-full'
          src={profileImage ?? 'https://placehold.co/50'}
          alt='Profile Image'
        />
        <div className='flex w-full flex-col gap-[0.5rem]'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-[0.8rem]'>
              <span className='title-16'>{name}</span>
              <div className='caption-10 bg-primary-3 flex items-center rounded-[0.8rem] px-[1.3rem] py-[0.3rem] text-white'>
                {language}
              </div>
            </div>
            <span className='body-14 text-grayscale-4'>{recentChatTime}</span>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col items-start'>
              <span className='body-14'>{originalMessage}</span>
              <span className='body-12 text-grayscale-4'>
                {translatedMessage}
              </span>
            </div>
            <div className='bg-primary-5 body-12 flex h-[2rem] w-[2rem] items-center justify-center rounded-full text-white'>
              {unreadChatCount}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

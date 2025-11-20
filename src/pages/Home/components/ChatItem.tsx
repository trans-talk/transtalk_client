import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@router/routes';
import type { ChatRoomType } from '@type/room';
import { formatLanguage } from '@pages/Home/utils/format-language';
import { formatMessageTime, isToday } from '@utils/time';

interface ChatItemProps {
  chat: ChatRoomType;
}

export default function ChatItem({ chat }: ChatItemProps) {
  const navigate = useNavigate();

  const {
    chatroomId,
    recipientPicture,
    recipientName,
    originalRecentMessage,
    translatedRecentMessage,
    selectedLanguage,
    recentMessageTime,
    unreadMessageCount,
  } = chat;

  const { datePart, timePart } = formatMessageTime(recentMessageTime);

  const handleToChatRoom = () => {
    navigate(`${ROUTES.CHAT_ROOM}/${chatroomId}`);
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
          src={recipientPicture ?? 'https://placehold.co/50'}
          alt='Profile Image'
        />
        <div className='flex flex-1 flex-col gap-[0.5rem]'>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center gap-[0.8rem]'>
              <span className='title-16'>{recipientName}</span>
              <div className='caption-10 bg-primary-3 flex items-center rounded-[0.8rem] px-[1.3rem] py-[0.3rem] text-white'>
                {formatLanguage(selectedLanguage)}
              </div>
            </div>
            {recentMessageTime && (
              <span className='body-14 text-grayscale-4'>
                {isToday(recentMessageTime) ? timePart : datePart}
              </span>
            )}
          </div>
          <div className='flex flex-row items-center justify-between'>
            <div className='flex flex-col items-start'>
              <span className='body-14'>{originalRecentMessage}</span>
              <span className='body-12 text-grayscale-4'>
                {translatedRecentMessage}
              </span>
            </div>
            {unreadMessageCount !== 0 && (
              <div className='bg-primary-5 body-12 flex h-[2rem] w-[2rem] items-center justify-center rounded-full text-white'>
                {unreadMessageCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}

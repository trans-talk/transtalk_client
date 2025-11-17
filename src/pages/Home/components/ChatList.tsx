import { useTranslation } from 'react-i18next';
import ChatItem from '@pages/Home/components/ChatItem';
import type { ChatRoomType } from '@type/room';

interface ChatListProps {
  chatList: ChatRoomType[] | null;
}

export default function ChatList({ chatList }: ChatListProps) {
  const { t } = useTranslation();

  return (
    <div className='flex w-full flex-col'>
      {chatList?.map(chat => (
        <ChatItem key={chat.chatroomId} chat={chat} />
      ))}
      {chatList?.length === 0 && (
        <div className='mt-[20rem] flex w-full items-center justify-center'>
          <span className='text-grayscale-4 body-14 text-center whitespace-pre-line'>
            {t('home.empty')}
          </span>
        </div>
      )}
    </div>
  );
}

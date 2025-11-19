import { useTranslation } from 'react-i18next';
import ChatItem from '@pages/Home/components/ChatItem';
import { useChatRoomListQuery } from '@pages/Home/hooks/use-chat-room-list-query';

interface ChatListProps {}

export default function ChatList({}: ChatListProps) {
  const { t } = useTranslation();
  const { listBottomRef, chatList, isFetchingNextPage } =
    useChatRoomListQuery();

  return (
    <div className='flex w-full flex-col'>
      {chatList?.map(chat => (
        <ChatItem key={chat.chatroomId} chat={chat} />
      ))}

      <div ref={listBottomRef} className='h-[0.1rem] w-full' />
      {isFetchingNextPage && (
        <div className='text-grayscale-4 body-14 text-center'>Loading...</div>
      )}
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

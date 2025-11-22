import { useTranslation } from 'react-i18next';
import ChatItem from '@pages/Home/components/ChatItem';
import { useChatRoomListQuery } from '@pages/Home/hooks/use-chat-room-list-query';
import Loading from '@components/Loading';

interface ChatListProps {
  searchText: string;
}

export default function ChatList({ searchText }: ChatListProps) {
  const { t } = useTranslation();
  const { listBottomRef, chatList, isFetchingNextPage, isPendingChatRoomList } =
    useChatRoomListQuery(searchText);

  if (isPendingChatRoomList) {
    return (
      <div className='mt-[20rem] flex w-full items-center justify-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col'>
      {chatList?.map(chat => (
        <ChatItem key={chat.chatroomId} chat={chat} />
      ))}

      <div ref={listBottomRef} className='h-[0.1rem] w-full' />
      {isFetchingNextPage && <Loading />}
      {chatList?.length === 0 &&
        (searchText === '' ? (
          <div className='mt-[20rem] flex w-full items-center justify-center'>
            <span className='text-grayscale-4 body-14 text-center whitespace-pre-line'>
              {t('home.empty')}
            </span>
          </div>
        ) : (
          <div className='mt-[20rem] flex w-full items-center justify-center'>
            <span className='text-grayscale-4 body-14 text-center whitespace-pre-line'>
              {t('home.result_empty')}
            </span>
          </div>
        ))}
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import MessageItem from '@pages/ChatRoom/components/MessageItem';
import useChatHistory from '@pages/ChatRoom/hooks/use-chat-history';
import Loading from '@components/Loading';

interface MessageListProps {
  chatRoomId: string;
}

export default function MessageList({ chatRoomId }: MessageListProps) {
  const { t } = useTranslation();
  const { listTopRef, chatHistory, isFetchingNextPage } =
    useChatHistory(chatRoomId);
  const reversed = [...chatHistory].reverse();
  return (
    <>
      {chatHistory.length !== 0 ? (
        <div className='flex w-full flex-col gap-[1.5rem] p-[1.5rem] pb-[8rem]'>
          {isFetchingNextPage && <Loading />}
          {reversed.map((message, index) => {
            const isTopItem = index === 0;
            return (
              <div
                key={message.chatId}
                ref={isTopItem ? listTopRef : undefined}
              >
                <MessageItem message={message} />
              </div>
            );
          })}
        </div>
      ) : (
        <div className='mt-[2rem] flex w-full justify-center'>
          <span className='body-14 text-grayscale-4'>
            {t('chatRoom.empty')}
          </span>
        </div>
      )}
    </>
  );
}

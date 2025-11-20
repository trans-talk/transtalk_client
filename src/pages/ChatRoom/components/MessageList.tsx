import { useTranslation } from 'react-i18next';

import Loading from '@components/Loading';
import { formatMessageTime } from '@utils/time';
import MessageItem from '@pages/ChatRoom/components/MessageItem';
import useChatHistoryQuery from '@pages/ChatRoom/hooks/use-chat-history-query';
import { getIsFirstOfDay } from '@pages/ChatRoom/utils/get-is-first-of-day';

interface MessageListProps {
  chatRoomId: string;
}

export default function MessageList({ chatRoomId }: MessageListProps) {
  const { t } = useTranslation();
  const { listTopRef, chatHistory, isFetchingNextPage } =
    useChatHistoryQuery(chatRoomId);
  const reversed = [...chatHistory].reverse();

  const renderDateLabel = (date: string) => {
    return (
      <div className='flex w-full justify-center'>
        <span className='body-14 bg-grayscale-3 text-grayscale-6 my-[1rem] block w-fit rounded-full px-[3.5rem] py-[0.5rem] text-center'>
          {date}
        </span>
      </div>
    );
  };

  return (
    <>
      {chatHistory.length !== 0 ? (
        <div className='flex w-full flex-col gap-[1.8rem] px-[1.5rem] pt-[1rem] pb-[8rem]'>
          {isFetchingNextPage && <Loading />}
          {reversed.map((message, index) => {
            const isTopItem = index === 0;

            const { datePart } = formatMessageTime(message.sendAt);
            const isFirstOfDay = getIsFirstOfDay(reversed, index);

            return (
              <div
                key={message.chatId}
                ref={isTopItem ? listTopRef : undefined}
              >
                {isFirstOfDay && renderDateLabel(datePart)}
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

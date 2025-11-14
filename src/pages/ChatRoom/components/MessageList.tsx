import { useTranslation } from 'react-i18next';
import MessageItem from '@pages/ChatRoom/components/MessageItem';
import type { MessageType } from '@pages/ChatRoom/types/chat-room-type';

interface MessageListProps {
  messageList: MessageType[];
}

export default function MessageList({ messageList }: MessageListProps) {
  const { t } = useTranslation();

  return (
    <>
      {messageList.length !== 0 ? (
        <div className='flex w-full flex-col gap-[1.5rem] px-[1.5rem] pt-[1.5rem] pb-[8rem]'>
          {messageList.map(message => (
            <MessageItem key={message.chatId} message={message} />
          ))}
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

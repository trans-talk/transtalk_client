import type { MessageType } from '@pages/ChatRoom/types/chat-room-type';

interface MessageItemProps {
  message: MessageType;
}

export default function MessageItem({ message }: MessageItemProps) {
  const { isUser, original, target, isUnread, chatTime } = message;

  const messageAlignStyle = isUser ? 'items-end' : 'items-start';
  const baseMessageStyle =
    'body-16 max-w-[75%] px-[1.5rem] py-[1rem] rounded-[2rem]';

  const originalMessageStyle = isUser
    ? `${baseMessageStyle} bg-primary-5 text-white rounded-br-[0.7rem]`
    : `${baseMessageStyle} bg-white text-black rounded-bl-[0.7rem]`;

  const translatedMessageStyle = isUser
    ? `${baseMessageStyle} border bg-primary-1 border-primary-2 text-primary-5 rounded-br-[0.7rem]`
    : `${baseMessageStyle} border bg-grayscale-2 border-grayscale-3 text-grayscale-6 rounded-bl-[0.7rem]`;

  return (
    <div className={`flex flex-col gap-[0.5rem] ${messageAlignStyle}`}>
      <div className={originalMessageStyle}>{original}</div>
      <div
        className={`flex w-full flex-row items-end gap-[1rem] ${isUser && 'justify-end'}`}
      >
        {isUnread && (
          <span className='caption-10 text-primary-5 py-[0.3rem]'>1</span>
        )}
        <div className={translatedMessageStyle}>{target}</div>
      </div>
      <span className='text-grayscale-4 px-[1rem]'>{chatTime}</span>
    </div>
  );
}

import type { MessageType } from '@pages/ChatRoom/types/chat-room-type';

interface MessageItemProps {
  message: MessageType;
}

export default function MessageItem({ message }: MessageItemProps) {
  const messageAlignStyle = message.isUser ? 'items-end' : 'items-start';
  const baseMessageStyle =
    'body-16 max-w-[75%] px-[1.5rem] py-[1rem] rounded-[2rem]';

  const originalMessageStyle = message.isUser
    ? `${baseMessageStyle} bg-primary-5 text-white rounded-br-[0.7rem]`
    : `${baseMessageStyle} bg-white text-black rounded-bl-[0.7rem]`;

  const translatedMessageStyle = message.isUser
    ? `${baseMessageStyle} border bg-primary-1 border-primary-2 text-primary-5 rounded-br-[0.7rem]`
    : `${baseMessageStyle} border bg-grayscale-2 border-grayscale-3 text-grayscale-6 rounded-bl-[0.7rem]`;

  return (
    <div
      key={message.chatId}
      className={`flex flex-col gap-[0.5rem] ${messageAlignStyle}`}
    >
      <div className={originalMessageStyle}>{message.original}</div>
      <div className={translatedMessageStyle}>{message.target}</div>
      <span className='text-grayscale-4 px-[1rem]'>{message.chatTime}</span>
    </div>
  );
}

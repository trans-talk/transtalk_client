import ChatItem, { type ChatItemType } from '@pages/Home/components/ChatItem';

interface ChatListProps {
  chatList: ChatItemType[] | null;
}

export default function ChatList({ chatList }: ChatListProps) {
  return (
    <div className='flex w-full flex-col'>
      {chatList?.map(chat => (
        <ChatItem
          key={chat.chatId}
          chatId={chat.chatId}
          profileImage={chat.profileImage}
          name={chat.name}
          originalMessage={chat.originalMessage}
          translatedMessage={chat.translatedMessage}
          language={chat.language}
          recentChatTime={chat.recentChatTime}
          unreadChatCount={chat.unreadChatCount}
        />
      ))}
      {chatList?.length === 0 && (
        <div className='mt-[20rem] flex w-full items-center justify-center'>
          <span className='text-grayscale-4 body-14 text-center whitespace-pre-line'>
            {`채팅 내역이 없습니다.\n채팅방을 만들어 대화를 나누어 보세요!`}
          </span>
        </div>
      )}
    </div>
  );
}

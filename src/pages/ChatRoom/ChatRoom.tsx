import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowLeft from '@assets/ui/arrow-left.svg';
import Header from '@components/Header';
import ChatPartnerProfile from '@pages/ChatRoom/components/ChatPartnerProfile';
import { dummyChatRoom } from '@pages/ChatRoom/dummy-chat-room';
import type {
  MessageType,
  UserDataType,
} from '@pages/ChatRoom/types/chat-room-type';
import MessageInput from '@pages/ChatRoom/components/MessageInput';
import MessageList from '@pages/ChatRoom/components/MessageList';
import FloatingScrollButton from '@components/FloatingScrollButton';

export default function ChatRoom() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [messageList, setMessageList] = useState<MessageType[] | null>(null);
  const [inputText, setInputText] = useState('');

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  const handleSendMessage = () => {
    // TODO : connect api.
    console.log(inputText.trim(), ' send!');
    setInputText('');
  };

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'instant',
      });
    });

    // TODO : connect api.
    setUserData(dummyChatRoom.user);
    setMessageList(dummyChatRoom.messageList);

    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className='bg-grayscale-1 min-h-dvh pt-[7rem]'>
      <Header
        left={
          <button
            type='button'
            className='flex h-[3.5rem] w-[3.5rem] items-center justify-center'
            onClick={handleGoBack}
          >
            <img src={ArrowLeft} alt='Go Back Button' />
          </button>
        }
      >
        {userData && (
          <ChatPartnerProfile
            profileImage={userData?.profileImage}
            name={userData?.name}
            email={userData?.email}
          />
        )}
      </Header>
      {messageList && <MessageList messageList={messageList} />}
      <MessageInput
        inputText={inputText}
        handleChangeInputText={handleChangeInputText}
        handleSendMessage={handleSendMessage}
      />
      <FloatingScrollButton isScrollTop={false} />
    </div>
  );
}

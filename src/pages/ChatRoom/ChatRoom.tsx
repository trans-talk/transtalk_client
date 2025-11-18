import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ArrowLeft from '@assets/ui/arrow-left.svg';
import Header from '@components/Header';
import ChatPartnerProfile from '@pages/ChatRoom/components/ChatPartnerProfile';

import MessageInput from '@pages/ChatRoom/components/MessageInput';
import MessageList from '@pages/ChatRoom/components/MessageList';
import FloatingScrollButton from '@components/FloatingScrollButton';
import useSubscribeChatHistory from '@pages/ChatRoom/hooks/use-subscribe-chat-history';
import useChatHistory from '@pages/ChatRoom/hooks/use-chat-history';
import { ROUTES } from '@router/routes';

export default function ChatRoom() {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();

  if (!chatRoomId) {
    alert('방 정보가 없습니다');
    throw new Error();
  }

  const {
    listTopRef,
    chatHistory,
    recipient,
    isPending,
    isError,
    isFetchingNextPage,
  } = useChatHistory(chatRoomId);

  const { sendMessage } = useSubscribeChatHistory(chatRoomId);

  const [inputText, setInputText] = useState('');
  const isInitialScrollDoneRef = useRef(false);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInputText('');
  };

  useEffect(() => {
    if (!chatHistory || chatHistory.length === 0) return;
    if (isInitialScrollDoneRef.current) return;

    const timer = requestAnimationFrame(() => {
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      window.scrollTo({
        top: scrollHeight,
        behavior: 'auto',
      });
      isInitialScrollDoneRef.current = true;
    });
    return () => cancelAnimationFrame(timer);
  }, [chatHistory]);

  if (isPending) {
    return (
      <div className='text-grayscale-4 body-14 w-full pt-[20rem] text-center'>
        Loading...
      </div>
    );
  }

  if (isError) {
    alert('방정보 오류입니다.');
    navigate(ROUTES.HOME);
  }

  return (
    <div className='bg-grayscale-1 min-h-dvh pt-[7rem]'>
      <div ref={listTopRef} className='h-[0.1rem] w-full' />
      {isFetchingNextPage && (
        <div className='text-grayscale-4 body-14 pt-[1rem] text-center'>
          Loading...
        </div>
      )}
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
        {recipient && (
          <ChatPartnerProfile
            recipientPicture={recipient.recipientPicture}
            recipientEmail={recipient.recipientEmail}
            recipientName={recipient.recipientName}
          />
        )}
      </Header>

      {chatHistory && <MessageList messageList={chatHistory} />}
      <MessageInput
        inputText={inputText}
        handleChangeInputText={handleChangeInputText}
        handleSendMessage={handleSendMessage}
      />
      <FloatingScrollButton isScrollTop={false} />
    </div>
  );
}

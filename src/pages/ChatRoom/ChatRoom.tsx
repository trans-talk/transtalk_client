import { useNavigate, useParams } from 'react-router-dom';

import ArrowLeft from '@assets/ui/arrow-left.svg';
import Header from '@components/Header';
import ChatPartnerProfile from '@pages/ChatRoom/components/ChatPartnerProfile';
import MessageInput from '@pages/ChatRoom/components/MessageInput';
import MessageList from '@pages/ChatRoom/components/MessageList';
import FloatingScrollButton from '@components/FloatingScrollButton';
import useChatHistory from '@pages/ChatRoom/hooks/use-chat-history';
import { ROUTES } from '@router/routes';
import Loading from '@components/Loading';

export default function ChatRoom() {
  const navigate = useNavigate();
  const { chatRoomId } = useParams();

  if (!chatRoomId) {
    alert('방 정보가 없습니다');
    throw new Error();
  }

  const {
    chatContainerRef,
    recipient,
    inputText,
    isPending,
    isError,
    handleGoBack,
    handleChangeInputText,
    handleSendMessage,
  } = useChatHistory(chatRoomId);

  if (isPending) {
    return (
      <div className='w-full pt-[20rem] text-center'>
        <Loading />
      </div>
    );
  }

  if (isError) {
    alert('방정보 오류입니다.');
    navigate(ROUTES.HOME);
  }

  return (
    <div className='bg-grayscale-1 min-h-dvh'>
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
      <div ref={chatContainerRef} className='pt-[7rem]'>
        <MessageList chatRoomId={chatRoomId} />
      </div>
      <MessageInput
        inputText={inputText}
        handleChangeInputText={handleChangeInputText}
        handleSendMessage={handleSendMessage}
      />

      <FloatingScrollButton isScrollTop={false} />
    </div>
  );
}

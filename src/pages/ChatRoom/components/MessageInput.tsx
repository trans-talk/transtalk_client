import { useTranslation } from 'react-i18next';
import SendIcon from '@assets/ui/send.svg';
import useSendMessage from '@pages/ChatRoom/hooks/use-send-message';

interface MessageInputProps {
  chatRoomId: string;
}

export default function MessageInput({ chatRoomId }: MessageInputProps) {
  const { t } = useTranslation();

  const { inputText, handleChangeInputText, handleSendMessage } =
    useSendMessage(chatRoomId);

  const isDisabledToSend = inputText.trim() === '';
  const handleOnKeyDownSendMessage = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey && inputText.trim() !== '') {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className='fixed bottom-[0] flex w-full max-w-[60rem] gap-[1.5rem] bg-white px-[1.5rem] py-[1rem]'>
      <input
        className='placeholder:text-grayscale-5 bg-grayscale-2 body-14 flex-1 appearance-none rounded-[3rem] px-[1.5rem] py-[1.2rem]'
        type='text'
        value={inputText}
        onChange={handleChangeInputText}
        onKeyDown={handleOnKeyDownSendMessage}
        placeholder={t('chatRoom.input')}
      />
      <button
        type='button'
        className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full ${isDisabledToSend ? 'bg-primary-2' : 'bg-primary-5'}`}
        onClick={handleSendMessage}
        disabled={isDisabledToSend}
      >
        <img src={SendIcon} alt='Send' />
      </button>
    </div>
  );
}

import SendIcon from '@assets/ui/send.svg';

interface MessageInputProps {
  inputText: string;
  handleChangeInputText: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
}

export default function MessageInput({
  inputText,
  handleChangeInputText,
  handleSendMessage,
}: MessageInputProps) {
  const handleOnKeyDownSendMessage = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
        placeholder='메시지를 입력하세요..'
      />
      <button
        type='button'
        className='bg-primary-5 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full'
        onClick={handleSendMessage}
      >
        <img src={SendIcon} alt='Send' />
      </button>
    </div>
  );
}

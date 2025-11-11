import React, { useState } from 'react';
import CloseIcon from '@assets/ui/close.svg';

interface AddChatModalProps {
  handleCloseModal: () => void;
}

export default function AddChatModal({ handleCloseModal }: AddChatModalProps) {
  const [inputEmail, setInputEmail] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');

  const isDisabled = !inputEmail || !targetLanguage;

  const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };
  const handleChangeTargetLanguage = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTargetLanguage(e.target.value);
  };

  // TODO: add create chat logic, connect api
  const handleStartChat = () => {
    alert(`${inputEmail}, ${targetLanguage}`);
    // navigate(created chat room)
  };

  return (
    <div className='fixed top-[0] left-1/2 z-50 h-[100dvh] w-full max-w-[60rem] -translate-x-1/2 bg-black/50'>
      <div className='border-grayscale-3 absolute top-1/2 left-1/2 flex w-[80%] -translate-1/2 flex-col gap-[2rem] rounded-[1.3rem] border bg-white p-[2rem]'>
        <button
          type='button'
          onClick={handleCloseModal}
          className='absolute top-[1.5rem] right-[1.5rem]'
        >
          <img src={CloseIcon} alt='Close' />
        </button>
        <div className='flex flex-col items-center gap-[1rem]'>
          <h2 className='header-16'>New Chat</h2>
          <span className='body-14 text-grayscale-4 text-center break-keep whitespace-pre-line'>
            채팅할 사용자의 e-mail address를 입력하세요. 여러 명을 추가할 수
            있습니다.
          </span>
        </div>
        <div className='flex w-full flex-col gap-[1.2rem]'>
          <input
            className='bg-grayscale-2 body-16 placeholder:text-grayscale-5 rounded-[1rem] px-[1.5rem] py-[0.6rem]'
            type='email'
            value={inputEmail}
            onChange={e => handleChangeInputEmail(e)}
            placeholder='사용자 e-mail 입력'
          />
          <select
            className={`bg-grayscale-2 body-16 appearance-none rounded-[1rem] px-[1.5rem] py-[0.6rem] outline-none ${!targetLanguage ? 'text-grayscale-5' : 'text-black'} `}
            value={targetLanguage}
            onChange={e => handleChangeTargetLanguage(e)}
          >
            <option value='' disabled className='text-grayscale-5'>
              번역 언어
            </option>
            <option value='KO'>Korean</option>
            <option value='EN'>English</option>
            <option value='JA'>Japanese</option>
            <option value='ZH'>Chinese</option>
            <option value='ES'>Spanish</option>
          </select>
        </div>
        <button
          type='button'
          onClick={handleStartChat}
          disabled={isDisabled}
          className={`body-16 rounded-[1rem] px-[1.5rem] py-[0.8rem] text-white transition-all ${
            isDisabled
              ? 'bg-primary-2 cursor-not-allowed'
              : 'bg-primary-5 hover:bg-primary-7'
          }`}
        >
          채팅 시작하기
        </button>
      </div>
    </div>
  );
}

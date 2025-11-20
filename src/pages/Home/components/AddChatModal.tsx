import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CloseIcon from '@assets/ui/close.svg';
import useCreateNewChatQuery from '@pages/Home/hooks/use-create-new-chat-query';

interface AddChatModalProps {
  handleCloseModal: () => void;
}

export default function AddChatModal({ handleCloseModal }: AddChatModalProps) {
  const { t } = useTranslation();

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
  const { handleCreateNewChat } = useCreateNewChatQuery(
    targetLanguage,
    inputEmail
  );

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
          <h2 className='header-16'>{t('addChat.title')}</h2>
          <span className='body-14 text-grayscale-4 text-center whitespace-pre-line'>
            {t('addChat.description')}
          </span>
        </div>
        <div className='flex w-full flex-col gap-[1.2rem]'>
          <input
            className='bg-grayscale-2 body-16 placeholder:text-grayscale-5 rounded-[1rem] px-[1.5rem] py-[0.6rem]'
            type='email'
            value={inputEmail}
            onChange={e => handleChangeInputEmail(e)}
            placeholder={t('addChat.email')}
          />
          <select
            className={`bg-grayscale-2 body-16 appearance-none rounded-[1rem] px-[1.5rem] py-[0.6rem] outline-none ${!targetLanguage ? 'text-grayscale-5' : 'text-black'} `}
            value={targetLanguage}
            onChange={e => handleChangeTargetLanguage(e)}
          >
            <option value='' disabled className='text-grayscale-5'>
              {t('addChat.targetLanguage')}
            </option>
            <option value='ko'>{t('addChat.languageList.ko')}</option>
            <option value='en-us'>{t('addChat.languageList.en')}</option>
            <option value='ja'>{t('addChat.languageList.ja')}</option>
            <option value='zh'>{t('addChat.languageList.zh')}</option>
            <option value='es'>{t('addChat.languageList.es')}</option>
          </select>
        </div>
        <button
          type='button'
          onClick={() => handleCreateNewChat()}
          disabled={isDisabled}
          className={`body-16 rounded-[1rem] px-[1.5rem] py-[0.8rem] text-white transition-all ${
            isDisabled
              ? 'bg-primary-2 cursor-not-allowed'
              : 'bg-primary-5 hover:bg-primary-7'
          }`}
        >
          {t('addChat.button')}
        </button>
      </div>
    </div>
  );
}

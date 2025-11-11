import { useNavigate } from 'react-router-dom';

import SearchIcon from '@assets/ui/search.svg';
import SettingIcon from '@assets/ui/setting.svg';
import Header from '@components/Header';
import { ROUTES } from '@router/routes';
import FloatingAddChatButton from '@pages/Home/components/FloatingAddChatButton';
import { useState } from 'react';
import AddChatModal from '@pages/Home/components/AddChatModal';

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleToSettingPage = () => {
    navigate(ROUTES.SETTINGS);
  };
  return (
    <>
      <Header
        right={
          <div className='flex flex-row items-center gap-[1.5rem]'>
            <button
              type='button'
              className='flex h-[3.5rem] w-[3.5rem] items-center justify-center'
              onClick={handleToSettingPage}
            >
              <img src={SearchIcon} alt='Go Back Button' />
            </button>
            <button
              type='button'
              className='flex h-[3.5rem] w-[3.5rem] items-center justify-center'
              onClick={handleToSettingPage}
            >
              <img src={SettingIcon} alt='Go Back Button' />
            </button>
          </div>
        }
      >
        <h1 className='header-20'>Chats</h1>
      </Header>
      <div className='header-20'></div>
      <FloatingAddChatButton handleOpenModal={handleOpenModal} />
      {isModalOpen && <AddChatModal handleCloseModal={handleCloseModal} />}
    </>
  );
}

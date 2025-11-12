import { useNavigate } from 'react-router-dom';

import SearchIcon from '@assets/ui/search.svg';
import SettingIcon from '@assets/ui/setting.svg';
import Header from '@components/Header';
import { ROUTES } from '@router/routes';
import FloatingAddChatButton from '@pages/Home/components/FloatingAddChatButton';
import { useEffect, useState } from 'react';
import AddChatModal from '@pages/Home/components/AddChatModal';
import FloatingScrollButton from '@components/FloatingScrollButton';
import { dummyChatList } from '@pages/Home/dummy-chat-list';
import { type ChatItemType } from '@pages/Home/components/ChatItem';
import SearchBar from '@pages/Home/components/SearchBar';
import ChatList from '@pages/Home/components/ChatList';

export default function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatList, setChatList] = useState<ChatItemType[] | null>(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleOpenSearchMode = () => {
    setIsSearchMode(true);
  };
  const handleCloseSearchMode = () => {
    setSearchText('');
    setIsSearchMode(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleToSettingPage = () => {
    navigate(ROUTES.SETTINGS);
  };

  useEffect(() => {
    // TODO : connect api. get chat list with search text or none.
    setChatList(dummyChatList);
  }, [searchText]);

  return (
    <>
      {isSearchMode ? (
        <SearchBar
          value={searchText}
          handleChangeValue={handleChangeSearchText}
          handleCloseSearchMode={handleCloseSearchMode}
        />
      ) : (
        <Header
          right={
            <div className='flex flex-row items-center gap-[1.5rem]'>
              <button
                type='button'
                className='flex h-[3.5rem] w-[3.5rem] items-center justify-center'
                onClick={handleOpenSearchMode}
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
      )}

      <ChatList chatList={chatList} />
      {isModalOpen && <AddChatModal handleCloseModal={handleCloseModal} />}
      <FloatingAddChatButton handleOpenModal={handleOpenModal} />
      <FloatingScrollButton />
    </>
  );
}

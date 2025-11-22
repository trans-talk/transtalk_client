import { useTranslation } from 'react-i18next';

import SearchIcon from '@assets/ui/search.svg';
import SettingIcon from '@assets/ui/setting.svg';
import Header from '@components/Header';
import FloatingAddChatButton from '@pages/Home/components/FloatingAddChatButton';
import AddChatModal from '@pages/Home/components/AddChatModal';
import FloatingScrollButton from '@components/FloatingScrollButton';
import SearchBar from '@pages/Home/components/SearchBar';
import ChatList from '@pages/Home/components/ChatList';

import useChatRoomListState from '@pages/Home/hooks/use-chat-room-list-state';
import useSubscribeChatRoomList from '@pages/Home/hooks/use-subscribe-chat-room-list';
import Loading from '@components/Loading';

export default function Home() {
  const { t } = useTranslation();

  const {
    isModalOpen,
    searchTextInput,
    searchText,
    isSearchMode,
    handleChangeSearchText,
    handleOpenSearchMode,
    handleCloseSearchMode,
    handleOpenModal,
    handleCloseModal,
    handleToSettingPage,
  } = useChatRoomListState();

  const { isSubscribeLoading } = useSubscribeChatRoomList(searchText);

  if (isSubscribeLoading) {
    return (
      <div className='w-full pt-[20rem] text-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='pt-[7rem]'>
      {isSearchMode ? (
        <SearchBar
          value={searchTextInput}
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
                <img src={SearchIcon} alt='Search' />
              </button>
              <button
                type='button'
                className='flex h-[3.5rem] w-[3.5rem] items-center justify-center'
                onClick={handleToSettingPage}
              >
                <img src={SettingIcon} alt='Settings' />
              </button>
            </div>
          }
        >
          <h1 className='header-20'>{t('home.header')}</h1>
        </Header>
      )}
      <ChatList searchText={searchText} />
      {isModalOpen && <AddChatModal handleCloseModal={handleCloseModal} />}
      <FloatingAddChatButton handleOpenModal={handleOpenModal} />
      <FloatingScrollButton />
    </div>
  );
}

import { useTranslation } from 'react-i18next';

import SearchIcon from '@assets/ui/search.svg';
import SettingIcon from '@assets/ui/setting.svg';
import Header from '@components/Header';
import FloatingAddChatButton from '@pages/Home/components/FloatingAddChatButton';
import AddChatModal from '@pages/Home/components/AddChatModal';
import FloatingScrollButton from '@components/FloatingScrollButton';
import SearchBar from '@pages/Home/components/SearchBar';
import ChatList from '@pages/Home/components/ChatList';
import { useChatRoomListQuery } from '@pages/Home/hooks/use-chat-room-list-query';
import useChatRoomListState from '@pages/Home/hooks/use-chat-room-list-state';

export default function Home() {
  const { t } = useTranslation();

  const { listBottomRef, chatList, isPendingChatRoomList, isFetchingNextPage } =
    useChatRoomListQuery();

  const {
    isModalOpen,
    searchText,
    isSearchMode,
    handleChangeSearchText,
    handleOpenSearchMode,
    handleCloseSearchMode,
    handleOpenModal,
    handleCloseModal,
    handleToSettingPage,
  } = useChatRoomListState();

  return (
    <div className='pt-[7rem]'>
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

      {isPendingChatRoomList ? (
        <div className='mt-[20rem] flex w-full items-center justify-center'>
          <span className='text-grayscale-4 body-14 text-center'>
            Loading...
          </span>
        </div>
      ) : (
        <ChatList chatList={chatList} />
      )}

      {isModalOpen && <AddChatModal handleCloseModal={handleCloseModal} />}
      <FloatingAddChatButton handleOpenModal={handleOpenModal} />
      <FloatingScrollButton />

      <div ref={listBottomRef} className='h-[0.1rem] w-full' />
      {isFetchingNextPage && (
        <div className='text-grayscale-4 body-14 text-center'>Loading...</div>
      )}
    </div>
  );
}

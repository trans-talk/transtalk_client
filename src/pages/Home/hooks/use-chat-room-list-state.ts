import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import useDebounce from '@pages/Home/hooks/use-debounce';

export default function useChatRoomListState() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchTextInput, setSearchTextInput] = useState('');
  const searchText = useDebounce(searchTextInput);

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTextInput(e.target.value);
  };
  const handleOpenSearchMode = () => setIsSearchMode(true);
  const handleCloseSearchMode = () => {
    setSearchTextInput('');
    setIsSearchMode(false);
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleToSettingPage = () => navigate(ROUTES.SETTINGS);

  return {
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
  };
}

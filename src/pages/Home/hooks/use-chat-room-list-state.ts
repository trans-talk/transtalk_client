import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';

export default function useChatRoomListState() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const handleOpenSearchMode = () => setIsSearchMode(true);
  const handleCloseSearchMode = () => {
    setSearchText('');
    setIsSearchMode(false);
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleToSettingPage = () => navigate(ROUTES.SETTINGS);

  return {
    isModalOpen,
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

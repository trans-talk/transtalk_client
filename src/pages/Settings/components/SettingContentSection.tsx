import { useTranslation } from 'react-i18next';

import LogoutIcon from '@assets/ui/logout.svg';
import WithdrawIcon from '@assets/ui/withdraw.svg';
import useAccount from '@pages/Settings/hooks/use-account';
import { useState } from 'react';
import ConfirmModal from '@pages/ChatRoom/components/ConfirmModal';

export default function SettingContentSection() {
  const { t } = useTranslation();
  const { handleLogout, handleWithdraw } = useAccount();

  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    confirmText: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    confirmText: '',
    onConfirm: () => {},
  });

  const handleOpenLogoutModal = () => {
    setModalState({
      isOpen: true,
      title: '로그아웃',
      description: '로그아웃을 해도 기존 채팅 내역은 유지됩니다.',
      confirmText: '로그아웃',
      onConfirm: handleLogout,
    });
  };

  const handleOpenWithdrawModal = () => {
    setModalState({
      isOpen: true,
      title: '회원탈퇴',
      description:
        '회원탈퇴 이후 계정을 다시 사용할 수 없으며,\n모든 정보는 복구할 수 없습니다.',
      confirmText: '회원탈퇴',
      onConfirm: handleWithdraw,
    });
  };

  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));
  return (
    <div className='flex flex-col px-[3rem] py-[2rem]'>
      <button
        type='button'
        onClick={handleOpenLogoutModal}
        className='flex flex-row gap-[1.5rem] py-[1.5rem]'
      >
        <img src={LogoutIcon} alt='Logout Icon' />
        <span className='title-16'>{t('settings.logout')}</span>
      </button>
      <button
        type='button'
        onClick={handleOpenWithdrawModal}
        className='flex flex-row gap-[1.5rem] py-[1.5rem]'
      >
        <img src={WithdrawIcon} alt='Withdraw Icon' />
        <span className='title-16 text-red'>{t('settings.withdraw')}</span>
      </button>
      {modalState.isOpen && (
        <ConfirmModal
          title={modalState.title}
          description={modalState.description}
          confirmText={modalState.confirmText}
          handleConfirm={() => {
            modalState.onConfirm();
            closeModal();
          }}
          handleCancel={closeModal}
        />
      )}
    </div>
  );
}

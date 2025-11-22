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
      title: t('settings.logoutModal.title'),
      description: t('settings.logoutModal.description'),
      confirmText: t('settings.logoutModal.confirmText'),
      onConfirm: handleLogout,
    });
  };

  const handleOpenWithdrawModal = () => {
    setModalState({
      isOpen: true,
      title: t('settings.withdrawModal.title'),
      description: t('settings.withdrawModal.description'),
      confirmText: t('settings.withdrawModal.confirmText'),
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
          cancelText={t('settings.cancelModal')}
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

import { useTranslation } from 'react-i18next';

import LogoutIcon from '@assets/ui/logout.svg';
import WithdrawIcon from '@assets/ui/withdraw.svg';
import useAccount from '@pages/Settings/hooks/use-account';

export default function SettingContentSection() {
  const { t } = useTranslation();
  const { handleLogout, handleWithdraw } = useAccount();

  const handleClickLogoutButton = () => {
    handleLogout();
  };
  const handleClickWithdrawButton = () => {
    handleWithdraw();
  };
  return (
    <div className='flex flex-col px-[3rem] py-[2rem]'>
      <button
        type='button'
        onClick={handleClickLogoutButton}
        className='flex flex-row gap-[1.5rem] py-[1.5rem]'
      >
        <img src={LogoutIcon} alt='Logout Icon' />
        <span className='title-16'>{t('settings.logout')}</span>
      </button>
      <button
        type='button'
        onClick={handleClickWithdrawButton}
        className='flex flex-row gap-[1.5rem] py-[1.5rem]'
      >
        <img src={WithdrawIcon} alt='Withdraw Icon' />
        <span className='title-16 text-red'>{t('settings.withdraw')}</span>
      </button>
    </div>
  );
}

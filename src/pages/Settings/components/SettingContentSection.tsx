import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LogoutIcon from '@assets/ui/logout.svg';
import WithdrawIcon from '@assets/ui/withdraw.svg';
import { tokenStorage } from '@utils/token';
import { ROUTES } from '@router/routes';
import useSettings from '@pages/Settings/hooks/use-settings';

export default function SettingContentSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleLogout } = useSettings();

  // TODO: add logout and withdraw handler logic
  const handleClickLogoutButton = () => {
    handleLogout();
  };
  const handleWithdraw = () => {
    alert('withdraw');
    tokenStorage.clearTokens();
    navigate(ROUTES.LOGIN);
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
        onClick={handleWithdraw}
        className='flex flex-row gap-[1.5rem] py-[1.5rem]'
      >
        <img src={WithdrawIcon} alt='Withdraw Icon' />
        <span className='title-16 text-red'>{t('settings.withdraw')}</span>
      </button>
    </div>
  );
}

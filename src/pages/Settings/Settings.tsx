import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowLeft from '@assets/ui/arrow-left.svg';
import Header from '@components/Header';

import ProfileSection from '@pages/Settings/components/ProfileSection';
import SettingContentSection from '@pages/Settings/components/SettingContentSection';
import AppFooter from '@pages/Settings/components/AppFooter';
import { ROUTES } from '@router/routes';
import useSettings from '@pages/Settings/hooks/use-settings';
import Loading from '@components/Loading';

export default function Settings() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { userData, isPending } = useSettings();

  const handleGoBack = () => {
    navigate(ROUTES.HOME);
  };

  if (isPending) {
    return (
      <div className='mt-[20rem] w-full text-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='pt-[7rem]'>
      <Header
        left={
          <button
            type='button'
            className='flex h-[3.5rem] w-[3.5rem] items-center justify-center'
            onClick={handleGoBack}
          >
            <img src={ArrowLeft} alt='Go Back Button' />
          </button>
        }
      >
        <h1 className='header-20'>{t('settings.header')}</h1>
      </Header>
      <ProfileSection userData={userData} />
      <SettingContentSection />
      <AppFooter />
    </div>
  );
}

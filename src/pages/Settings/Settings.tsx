import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowLeft from '@assets/ui/arrow-left.svg';
import Header from '@components/Header';

import ProfileSection from '@pages/Settings/components/ProfileSection';
import SettingContentSection from '@pages/Settings/components/SettingContentSection';
import AppFooter from '@pages/Settings/components/AppFooter';

export default function Settings() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoBack = () => {
    navigate(-1);
  };
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
      <ProfileSection />
      <SettingContentSection />
      <AppFooter />
    </div>
  );
}

import { useNavigate } from 'react-router-dom';

import ArrowLeft from '@assets/ui/arrow-left.svg';
import Header from '@components/Header';
import Divider from '@components/Divider';
import ProfileSections from '@pages/Settings/components/ProfileSections';
import SettingContents from '@pages/Settings/components/SettingContents';
import AppFooter from '@pages/Settings/components/AppFooter';

export default function Settings() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
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
        <h1 className='header-20'>Settings</h1>
      </Header>
      <ProfileSections />
      <Divider />
      <SettingContents />
      <AppFooter />
    </>
  );
}

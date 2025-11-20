import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();

  return (
    <span className='text-grayscale-4 body-14 text-center'>{t('loading')}</span>
  );
}

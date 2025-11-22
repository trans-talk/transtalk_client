import { useTranslation } from 'react-i18next';
import CloseIcon from '@assets/ui/close.svg';

interface SearchBarProps {
  value: string;
  handleChangeValue: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseSearchMode: () => void;
}

export default function SearchBar({
  value,
  handleChangeValue,
  handleCloseSearchMode,
}: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className='border-grayscale-3 fixed top-[0] z-50 flex w-full max-w-[60rem] flex-row items-center gap-[1.5rem] border-b bg-white px-[1.5rem] py-[1rem]'>
      <input
        className='placeholder:text-grayscale-5 bg-grayscale-2 body-14 w-full appearance-none rounded-[3rem] px-[1.5rem] py-[1.2rem]'
        type='search'
        value={value}
        onChange={handleChangeValue}
        placeholder={t('home.search')}
      />

      <button
        className='flex w-[3.5rem] items-center justify-center'
        type='button'
        onClick={handleCloseSearchMode}
      >
        <img src={CloseIcon} alt='Close Search Mode' />
      </button>
    </div>
  );
}

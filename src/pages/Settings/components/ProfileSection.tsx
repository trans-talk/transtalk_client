import useSettings from '@pages/Settings/hooks/use-settings';

export default function ProfileSection() {
  const { userData } = useSettings();

  return (
    <div className='border-grayscale-3 flex flex-col items-center gap-[1.2rem] border-b p-[2rem]'>
      <img
        className='w-[10rem] rounded-full'
        src={userData?.picture ?? 'https://placehold.co/100'}
        alt='Profile Image'
      />
      <div className='flex flex-col items-center gap-[0.8rem]'>
        <span className='title-16'>{userData?.name}</span>
        <span className='body-14 text-grayscale-4'>{userData?.email}</span>
      </div>
    </div>
  );
}

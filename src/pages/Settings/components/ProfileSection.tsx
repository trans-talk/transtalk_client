import type { UserDataType } from '@type/user';

interface ProfileSectionProps {
  userData?: UserDataType;
}

export default function ProfileSection({ userData }: ProfileSectionProps) {
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

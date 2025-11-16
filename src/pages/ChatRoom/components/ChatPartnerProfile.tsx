import type { UserDataType } from '@type/user';

export default function ChatPartnerProfile({
  picture,
  name,
  email,
}: UserDataType) {
  return (
    <div className='flex flex-row items-center gap-[1.5rem]'>
      <img
        className='h-[5rem] w-[5rem] rounded-full'
        src={picture}
        alt='Profile Image'
      />
      <div className='flex flex-col'>
        <span className='title-16'>{name}</span>
        <span className='body-14 text-grayscale-4'>{email}</span>
      </div>
    </div>
  );
}

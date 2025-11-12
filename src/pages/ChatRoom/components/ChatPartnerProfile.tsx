import type { UserDataType } from '@pages/ChatRoom/types/chat-room-type';

export default function ChatPartnerProfile({
  profileImage,
  name,
  email,
}: UserDataType) {
  return (
    <div className='flex flex-row items-center gap-[1.5rem]'>
      <img
        className='h-[5rem] w-[5rem] rounded-full'
        src={profileImage}
        alt='Profile Image'
      />
      <div className='flex flex-col'>
        <span className='title-16'>{name}</span>
        <span className='body-14 text-grayscale-4'>{email}</span>
      </div>
    </div>
  );
}

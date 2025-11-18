import type { RecipientType } from '@type/message';

export default function ChatPartnerProfile({
  recipientPicture,
  recipientEmail,
  recipientName,
}: RecipientType) {
  return (
    <div className='flex flex-row items-center gap-[1.5rem]'>
      <img
        className='h-[5rem] w-[5rem] rounded-full'
        src={recipientPicture}
        alt='Profile Image'
      />
      <div className='flex flex-col'>
        <span className='title-16'>{recipientName}</span>
        <span className='body-14 text-grayscale-4'>{recipientEmail}</span>
      </div>
    </div>
  );
}

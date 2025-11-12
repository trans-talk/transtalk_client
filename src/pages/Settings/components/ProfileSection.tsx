// TODO: replace with real data
const dummy = {
  profileImg: 'https://placehold.co/100',
  name: '홍길동',
  email: 'hong@example.com',
};

export default function ProfileSection() {
  return (
    <div className='border-grayscale-3 flex flex-col items-center gap-[1.2rem] border-b p-[2rem]'>
      <img
        className='w-[10rem] rounded-full'
        src={dummy.profileImg ?? 'https://placehold.co/100'}
        alt='Profile Image'
      />
      <div className='flex flex-col items-center gap-[0.8rem]'>
        <span className='title-16'>{dummy.name}</span>
        <span className='body-14 text-grayscale-4'>{dummy.email}</span>
      </div>
    </div>
  );
}

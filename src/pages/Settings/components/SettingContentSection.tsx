import LogoutIcon from '@assets/ui/logout.svg';
import WithdrawIcon from '@assets/ui/withdraw.svg';

export default function SettingContentSection() {
  // TODO: add logout and withdraw handler logic
  const handleLogout = () => {
    alert('logout');
  };
  const handleWithdraw = () => {
    alert('withdraw');
  };
  return (
    <div className='flex flex-col px-[3rem] py-[2rem]'>
      <button
        type='button'
        onClick={handleLogout}
        className='flex flex-row gap-[1.5rem] py-[1.5rem]'
      >
        <img src={LogoutIcon} alt='Logout Icon' />
        <span className='title-16'>로그아웃</span>
      </button>
      <button
        type='button'
        onClick={handleWithdraw}
        className='flex flex-row gap-[1.5rem] py-[1.5rem]'
      >
        <img src={WithdrawIcon} alt='Withdraw Icon' />
        <span className='title-16 text-red'>회원탈퇴</span>
      </button>
    </div>
  );
}

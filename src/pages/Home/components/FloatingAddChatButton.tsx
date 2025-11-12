import PlusIcon from '@assets/ui/plus.svg';

interface FloatingAddChatButtonProps {
  handleOpenModal: () => void;
}

export default function FloatingAddChatButton({
  handleOpenModal,
}: FloatingAddChatButtonProps) {
  return (
    <button
      type='button'
      className='bg-primary-5 fixed right-[2rem] bottom-[3rem] flex h-[6rem] w-[6rem] items-center justify-center rounded-full shadow-[0_0_25px_0_rgba(0,0,0,0.10)]'
      onClick={handleOpenModal}
    >
      <img src={PlusIcon} alt='add chat' />
    </button>
  );
}

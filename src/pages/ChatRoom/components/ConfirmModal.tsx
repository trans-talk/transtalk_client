import ModalOverlay from '@pages/ChatRoom/components/ModalOverlay';

interface ConfirmModalProps {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  handleConfirm: () => void;
  handleCancel: () => void;
}

export default function ConfirmModal({
  title,
  description,
  cancelText,
  confirmText,
  handleConfirm,
  handleCancel,
}: ConfirmModalProps) {
  return (
    <ModalOverlay>
      <div className='flex flex-col items-center gap-[1rem]'>
        <h2 className='header-16'>{title}</h2>
        <span className='body-14 text-grayscale-4 text-center whitespace-pre-line'>
          {description}
        </span>
      </div>
      <div className='flex w-full flex-row gap-[1.5rem]'>
        <button
          type='button'
          className='border-grayscale-3 body-14 flex-1 rounded-[1rem] border py-[1rem]'
          onClick={handleCancel}
        >
          {cancelText}
        </button>
        <button
          type='button'
          className='body-14 bg-primary-3 flex-1 rounded-[1rem] py-[1rem] text-white'
          onClick={handleConfirm}
        >
          {confirmText}
        </button>
      </div>
    </ModalOverlay>
  );
}

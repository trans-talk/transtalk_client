import type { ReactNode } from 'react';

interface ModalOverlayProps {
  children: ReactNode;
}

export default function ModalOverlay({ children }: ModalOverlayProps) {
  return (
    <div className='fixed top-[0] left-1/2 z-50 h-[100dvh] w-full max-w-[60rem] -translate-x-1/2 bg-black/50'>
      <div className='border-grayscale-3 absolute top-1/2 left-1/2 flex w-[80%] -translate-1/2 flex-col gap-[2rem] rounded-[1.3rem] border bg-white p-[2rem]'>
        {children}
      </div>
    </div>
  );
}

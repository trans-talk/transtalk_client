import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export default function Header({ children, left, right }: HeaderProps) {
  return (
    <div className='border-grayscale-3 fixed top-[0] z-50 flex h-[7rem] w-full max-w-[60rem] flex-row items-center gap-[1.5rem] border-b bg-white px-[1.5rem]'>
      {left && <div>{left}</div>}
      <div className='flex-1'>{children}</div>
      {right && <div>{right}</div>}
    </div>
  );
}

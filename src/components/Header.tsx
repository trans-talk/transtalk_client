import type { ReactNode } from 'react';

interface HeaderProps {
  children: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export default function Header({ children, left, right }: HeaderProps) {
  return (
    <div className='border-b-grayscale-3 fixed top-[0] flex w-full max-w-[60rem] flex-row items-center justify-between gap-[1.5rem] border-b bg-white p-[1.5rem]'>
      {left && <div>{left}</div>}
      <div className='flex-1'>{children}</div>
      {right && <div>{right}</div>}
    </div>
  );
}

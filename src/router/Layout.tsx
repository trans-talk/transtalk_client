import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className='mx-auto box-border min-h-dvh max-w-[60rem]'>
      <Outlet />
    </main>
  );
}

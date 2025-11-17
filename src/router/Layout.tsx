import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { stompClient } from '@api/socket/websocket';

export default function Layout() {
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      stompClient.activate();
    }

    return () => {
      isSubscribed = false;
      stompClient.deactivate();
    };
  }, []);

  return (
    <main className='mx-auto box-border min-h-dvh max-w-[60rem]'>
      <Outlet />
    </main>
  );
}

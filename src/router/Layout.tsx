import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { stompClient } from '@socket/websocket';
import { tokenStorage } from '@utils/token';
import { ROUTES } from '@router/routes';

export default function Layout() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokenStorage.getAccessToken()) {
      navigate(ROUTES.LOGIN);
      return;
    }
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <main className='mx-auto box-border min-h-dvh max-w-[60rem]'>
      <Outlet />
    </main>
  );
}

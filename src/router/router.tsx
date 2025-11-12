import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@router/routes';
import Layout from '@router/Layout';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import Settings from '@pages/Settings/Settings';
import ChatRoom from '@pages/ChatRoom/ChatRoom';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      { path: ROUTES.CHAT_ROOM + '/:chatRoomId', element: <ChatRoom /> },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
    ],
  },
]);

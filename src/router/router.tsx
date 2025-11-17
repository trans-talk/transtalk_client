import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@router/routes';
import Layout from '@router/Layout';
import Home from '@pages/Home/Home';
import Login from '@pages/Login/Login';
import Settings from '@pages/Settings/Settings';
import ChatRoom from '@pages/ChatRoom/ChatRoom';
import GoogleCallback from '@pages/Login/GoogleCallback';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },

      {
        path: ROUTES.CALL_BACK,
        element: <GoogleCallback />,
      },
      { path: ROUTES.CHAT_ROOM + '/:chatRoomId', element: <ChatRoom /> },
      {
        path: ROUTES.SETTINGS,
        element: <Settings />,
      },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
]);

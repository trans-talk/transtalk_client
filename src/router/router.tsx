import { createBrowserRouter } from 'react-router-dom';

import { ROUTES } from '@router/routes';
import Layout from '@router/Layout';
import Home from '@pages/Home';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
    ],
  },
]);

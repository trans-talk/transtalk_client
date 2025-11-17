import { RouterProvider } from 'react-router-dom';
import { router } from '@router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  console.log('ENV:', import.meta.env.VITE_API_BASE_URL);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

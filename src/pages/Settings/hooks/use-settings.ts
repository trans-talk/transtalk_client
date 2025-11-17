import { getUserDataApi } from '@pages/Settings/api';
import { useQuery } from '@tanstack/react-query';

export default function useSettings() {
  const {
    data: userData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: () => getUserDataApi(),
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });

  return {
    userData,
    isPending,
    isError,
    error,
  };
}

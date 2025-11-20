import { useQuery } from '@tanstack/react-query';
import { SETTINGS_USER_DATA_QUERY_KEY } from '@/querykey/settings';
import { getUserDataApi } from '@pages/Settings/api';

export default function useSettings() {
  const {
    data: userData,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: SETTINGS_USER_DATA_QUERY_KEY.ALL,
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

import { useQuery } from '@tanstack/react-query';
import { SETTINGS_USER_DATA_QUERY_KEY } from '@/querykey/settings';
import { getUserDataApi } from '@pages/Settings/api';
import { ERROR_MESSAGE } from '@constant/error';

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

  if (isError) {
    alert(ERROR_MESSAGE.FETCH_USER_DATA(error.message));
  }

  return {
    userData,
    isPending,
  };
}

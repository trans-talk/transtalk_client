import { useQuery } from '@tanstack/react-query';
import { SETTINGS_USER_DATA_QUERY_KEY } from '@/querykey/settings';
import { getUserDataApi } from '@pages/Settings/api';
import { ERROR_MESSAGE } from '@constant/error';

export default function useUserProfile() {
  const {
    data: userData,
    isPending,
    isError: isErrorGetUserData,
    error: getUserDataError,
  } = useQuery({
    queryKey: SETTINGS_USER_DATA_QUERY_KEY.ALL,
    queryFn: () => getUserDataApi(),
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });

  if (isErrorGetUserData) {
    alert(ERROR_MESSAGE.FETCH_USER_DATA(getUserDataError.message));
  }

  return {
    userData,
    isPending,
  };
}

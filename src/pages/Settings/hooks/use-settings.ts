import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { SETTINGS_USER_DATA_QUERY_KEY } from '@/querykey/settings';
import { getUserDataApi, logoutApi } from '@pages/Settings/api';
import { ERROR_MESSAGE } from '@constant/error';
import { tokenStorage } from '@utils/token';
import { ROUTES } from '@router/routes';
import { SUCCESS_MESSAGE } from '@constant/success';

export default function useSettings() {
  const navigate = useNavigate();

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

  const { mutate: handleLogout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      alert(SUCCESS_MESSAGE.LOGOUT);
      tokenStorage.clearTokens();
      navigate(ROUTES.LOGIN);
    },
    onError: error => {
      alert(`${ERROR_MESSAGE.LOGOUT} : ${error}`);
    },
  });

  return {
    userData,
    isPending,
    handleLogout,
  };
}

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { ERROR_MESSAGE } from '@constant/error';
import { SUCCESS_MESSAGE } from '@constant/success';
import { logoutApi, withdrawApi } from '@pages/Settings/api';
import { ROUTES } from '@router/routes';
import { tokenStorage } from '@utils/token';

export default function useAccount() {
  const navigate = useNavigate();

  const { mutate: handleLogout } = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: response => {
      if (response.success === false) throw Error();
      alert(SUCCESS_MESSAGE.LOGOUT);
      // tokenStorage.clearTokens();
      navigate(ROUTES.LOGIN);
    },
    onError: error => {
      alert(`${ERROR_MESSAGE.LOGOUT} : ${error}`);
    },
  });

  const { mutate: handleWithdraw } = useMutation({
    mutationFn: () => withdrawApi(),
    onSuccess: response => {
      if (response.success === false) throw Error();
      alert(SUCCESS_MESSAGE.WITHDRAW);
      tokenStorage.clearTokens();
      navigate(ROUTES.LOGIN);
    },
    onError: error => {
      alert(`${ERROR_MESSAGE.WITHDRAW} : ${error}`);
    },
  });

  return {
    handleLogout,
    handleWithdraw,
  };
}

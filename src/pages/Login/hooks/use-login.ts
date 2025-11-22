import { useMutation } from '@tanstack/react-query';

import { getAuthorizationCode, loginApi } from '@pages/Login/api';
import { tokenStorage } from '@utils/token';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { ERROR_MESSAGE } from '@constant/error';

export default function useLogin() {
  const navigate = useNavigate();
  const {
    data,
    error,
    mutateAsync: handleAuthorizationCode,
  } = useMutation({
    mutationFn: getAuthorizationCode,
  });

  const handleToggleLoginButton = async () => {
    try {
      const response = await handleAuthorizationCode();

      const redirectUrl = response.data;

      if (!redirectUrl) {
        alert(ERROR_MESSAGE.LOGIN);
        navigate(ROUTES.LOGIN);
        return;
      }

      window.location.href = redirectUrl;
    } catch (e) {
      alert(`${ERROR_MESSAGE.LOGIN}, ${e}`);
      navigate(ROUTES.LOGIN);
    }
  };

  const {
    mutate: handleLogin,
    isPending: isPendingLogin,
    isError: isErrorLogin,
  } = useMutation({
    mutationFn: (code: string) => loginApi(code),
    onSuccess: response => {
      const accessToken = response.tokenresponse.accessToken;

      tokenStorage.setAccessToken(accessToken);
      navigate(ROUTES.HOME);
    },
    onError: error => {
      alert(`${ERROR_MESSAGE.LOGIN}, ${error}`);
      navigate(ROUTES.LOGIN);
    },
  });

  return {
    data,
    error,
    isPendingLogin,
    isErrorLogin,
    handleToggleLoginButton,
    handleLogin,
  };
}

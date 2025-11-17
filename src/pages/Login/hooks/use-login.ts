import { useMutation } from '@tanstack/react-query';

import { getAuthorizationCode, loginApi } from '@pages/Login/api';
import { tokenStorage } from '@utils/token';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();
  const {
    data,
    error,
    mutateAsync: handleAuthorizationCode,
  } = useMutation({
    mutationFn: getAuthorizationCode,
  });

  const {
    mutate: handleLogin,
    isPending: isPendingLogin,
    isError: isErrorLogin,
  } = useMutation({
    mutationFn: (code: string) => loginApi(code),
    onSuccess: response => {
      const accessToken = response.tokenresponse.accessToken;

      tokenStorage.setAccessToken(accessToken);
      navigate('/');
    },
    onError: error => {
      alert(`${error} 에러 발생`);
    },
  });

  return {
    data,
    error,
    isPendingLogin,
    isErrorLogin,
    handleAuthorizationCode,
    handleLogin,
  };
}

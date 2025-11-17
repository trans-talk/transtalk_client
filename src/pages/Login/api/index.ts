import { apiRequest } from '@api/apiRequest';
import type { BaseResponse } from '@type/response';
import type { UserDataType } from '@type/user';

interface AuthorizationCodeResponse extends BaseResponse {
  data: string;
}

export const getAuthorizationCode = async () => {
  const response = apiRequest<AuthorizationCodeResponse>({
    endpoint: '/auth',
    method: 'GET',
  });
  console.log('api 호출 결과: ', response);
  return response;
};

interface LoginResponse extends BaseResponse {
  data: {
    userResponse: UserDataType;
    tokenresponse: {
      accessToken: string;
      refreshToken: string | null;
    };
  };
}

export const loginApi = async (code: string) => {
  const response = await apiRequest<LoginResponse>({
    endpoint: '/auth/token',
    method: 'GET',
    params: { code },
  });

  return response.data;
};

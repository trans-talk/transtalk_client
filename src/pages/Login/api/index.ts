import { apiRequest } from '@api/apiRequest';
import type { BaseResponse } from '@type/response';
import type { UserDataType } from '@type/user';

interface AuthorizationCodeResponse extends BaseResponse {
  data: string;
}

export const getAuthorizationCode = async () => {
  return await apiRequest<AuthorizationCodeResponse>({
    endpoint: '/auth',
    method: 'GET',
  });
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

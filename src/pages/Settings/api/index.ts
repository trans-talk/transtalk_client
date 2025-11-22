import { apiRequest } from '@api/apiRequest';

import type { BaseResponse } from '@type/response';
import type { UserDataType } from '@type/user';

interface GetUserDataResponse extends BaseResponse {
  data: UserDataType;
}

export const getUserDataApi = async () => {
  const response = await apiRequest<GetUserDataResponse>({
    endpoint: '/me',
    method: 'GET',
  });

  return response.data;
};

export const logoutApi = async () => {
  const response = await apiRequest<BaseResponse>({
    endpoint: '/auth/logout',
    method: 'POST',
  });

  return response;
};

export const withdrawApi = async () => {
  const response = await apiRequest<BaseResponse>({
    endpoint: '/auth/withdraw',
    method: 'DELETE',
  });

  return response;
};

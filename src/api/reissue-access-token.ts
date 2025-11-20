import { apiRequest } from '@api/apiRequest';
import { ROUTES } from '@router/routes';
import type { BaseResponse } from '@type/response';
import { tokenStorage } from '@utils/token';

interface ReissueResponse extends BaseResponse {
  data: {
    accessToken: string;
    refreshToken: null;
  };
}

export async function reissueAccessToken(): Promise<string | null> {
  try {
    const response = await apiRequest<ReissueResponse>({
      endpoint: '/auth/refresh',
      method: 'GET',
    });

    if (!response.success && response.message) {
      throw Error(response.message);
    }

    const newAccessToken: string | undefined = response.data.accessToken;

    if (newAccessToken) tokenStorage.setAccessToken(newAccessToken);
    return newAccessToken ?? null;
  } catch (err) {
    console.error(err);

    tokenStorage.clearTokens();
    window.location.replace(ROUTES.LOGIN);

    return null;
  }
}

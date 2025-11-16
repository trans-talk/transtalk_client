import { tokenStorage } from '@utils/token';
import axios from 'axios';

// refresh API call
export async function reissueAccessToken(): Promise<string | null> {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    );

    const newAccessToken: string | undefined = response.data?.accessToken;

    if (newAccessToken) tokenStorage.setAccessToken(newAccessToken);

    return newAccessToken ?? null;
  } catch (err) {
    return null;
  }
}

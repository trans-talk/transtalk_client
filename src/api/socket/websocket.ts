import { Client, type IFrame } from '@stomp/stompjs';
import { tokenStorage } from '@utils/token';
import SockJS from 'sockjs-client';

const WS_URL = import.meta.env.VITE_WS_URL.replace(/^wss:\/\//, 'https://');

export const stompClient = new Client({
  webSocketFactory: () => new SockJS(WS_URL),

  reconnectDelay: 5000,

  debug: msg => console.log('[STOMP]', msg),

  beforeConnect(this: Client) {
    const accessToken = tokenStorage.getAccessToken();
    const cleanedToken = accessToken?.replace(/^Bearer\s+/i, '');

    if (cleanedToken) {
      this.connectHeaders = {
        Authorization: `${cleanedToken}`,
      };
    } else {
      this.connectHeaders = {};
    }
  },

  onConnect: (_frame: IFrame) => {
    console.log('connect!');
  },

  onStompError: frame => {
    console.error('STOMP error:', frame.headers['message']);
  },
});

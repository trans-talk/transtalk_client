import { Client, type IFrame } from '@stomp/stompjs';
import { tokenStorage } from '@utils/token';
import SockJS from 'sockjs-client';

const WS_URL = import.meta.env.VITE_WS_URL.replace(/^wss:\/\//, 'https://');

export const stompClient = new Client({
  webSocketFactory: () => new SockJS(WS_URL),

  reconnectDelay: 5000,

  debug: msg => console.log('[STOMP]', msg),

  // add Authorization header before connect
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
    console.error('STOMP error:', frame);

    stompClient.deactivate().finally(() => {
      console.log('[STOMP] restart after error');
      stompClient.activate();
    });
  },
});

// add Authorization header to all publish
const originalPublish = stompClient.publish.bind(stompClient);
stompClient.publish = function (args) {
  const token = tokenStorage.getAccessToken();
  const cleaned = token?.replace(/^Bearer\s+/i, '');

  args.headers = {
    ...args.headers,
    ...(cleaned && { Authorization: cleaned }),
  };

  return originalPublish(args);
};

// add Authorization header to all subscribe
const originalSubscribe = stompClient.subscribe.bind(stompClient);
stompClient.subscribe = function (destination, callback, headers = {}) {
  const token = tokenStorage.getAccessToken();
  const cleaned = token?.replace(/^Bearer\s+/i, '');

  const newHeaders = {
    ...headers,
    ...(cleaned && { Authorization: cleaned }),
  };

  return originalSubscribe(destination, callback, newHeaders);
};

// add Authorization header to all unsubscribe
const originalUnsubscribe = stompClient.unsubscribe.bind(stompClient);
stompClient.unsubscribe = function (id, headers = {}) {
  const token = tokenStorage.getAccessToken();
  const cleaned = token?.replace(/^Bearer\s+/i, '');

  const newHeaders = {
    ...headers,
    ...(cleaned && { Authorization: cleaned }),
  };

  return originalUnsubscribe(id, newHeaders);
};

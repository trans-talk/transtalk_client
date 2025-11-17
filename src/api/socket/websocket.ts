import { Client, type IFrame } from '@stomp/stompjs';

export const stompClient = new Client({
  brokerURL: import.meta.env.VITE_WS_URL,
  reconnectDelay: 5000,
  debug: msg => console.log('[STOMP]', msg),

  onConnect: (_frame: IFrame) => {
    console.log('connect!');
  },

  onStompError: frame => {
    console.error('STOMP error:', frame.headers['message']);
  },
});

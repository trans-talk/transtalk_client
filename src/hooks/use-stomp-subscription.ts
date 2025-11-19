import { useEffect } from 'react';
import type { IFrame, IMessage, StompSubscription } from '@stomp/stompjs';

import { stompClient } from '@api/socket/websocket';

interface UseStompSubscriptionParams {
  destination: string | null;
  handleMessage: (message: IMessage) => void;
}

export default function useStompSubscription({
  destination,
  handleMessage,
}: UseStompSubscriptionParams) {
  useEffect(() => {
    if (!destination) return;

    let subscription: StompSubscription | null = null;

    const doSubscribe = () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch {}
        subscription = null;
      }

      subscription = stompClient.subscribe(destination, handleMessage);
      console.log('[STOMP] subscribed to', destination);
    };

    const prevOnConnect = stompClient.onConnect;
    const prevOnWebSocketClose = stompClient.onWebSocketClose;

    if (stompClient.connected) {
      doSubscribe();
    }

    stompClient.onConnect = (frame: IFrame) => {
      prevOnConnect?.(frame);
      console.log('[STOMP] connected, resubscribing…');
      doSubscribe();
    };

    stompClient.onWebSocketClose = event => {
      prevOnWebSocketClose?.(event);
      console.log('[STOMP] websocket closed', event);

      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch {}
        subscription = null;
      }
    };

    return () => {
      if (subscription) {
        try {
          subscription.unsubscribe();
        } catch {}
        subscription = null;
        console.log('[STOMP] unsubscribed from', destination);
      }

      stompClient.onConnect = prevOnConnect;
      stompClient.onWebSocketClose = prevOnWebSocketClose;
    };
  }, [destination, handleMessage]);
}

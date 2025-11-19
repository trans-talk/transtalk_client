import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IFrame, IMessage, StompSubscription } from '@stomp/stompjs';

import { stompClient } from '@api/socket/websocket';
import { type InfiniteData, useQueryClient } from '@tanstack/react-query';
import type { MessageType } from '@type/message';
import type { ChatHistoryData } from '@pages/ChatRoom/api';
import { CHAT_HISTORY_QUERY_KEY } from '@/querykey/chat-history';
import { scrollToBottom } from '@utils/scroll';

export default function useSubscribeChatHistory(chatRoomId: string) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const sendMessage = (content: string) => {
    const destination = `/app/chat/${chatRoomId}`;

    const body = JSON.stringify({
      content,
    });

    stompClient.publish({
      destination,
      body,
    });

    console.log('[SEND]', destination, body);
  };

  useEffect(() => {
    if (!chatRoomId) {
      alert('잘못된 접근입니다.');
      navigate(-1);
    }

    const destination = `/topic/chat/${chatRoomId}`;
    let subscription: StompSubscription | null = null;

    const handleMessage = (message: IMessage) => {
      const payload: MessageType = JSON.parse(message.body);

      queryClient.setQueryData<InfiniteData<ChatHistoryData> | undefined>(
        CHAT_HISTORY_QUERY_KEY.HISTORY(chatRoomId),
        prev => {
          if (!prev) return prev;

          const alreadyExists = prev.pages.some(page =>
            page.chats.some(chat => chat.chatId === payload.chatId)
          );
          if (alreadyExists) {
            return prev;
          }

          const newPages = [...prev.pages];
          const lastPageIndex = newPages.length - 1;
          const lastPage = newPages[lastPageIndex];

          if (!lastPage) return prev;

          const updatedLastPage: ChatHistoryData = {
            ...lastPage,
            chats: [payload, ...lastPage.chats],
          };

          newPages[lastPageIndex] = updatedLastPage;

          return {
            ...prev,
            pages: newPages,
          };
        }
      );

      requestAnimationFrame(scrollToBottom);
    };

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
      console.log('[STOMP] connected (from Chat Room), resubscribing…');
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
  }, [chatRoomId, navigate, queryClient]);

  return {
    sendMessage,
  };
}

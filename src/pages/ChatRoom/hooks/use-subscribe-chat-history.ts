import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IFrame, IMessage, StompSubscription } from '@stomp/stompjs';

import { stompClient } from '@api/socket/websocket';
import { type InfiniteData, useQueryClient } from '@tanstack/react-query';
import type { MessageType } from '@type/message';
import type { ChatHistoryData } from '@pages/ChatRoom/api';
import { CHAT_HISTORY_QUERY_KEY } from '@/querykey/chat-history';

export default function useSubscribeChatHistory(chatRoomId: string) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const sendMessage = (content: string) => {
    if (!stompClient.connected) {
      console.warn('STOMP not connected. Message not sent.');
      return;
    }

    const destination = `/app/chat/${chatRoomId}`;

    const body = JSON.stringify({
      content,
    });

    stompClient.publish({ destination, body });

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
      console.log('[RECEIVE_RAW]', message);
      const payload: MessageType = JSON.parse(message.body);
      console.log('[RECEIVE_PARSED]', payload);

      queryClient.setQueryData<InfiniteData<ChatHistoryData> | undefined>(
        CHAT_HISTORY_QUERY_KEY.HISTORY(chatRoomId),
        prev => {
          if (!prev) return prev;

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
    };

    const doSubscribe = () => {
      if (subscription) return;
      subscription = stompClient.subscribe(destination, handleMessage);
      console.log('subscribed to', destination);
    };

    if (stompClient.connected) {
      doSubscribe();
    } else {
      const prevOnConnect = stompClient.onConnect;

      stompClient.onConnect = (frame: IFrame) => {
        prevOnConnect?.(frame);
        console.log('stomp connected (from Chat Room), subscribing…');
        doSubscribe();
      };

      return () => {
        if (subscription) {
          subscription.unsubscribe();
          subscription = null;
          console.log('unsubscribed from', destination);
        }
        stompClient.onConnect = prevOnConnect;
      };
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
        subscription = null;
        console.log('unsubscribed from', destination);
      }
    };
  }, [chatRoomId]);

  return {
    sendMessage,
  };
}

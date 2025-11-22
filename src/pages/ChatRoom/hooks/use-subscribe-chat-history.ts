import { useCallback } from 'react';
import type { IMessage } from '@stomp/stompjs';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import { stompClient } from '@socket/websocket';
import type { MessageType } from '@type/message';
import useStompSubscription from '@socket/hooks/use-stomp-subscription';
import { CHAT_HISTORY_QUERY_KEY } from '@/querykey/chat-history';
import { scrollToBottom } from '@utils/scroll';
import type { ChatHistoryData } from '@pages/ChatRoom/api';

export default function useSubscribeChatHistory(chatRoomId: string) {
  const queryClient = useQueryClient();

  const sendMessage = (content: string) => {
    const destination = `/app/chat/${chatRoomId}`;

    stompClient.publish({
      destination,
      body: JSON.stringify({ content }),
    });

    console.log('[STOMP][ChatRoom] SEND', destination, content);
  };

  const handleMessage = useCallback(
    (message: IMessage) => {
      const payload: MessageType = JSON.parse(message.body);

      queryClient.setQueryData<InfiniteData<ChatHistoryData> | undefined>(
        CHAT_HISTORY_QUERY_KEY.HISTORY(chatRoomId),
        prev => {
          if (!prev) return prev;

          const alreadyExists = prev.pages.some(page =>
            page.chats.some(chat => chat.chatId === payload.chatId)
          );
          if (alreadyExists) return prev;

          const newPages = [...prev.pages];
          const lastPageIndex = 0;
          const lastPage = newPages[0];
          if (!lastPage) return prev;

          const updatedLastPage: ChatHistoryData = {
            ...lastPage,
            chats: [payload, ...lastPage.chats],
          };

          newPages[lastPageIndex] = updatedLastPage;

          return { ...prev, pages: newPages };
        }
      );

      requestAnimationFrame(scrollToBottom);
    },
    [chatRoomId]
  );

  const destination = `/topic/chat/${chatRoomId}`;
  const { isSubscribeLoading } = useStompSubscription({
    destination,
    handleMessage,
  });

  return { sendMessage, isSubscribeLoading };
}

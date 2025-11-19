import { useEffect } from 'react';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { IFrame, IMessage, StompSubscription } from '@stomp/stompjs';

import { stompClient } from '@api/socket/websocket';
import useSettings from '@pages/Settings/hooks/use-settings';
import type { ChatRoomListData } from '@pages/Home/api';
import type { ChatRoomType } from '@type/room';
import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';

export default function useSubscribeChatRoomList() {
  const { userData } = useSettings();
  const userId = userData?.id;

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const destination = `/topic/users/${userId}/chatRoom`;
    let subscription: StompSubscription | null = null;

    const handleMessage = (message: IMessage) => {
      const payload: ChatRoomType = JSON.parse(message.body);
      const roomId = payload.chatroomId;

      queryClient.setQueryData<InfiniteData<ChatRoomListData> | undefined>(
        CHAT_ROOM_LIST_QUERY_KEY.ALL,
        prev => {
          if (!prev || prev.pages.length === 0) return prev;

          let found = false;
          let updatedRoom: ChatRoomType | null = null;

          // Extract updatedRoom and filteredPagesData
          const pagesWithoutUpdatedRoom = prev.pages.map(page => {
            const filteredRooms = page.rooms.filter(room => {
              if (room.chatroomId === roomId) {
                found = true;
                updatedRoom = { ...room, ...payload };
                return false;
              }
              return true;
            });

            return { ...page, rooms: filteredRooms };
          });

          // Existed Chat Room(found) -> Update and go first
          if (found && updatedRoom) {
            const [first, ...rest] = pagesWithoutUpdatedRoom;
            const updatedFirst = {
              ...first,
              rooms: [updatedRoom, ...first.rooms],
            };

            return { ...prev, pages: [updatedFirst, ...rest] };
          }

          // New Chat Room -> Add payload to first
          if (!found && pagesWithoutUpdatedRoom.length > 0) {
            const [first, ...rest] = pagesWithoutUpdatedRoom;
            const newFirst = {
              ...first,
              rooms: [payload, ...first.rooms],
            };

            return { ...prev, pages: [newFirst, ...rest] };
          }

          return { ...prev, pages: pagesWithoutUpdatedRoom };
        }
      );
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
  }, [userId, queryClient]);
}

import { useEffect } from 'react';
import type { IFrame, IMessage, StompSubscription } from '@stomp/stompjs';

import { stompClient } from '@api/socket/websocket';
import useSettings from '@pages/Settings/hooks/use-settings';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { ChatRoomType } from '@type/room';

import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';
import type { ChatRoomListData } from '@pages/Home/api';

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
          if (!prev) return prev;
          if (prev.pages.length === 0) return prev;

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
        console.log('stomp connected (from Home), subscribing…');
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
  }, [userId, queryClient]);
}

import { useCallback } from 'react';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { IMessage } from '@stomp/stompjs';

import useSettings from '@pages/Settings/hooks/use-settings';
import type { ChatRoomListData } from '@pages/Home/api';
import type { ChatRoomType } from '@type/room';
import useStompSubscription from '@socket/hooks/use-stomp-subscription';
import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';

export default function useSubscribeChatRoomList() {
  const { userData } = useSettings();
  const userId = userData?.id;

  const queryClient = useQueryClient();

  const handleMessage = useCallback(
    (message: IMessage) => {
      const payload: ChatRoomType = JSON.parse(message.body);
      const roomId = payload.chatroomId;

      queryClient.setQueryData<InfiniteData<ChatRoomListData> | undefined>(
        CHAT_ROOM_LIST_QUERY_KEY.ALL,
        prev => {
          if (!prev || prev.pages.length === 0) return prev;

          let found = false;
          let updatedRoom: ChatRoomType | null = null;

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

          // 기존 방이 있었던 경우: 업데이트 후 맨 앞으로
          if (found && updatedRoom) {
            const [first, ...rest] = pagesWithoutUpdatedRoom;
            const updatedFirst = {
              ...first,
              rooms: [updatedRoom, ...first.rooms],
            };

            return { ...prev, pages: [updatedFirst, ...rest] };
          }

          // 새로운 방인 경우: 첫 페이지 맨 앞에 추가
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
    },
    [queryClient]
  );

  const destination = userId ? `/topic/users/${userId}/chatRoom` : null;

  useStompSubscription({
    destination,
    handleMessage,
  });
}

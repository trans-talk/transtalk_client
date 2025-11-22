import { useCallback } from 'react';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { IMessage } from '@stomp/stompjs';

import type { ChatRoomListData } from '@pages/Home/api';
import type { ChatRoomType } from '@type/room';
import useStompSubscription from '@socket/hooks/use-stomp-subscription';
import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';
import useUserProfile from '@pages/Settings/hooks/use-user-profile';

export default function useSubscribeChatRoomList(searchText: string) {
  const { userData } = useUserProfile();
  const userId = userData?.id;

  const queryClient = useQueryClient();

  const handleMessage = useCallback(
    (message: IMessage) => {
      const payload: ChatRoomType = JSON.parse(message.body);
      const roomId = payload.chatroomId;

      queryClient.setQueryData<InfiniteData<ChatRoomListData> | undefined>(
        CHAT_ROOM_LIST_QUERY_KEY.SEARCH(searchText),
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

          // Existing room: update and move to the top
          if (found && updatedRoom) {
            console.log('기존 채팅방이 있을 때 업데이트');
            const [first, ...rest] = pagesWithoutUpdatedRoom;
            const updatedFirst = {
              ...first,
              rooms: [updatedRoom, ...first.rooms],
            };

            return { ...prev, pages: [updatedFirst, ...rest] };
          }

          // New room: insert at the top of the first page
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

  const { isSubscribeLoading } = useStompSubscription({
    destination,
    handleMessage,
  });

  return {
    isSubscribeLoading,
  };
}

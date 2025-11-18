import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';
import { getChatRoomListApi, type ChatRoomListData } from '@pages/Home/api';

export function useChatRoomListQuery() {
  const { ref: listBottomRef, inView } = useInView();

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatRoomListData>({
    queryKey: CHAT_ROOM_LIST_QUERY_KEY.ALL,
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getChatRoomListApi(pageParam as number),
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    retry: 1,
    staleTime: 1000 * 3,
  });

  const rooms = data?.pages.flatMap(page => page.rooms) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    listBottomRef,
    chatList: rooms,
    isPendingChatRoomList: isPending,
    isErrorChatRoomList: isError,
    isFetchingNextPage,
  };
}

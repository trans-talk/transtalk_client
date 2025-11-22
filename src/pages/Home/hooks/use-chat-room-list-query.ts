import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';
import { getChatRoomListApi, type ChatRoomListData } from '@pages/Home/api';
import { ERROR_MESSAGE } from '@constant/error';

export function useChatRoomListQuery(searchText: string) {
  const { ref: listBottomRef, inView } = useInView();

  const {
    data,
    isPending,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatRoomListData>({
    queryKey: CHAT_ROOM_LIST_QUERY_KEY.SEARCH(searchText),
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const page = pageParam === null ? 0 : (pageParam as number);
      return await getChatRoomListApi(page, searchText);
    },
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    retry: 1,
    staleTime: 1000 * 5,
    refetchOnWindowFocus: true,
  });

  const rooms = data?.pages.flatMap(page => page.rooms) ?? [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    alert(ERROR_MESSAGE.FETCH_ROOM_LIST(error.message));
  }

  return {
    listBottomRef,
    chatList: rooms,
    isPendingChatRoomList: isPending,
    isFetchingNextPage,
  };
}

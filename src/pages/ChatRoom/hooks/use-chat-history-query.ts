import { useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatHistoryApi, type ChatHistoryData } from '@pages/ChatRoom/api';
import { CHAT_HISTORY_QUERY_KEY } from '@/querykey/chat-history';

export default function useChatHistoryQuery(chatRoomId: string) {
  const { ref: listTopRef, inView } = useInView({
    rootMargin: '150px 0px 0px 0px',
  });
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollHeightRef = useRef<number | null>(null);
  const prevInViewRef = useRef(false);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatHistoryData>({
    queryKey: CHAT_HISTORY_QUERY_KEY.HISTORY(chatRoomId),
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getChatHistoryApi(chatRoomId, pageParam as number),
    getNextPageParam: lastPage =>
      lastPage.hasNext ? lastPage.pageNumber + 1 : undefined,
    retry: 1,
  });
  const chats = data?.pages.flatMap(page => page.chats) ?? [];

  const recipient = useMemo(() => {
    if (!data?.pages.length) return null;
    return data.pages[0].recipient;
  }, [data]);

  useEffect(() => {
    const isEnter = inView && !prevInViewRef.current;

    if (isEnter && hasNextPage && !isFetchingNextPage) {
      const container = chatContainerRef.current;
      prevScrollHeightRef.current = container?.scrollHeight ?? null;
      fetchNextPage();
    }

    prevInViewRef.current = inView;
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!isFetchingNextPage && prevScrollHeightRef.current !== null) {
      const container = chatContainerRef.current;
      if (container) {
        const newScrollHeight = container.scrollHeight;
        const diff = newScrollHeight - prevScrollHeightRef.current;
        container.scrollTop = container.scrollTop + diff;
      }
      prevScrollHeightRef.current = null;
    }
  }, [isFetchingNextPage]);

  return {
    listTopRef,
    chatContainerRef,
    chatHistory: chats,
    recipient,
    isPending,
    isError,
    isFetchingNextPage,
  };
}

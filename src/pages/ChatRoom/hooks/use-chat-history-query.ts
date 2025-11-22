import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatHistoryApi, type ChatHistoryData } from '@pages/ChatRoom/api';
import { CHAT_HISTORY_QUERY_KEY } from '@/querykey/chat-history';
import { scrollToBottomInstant } from '@utils/scroll';
import { ROUTES } from '@router/routes';
import { ERROR_MESSAGE } from '@constant/error';

export default function useChatHistoryQuery(chatRoomId: string) {
  const navigate = useNavigate();
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
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<ChatHistoryData>({
    queryKey: CHAT_HISTORY_QUERY_KEY.HISTORY(chatRoomId),
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const page = pageParam === null ? 0 : (pageParam as number);
      return await getChatHistoryApi(chatRoomId, page);
    },
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

  useEffect(() => {
    scrollToBottomInstant();
  }, []);

  if (isError) {
    alert(ERROR_MESSAGE.FETCH_CHAT_HISTORY(error.message));
    navigate(ROUTES.HOME);
  }

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

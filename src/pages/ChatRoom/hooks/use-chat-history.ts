import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatHistoryApi, type ChatHistoryData } from '@pages/ChatRoom/api';
import { CHAT_HISTORY_QUERY_KEY } from '@/querykey/chat-history';
import useSubscribeChatHistory from '@pages/ChatRoom/hooks/use-subscribe-chat-history';
import { scrollToBottomInstant } from '@utils/scroll';

export default function useChatHistory(chatRoomId: string) {
  const navigate = useNavigate();

  const { ref: listTopRef, inView } = useInView({
    rootMargin: '150px 0px 0px 0px',
  });
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const prevScrollHeightRef = useRef<number | null>(null);
  const prevInViewRef = useRef(false);

  const [inputText, setInputText] = useState('');

  const { sendMessage } = useSubscribeChatHistory(chatRoomId);

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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInputText('');
  };

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

  return {
    listTopRef,
    chatContainerRef,
    chatHistory: chats,
    recipient,
    inputText,
    isPending,
    isError,
    isFetchingNextPage,
    handleGoBack,
    handleChangeInputText,
    handleSendMessage,
  };
}

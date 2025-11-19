import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';

import { getChatHistoryApi, type ChatHistoryData } from '@pages/ChatRoom/api';
import { CHAT_HISTORY_QUERY_KEY } from '@/querykey/chat-history';
import useSubscribeChatHistory from '@pages/ChatRoom/hooks/use-subscribe-chat-history';

export default function useChatHistory(chatRoomId: string) {
  const navigate = useNavigate();
  const { ref: listTopRef, inView } = useInView({
    rootMargin: '200px 0px 0px 0px',
  });

  const [inputText, setInputText] = useState('');
  const isInitialScrollDoneRef = useRef(false);
  const hasIgnoredInitialInViewRef = useRef(false);

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

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage || isFetchingNextPage) return;

    if (!hasIgnoredInitialInViewRef.current) {
      hasIgnoredInitialInViewRef.current = true;
      return;
    }

    fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    if (!chats || chats.length === 0) return;
    if (isInitialScrollDoneRef.current) return;

    const timer = requestAnimationFrame(() => {
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;

      window.scrollTo({
        top: scrollHeight,
        behavior: 'auto',
      });
      isInitialScrollDoneRef.current = true;
    });
    return () => cancelAnimationFrame(timer);
  }, [chats]);

  return {
    listTopRef,
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

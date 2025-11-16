import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';
import { createNewChatRoom } from '@pages/Home/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCreateNewChat(
  language: string,
  recipientEmail: string
) {
  const queryClient = useQueryClient();

  const { data } = useMutation({
    mutationFn: () => createNewChatRoom(language, recipientEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_ROOM_LIST_QUERY_KEY.ALL });
    },
    onError: (error: Error) => {
      alert(`에러 발생 : ${error.message}`);
    },
  });

  const newChatRoomId = data?.chatRoomId;

  return { newChatRoomId };
}

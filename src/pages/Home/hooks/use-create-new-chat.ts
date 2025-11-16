import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';
import { createNewChatRoom } from '@pages/Home/api';
import { ROUTES } from '@router/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function useCreateNewChat(
  language: string,
  recipientEmail: string
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: handleCreateNewChat, data } = useMutation({
    mutationFn: () => createNewChatRoom(language, recipientEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHAT_ROOM_LIST_QUERY_KEY.ALL });
      navigate(ROUTES.CHAT_ROOM + data?.chatRoomId);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  return { handleCreateNewChat };
}

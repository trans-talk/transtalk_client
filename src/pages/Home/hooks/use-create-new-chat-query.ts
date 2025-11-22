import { CHAT_ROOM_LIST_QUERY_KEY } from '@/querykey/chat-room-list';
import { ERROR_MESSAGE } from '@constant/error';
import { createNewChatRoom } from '@pages/Home/api';
import { ROUTES } from '@router/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function useCreateNewChatQuery(
  language: string,
  recipientEmail: string
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: handleCreateNewChat } = useMutation({
    mutationFn: () => createNewChatRoom(language, recipientEmail),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: CHAT_ROOM_LIST_QUERY_KEY.ALL });
      navigate(`${ROUTES.CHAT_ROOM}/${response.chatRoomId}`);
    },
    onError: (error: Error) => {
      alert(ERROR_MESSAGE.CREATE_NEW_ROOM(error.message));
    },
  });

  return { handleCreateNewChat };
}

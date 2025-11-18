import { apiRequest } from '@api/apiRequest';
import type { MessageType, RecipientType } from '@type/message';
import type { BaseResponse } from '@type/response';

export interface ChatHistoryData {
  chats: MessageType[];
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
  isLast: boolean;
  totalElements: number;
  recipient: RecipientType;
}

interface GetChatHistoryResponse extends BaseResponse {
  data: ChatHistoryData;
}

export const getChatHistoryApi = async (chatRoomId: string, page: number) => {
  const response = await apiRequest<GetChatHistoryResponse>({
    endpoint: `/chatRooms/${chatRoomId}/chats`,
    method: 'GET',
    params: {
      page,
    },
  });

  console.log(response);

  return response.data;
};

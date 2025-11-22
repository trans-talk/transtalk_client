import { apiRequest } from '@api/apiRequest';
import type { BaseResponse } from '@type/response';
import type { ChatRoomType } from '@type/room';

export interface ChatRoomListData {
  rooms: ChatRoomType[];
  pageNumber: number;
  pageSize: number;
  hasNext: boolean;
  isLast: boolean;
  totalElements: number;
}

interface GetChatRoomResponse extends BaseResponse {
  data: ChatRoomListData;
}

export const getChatRoomListApi = async (page: number, name?: string) => {
  const response = await apiRequest<GetChatRoomResponse>({
    endpoint: '/chatRooms',
    method: 'GET',
    params: {
      page,
      name,
    },
  });

  return response.data;
};

interface CreateNewChatRoomResponse extends BaseResponse {
  data: {
    chatRoomId: number;
  };
}

export const createNewChatRoom = async (
  language: string,
  recipientEmail: string
) => {
  const response = await apiRequest<CreateNewChatRoomResponse>({
    endpoint: '/chatRooms',
    method: 'POST',
    data: {
      language,
      recipientEmail,
    },
  });

  if (!response.success) {
    throw new Error(response.message ?? 'Failed to refresh access token');
  }

  return response.data;
};

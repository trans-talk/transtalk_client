import { apiRequest } from '@api/apiRequest';
import type { BaseResponse } from '@type/response';
import type { ChatRoomType } from '@type/room';

interface GetChatRoomResponse extends BaseResponse {
  data: {
    rooms: ChatRoomType[];
    pageNumber: number;
    pageSize: number;
    hasNext: boolean;
    isLast: boolean;
    totalElements: number;
  };
}

export const getChatRoomListApi = async (page: number) => {
  const response = await apiRequest<GetChatRoomResponse>({
    endpoint: '/chatRooms',
    method: 'GET',
    params: {
      page,
    },
  });

  console.log(response);

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

  if (!response.success && response.message) {
    throw Error(response.message);
  }

  return response.data;
};

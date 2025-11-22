export const ERROR_MESSAGE = {
  FETCH_ROOM_LIST: (message: string) =>
    `Failed to fetch chat room list: ${message}`,
  INVALID_ROOM_ID: 'No information found for this chat room.',
  FETCH_CHAT_HISTORY: (message: string) =>
    `Failed to fetch chat history: ${message}`,
  LOGIN: 'An error occurred during login.',
  FETCH_USER_DATA: (message: string) =>
    `Failed to fetch user profile: ${message}`,
} as const;

export const ERROR_MESSAGE = {
  FETCH_ROOM_LIST: (message: string) =>
    `Failed to fetch chat room list: ${message}`,
  INVALID_ROOM_ID: 'No information found for this chat room.',
  FETCH_CHAT_HISTORY: (message: string) =>
    `Failed to fetch chat history: ${message}`,
  FETCH_USER_DATA: (message: string) =>
    `Failed to fetch user profile: ${message}`,
  LOGIN: 'An error occurred during login.',
  LOGOUT: 'An error occurred during logout.',
} as const;

export interface UserDataType {
  profileImage: string;
  name: string;
  email: string;
}

export interface MessageType {
  chatId: number;
  original: string;
  target: string;
  isUser: boolean;
  chatTime: string;
}

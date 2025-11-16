export interface MessageType {
  chatId: number;
  original: string;
  target: string;
  isUser: boolean;
  chatTime: string;
  isUnread: boolean;
}

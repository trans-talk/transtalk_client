export interface MessageType {
  chatId: number;
  originalMessage: string;
  translatedMessage: string;
  senderEmail: string;
  sendAt: string;
  isRead: boolean;
  status: MessageStatusType;
}

export interface RecipientType {
  recipientPicture: string;
  recipientEmail: string;
  recipientName: string;
}

export const MESSAGE_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const;

type MessageStatusType = (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];

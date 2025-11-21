import type { MessageType } from '@type/message';
import { formatMessageTime } from '@utils/time';

export const getIsFirstOfDay = (messages: MessageType[], index: number) => {
  if (index < 0 || index >= messages.length) {
    return false;
  }

  const currentDate = formatMessageTime(messages[index].sendAt).datePart;

  const prevMessage = messages[index - 1];
  const prevDate = formatMessageTime(prevMessage.sendAt).datePart;

  return currentDate !== prevDate;
};

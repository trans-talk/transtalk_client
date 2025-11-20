import type { MessageType } from '@type/message';
import { formatMessageTime } from '@utils/time';

export const getIsFirstOfDay = (messages: MessageType[], index: number) => {
  const currentDate = formatMessageTime(messages[index].sendAt).datePart;

  const prevMessage = messages[index - 1];
  const prevDate = prevMessage
    ? formatMessageTime(prevMessage.sendAt).datePart
    : null;

  return currentDate !== prevDate;
};

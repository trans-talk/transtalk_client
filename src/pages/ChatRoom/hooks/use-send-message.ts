import useSubscribeChatHistory from '@pages/ChatRoom/hooks/use-subscribe-chat-history';
import { useState } from 'react';

export default function useSendMessage(chatRoomId: string) {
  const { sendMessage } = useSubscribeChatHistory(chatRoomId);

  const [inputText, setInputText] = useState('');

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInputText('');
  };

  return {
    inputText,
    handleChangeInputText,
    handleSendMessage,
  };
}

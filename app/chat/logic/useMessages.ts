import { useCallback } from 'react';
import { useMessageStore } from '@/app/chat/store/store';
import { Message } from '@/app/interfaces';

export const useMessages = () => {
  const { messages, addMessage } = useMessageStore();

  const handleAddMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    addMessage(newMessage);
  }, [addMessage]);

  return {
    messages,
    addMessage: handleAddMessage,
  };
};

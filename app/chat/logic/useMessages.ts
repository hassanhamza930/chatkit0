import { useCallback, useEffect, useState, useRef } from 'react';
import { useMessageStore } from '@/app/chat/store/store';
import { Message } from '@/app/interfaces';
import { useInputBoxStore } from '@/components/InputBox/store/inputboxstore';
import {
  MESSAGES_STORAGE_KEY,
  parseStoredMessages,
  serializeMessages,
  generateMessageId,
  loadMessagesFromStorage,
  saveMessagesToStorage,
  respondToUserMessage,
} from './messageUtils';


export const useMessages = () => {
  const { messages, addMessage, setStreamingResponse, setMessages } = useMessageStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const prevMessagesRef = useRef<Message[]>([]);
  const { openrouterKey } = useInputBoxStore();

  // 1. Load messages from localStorage on mount
  useEffect(() => {
    loadMessagesFromStorage(
      MESSAGES_STORAGE_KEY,
      parseStoredMessages,
      setMessages,
      setIsInitialized
    );
  }, [setMessages]);

  // 2. Save messages to localStorage whenever they change
  useEffect(() => {
    saveMessagesToStorage(
      MESSAGES_STORAGE_KEY,
      serializeMessages,
      messages,
      prevMessagesRef,
      isInitialized
    );
  }, [messages, isInitialized]);

  // 3. Add a message with generated ID and timestamp
  const handleAddMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    addMessage({
      ...message,
      id: generateMessageId(),
      timestamp: new Date(),
    });
  }, [addMessage]);

  // 4. React to new user messages and call OpenRouter
  useEffect(() => {
    respondToUserMessage({
      messages,
      openrouterKey,
      setStreamingResponse,
      handleAddMessage,
    });
  }, [messages, handleAddMessage, setStreamingResponse, openrouterKey]);

  // 5. Clear all messages from both state and localStorage
  const clearMessages = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
    prevMessagesRef.current = [];
  }, [setMessages]);

  return {
    messages,
    addMessage: handleAddMessage,
    clearMessages,
  };
}

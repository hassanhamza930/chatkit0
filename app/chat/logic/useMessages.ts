import { useCallback, useEffect, useState, useRef } from 'react';
import { useMessageStore } from '@/app/chat/store/store';
import { Message } from '@/app/interfaces';
import { useInputBoxStore } from '@/components/InputBox/store/inputboxstore';

const MESSAGES_STORAGE_KEY = 'chat_messages';

const callOpenRouter = async (
  messages: Omit<Message, 'id' | 'timestamp'>[],
  model: string,
  apiKey: string
) => {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.href,
      'X-Title': 'ChatKit',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: messages.map(msg => ({
        role: msg.sender,
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

// Helper function to parse stored messages with proper date objects
const parseStoredMessages = (stored: string | null): Message[] => {
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) 
      ? parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      : [];
  } catch (error) {
    console.error('Error parsing stored messages:', error);
    return [];
  }
};

export const useMessages = () => {
  const { messages, addMessage, setStreamingResponse, setMessages } = useMessageStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const prevMessagesRef = useRef<Message[]>([]);
  const { openrouterKey } = useInputBoxStore();

  // Load messages from localStorage on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
    if (storedMessages) {
      const parsedMessages = parseStoredMessages(storedMessages);
      if (parsedMessages.length > 0) {
        setMessages(parsedMessages);
      }
    }
    setIsInitialized(true);
  }, [setMessages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized || messages === prevMessagesRef.current) return;
    
    try {
      const messagesToStore = messages.map(msg => ({
        ...msg,
        // Convert Date objects to ISO strings for storage
        timestamp: msg.timestamp.toISOString()
      }));
      
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messagesToStore));
      prevMessagesRef.current = [...messages];
    } catch (error) {
      console.error('Error saving messages to localStorage:', error);
    }
  }, [messages, isInitialized]);

  
  const handleAddMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    addMessage(newMessage);
  }, [addMessage]);


  useEffect(() => {
    const processLatestMessage = async () => {
      if (messages.length === 0) return;

      const lastMessage = messages[messages.length - 1];
      
      // Only proceed if the last message is from the user
      if (lastMessage.sender !== 'user') return;

      const selectedModel = lastMessage.selectedModel;
      
      // Get API key based on whether the model requires BYOK
      const apiKey = selectedModel.byok 
        ? openrouterKey || ''
        : process.env.NEXT_PUBLIC_OPENROUTER_KEY || '';

      if (!apiKey) {
        console.error('No API key available for OpenRouter');
        return;
      }


      try {
        setStreamingResponse(true);
        
        const assistantResponse = await callOpenRouter(
          messages.map(({ content, sender, selectedModel }) => ({
            content,
            sender,
            selectedModel
          })),
          selectedModel.value,
          apiKey
        );

        // Add assistant's response
        handleAddMessage({
          content: assistantResponse,
          sender: 'assistant',
          selectedModel,
        });
      } catch (error) {
        console.error('Error calling OpenRouter:', error);
        // Optionally add an error message to the chat
        handleAddMessage({
          content: 'Sorry, I encountered an error processing your request.',
          sender: 'assistant',
          selectedModel,
        });
      } finally {
        setStreamingResponse(false);
      }
    };

    processLatestMessage();
  }, [messages, handleAddMessage, setStreamingResponse]);

  // Clear all messages from both state and localStorage
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
};

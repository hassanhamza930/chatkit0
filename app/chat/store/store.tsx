import { create } from 'zustand';
import { Message } from '../../interfaces';

interface MessageStore {
  messages: Message[];
  streamingResponse: boolean;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;
  setStreamingResponse: (isStreaming: boolean) => void;
}

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  streamingResponse: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setMessages: (messages) => set({ messages }),
  clearMessages: () => set({ messages: [] }),
  setStreamingResponse: (isStreaming) => set({ streamingResponse: isStreaming }),
}));

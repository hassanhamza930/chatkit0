"use client";

import { create } from 'zustand';
import { ChatInterface, MessageInterface } from '../../interfaces';

interface ChatStore {
  chats: ChatInterface[];
  setChats: ({ chats }: { chats: ChatInterface[] }) => void;
  addChat: ({ chat }: { chat: ChatInterface }) => void;
  deleteChat: ({ chatId }: { chatId: string }) => void;
  updateChat: ({ chatId, chat }: { chatId: string; chat: Partial<ChatInterface> }) => void;
  clearChats: () => void;
  addMessage: ({ message, chatId }: { message: MessageInterface; chatId: string }) => void;
  deleteMessage: ({ messageId, chatId }: { messageId: string; chatId: string }) => void;
  selectedChat: ChatInterface | undefined;
  setSelectedChat: ({ chat }: { chat: ChatInterface }) => void;
  loadingResponse: boolean;
  setLoadingResponse: (loading: boolean) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  setChats: ({ chats }) => set((state) => {
    // Update selectedChat if it exists in the new chats array
    const updatedSelectedChat = state.selectedChat 
      ? chats.find(chat => chat.id === state.selectedChat?.id) || undefined
      : undefined;
    
    return {
      chats,
      selectedChat: updatedSelectedChat
    };
  }),
  addChat: ({ chat }) => set((state) => ({
    chats: [...state.chats, chat],
    selectedChat: chat  // Automatically select the newly created chat
  })),
  deleteChat: ({ chatId }) => set((state) => ({
    chats: state.chats.filter(chat => chat.id !== chatId),
    // Clear selectedChat if the deleted chat was selected
    selectedChat: state.selectedChat?.id === chatId ? undefined : state.selectedChat
  })),
  updateChat: ({ chatId, chat }) => set((state) => {
    const updatedChats = state.chats.map(c => c.id === chatId ? { ...c, ...chat } : c);
    
    // Also update selectedChat if it's the same chat being updated
    const updatedSelectedChat = state.selectedChat?.id === chatId 
      ? { ...state.selectedChat, ...chat }
      : state.selectedChat;
    
    return {
      chats: updatedChats,
      selectedChat: updatedSelectedChat
    };
  }),
  clearChats: () => set({ chats: [], selectedChat: undefined }),
  addMessage: ({ message, chatId }) => set((state) => {
    const updatedChats = state.chats.map(chat => 
      chat.id === chatId ? { ...chat, messages: [...chat.messages, message], timeUpdated: new Date() } : chat
    );
    
    // Also update selectedChat if it's the same chat being updated
    const updatedSelectedChat = state.selectedChat?.id === chatId 
      ? { ...state.selectedChat, messages: [...state.selectedChat.messages, message], timeUpdated: new Date() }
      : state.selectedChat;
    
    return {
      chats: updatedChats,
      selectedChat: updatedSelectedChat
    };
  }),
  deleteMessage: ({ messageId, chatId }) => set((state) => {
    const updatedChats = state.chats.map(chat => 
      chat.id === chatId ? { ...chat, messages: chat.messages.filter(message => message.id !== messageId) } : chat
    );
    
    // Also update selectedChat if it's the same chat being updated
    const updatedSelectedChat = state.selectedChat?.id === chatId 
      ? { ...state.selectedChat, messages: state.selectedChat.messages.filter(message => message.id !== messageId) }
      : state.selectedChat;
    
    return {
      chats: updatedChats,
      selectedChat: updatedSelectedChat
    };
  }),
  selectedChat: undefined,
  setSelectedChat: ({ chat }) => set({ selectedChat: chat }),
  loadingResponse: false,
  setLoadingResponse: (loading: boolean) => set({ loadingResponse: loading })
}));

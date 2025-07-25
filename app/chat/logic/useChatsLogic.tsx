import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/store";
import { CHATS_STORAGE_KEY, callOpenRouterStreaming, readChatsFromLocalStorage } from "./chatUtils";
import { useInputBoxStore } from "@/components/InputBox/store/inputboxstore";
import { MessageInterface } from "@/app/interfaces";

export const useChatsLogic = () => {
    const { chats, setChats, setSelectedChat, addChat, selectedChat, addMessage, updateMessage, loadingResponse, setLoadingResponse } = useChatStore();
    const { openrouterKey } = useInputBoxStore();
    const [initialized, setInitialized] = useState(false);
    const processedMessageIds = useRef(new Set<string>());

    //load chats from local storage and set them to the store
    useEffect(() => {
        const loadedChats = readChatsFromLocalStorage();
        setChats({ chats: loadedChats });

        if (!selectedChat) {
            if (loadedChats.length > 0) {
                const latestChat = [...loadedChats].sort((a, b) => new Date(b.timeUpdated).getTime() - new Date(a.timeUpdated).getTime())[0];
                setSelectedChat({ chat: latestChat });
            } else {
                addChat({
                    chat: {
                        id: crypto.randomUUID(),
                        name: "New Chat",
                        messages: [],
                        timeUpdated: new Date(),
                    },
                });
            }
        }
        setInitialized(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //store chats in local storage everytime the chats state changes
    useEffect(() => {
        if (initialized) {
            localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
        }
    }, [chats, initialized]);

    //Handle user messages when it is the latest message in the chat.
    useEffect(() => {
        const handleNewMessage = async () => {
            if (selectedChat && selectedChat.messages.length > 0 && !loadingResponse) {
                const lastMessage = selectedChat.messages[selectedChat.messages.length - 1];

                // Check if this is a user message and we haven't processed it yet
                if (lastMessage.sender === 'user' && !processedMessageIds.current.has(lastMessage.id)) {
                    // Mark this message as processed
                    processedMessageIds.current.add(lastMessage.id);

                    setLoadingResponse(true);

                    // Create an empty assistant message that will be updated with streaming content
                    const assistantMessage: MessageInterface = {
                        id: crypto.randomUUID(),
                        content: '',
                        sender: 'assistant',
                        timestamp: new Date(),
                        selectedModel: lastMessage.selectedModel,
                    };

                    // Add the empty message first
                    addMessage({ chatId: selectedChat.id, message: assistantMessage });

                    try {
                        await callOpenRouterStreaming({
                            selectedModel: lastMessage.selectedModel,
                            openrouterkey: openrouterKey,
                            messages: selectedChat.messages,
                            onChunk: (chunk: string) => {
                                // Update the message content with the new chunk
                                updateMessage({ 
                                    messageId: assistantMessage.id, 
                                    chatId: selectedChat.id, 
                                    updates: { 
                                        content: assistantMessage.content + chunk 
                                    } 
                                });
                                // Update the local reference to keep track of content
                                assistantMessage.content += chunk;
                            }
                        });
                    } catch (error) {
                        console.error('Error calling OpenRouter:', error);
                        // Update the message with error content
                        updateMessage({ 
                            messageId: assistantMessage.id, 
                            chatId: selectedChat.id, 
                            updates: { 
                                content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` 
                            } 
                        });
                    } finally {
                        setLoadingResponse(false);
                    }
                }
            }
        };

        handleNewMessage();
    }, [selectedChat, openrouterKey, loadingResponse]);

    return { chats, setChats };
};



"use client";

import InputBox from "@/components/InputBox/InputBox";
import { useRouter } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { MessagesArea } from "./components/MessagesArea";
import { MessageInterface, ModelInterface } from "../interfaces";
import { useInputBoxStore } from "@/components/InputBox/store/inputboxstore";
import Header from "@/components/Header/Header";
import { useChatsLogic } from "./logic/useChatsLogic";
import { useChatStore } from "./store/store";
import { toast } from "sonner";
import { callOpenRouter } from "./logic/chatUtils";
import { availableModels } from "../const";
import { useCallback } from "react";

export default function Chat() {
    useChatsLogic();
    const router = useRouter();
    const { searchQuery, selectedModel, setSearchQuery, openrouterKey } = useInputBoxStore();
    const { addMessage, selectedChat, setSelectedChat, addChat, chats, updateChat } = useChatStore();


    const handleSubmit = useCallback(async () => {
        const { searchQuery, selectedModel, openrouterKey } = useInputBoxStore.getState();
        const { selectedChat } = useChatStore.getState();

        if (!searchQuery) return;

        var messageToSubmit: MessageInterface = {
            id: crypto.randomUUID(),
            content: searchQuery,
            sender: "user",
            timestamp: new Date(),
            selectedModel: selectedModel!
        }


        if (selectedChat) {

            if (selectedChat.messages.length == 0) {
                callOpenRouter({
                    selectedModel: {
                        name: "Gemini Flash Lite",
                        value: "google/gemini-2.0-flash-lite-001",
                        byok: false,
                        thinking: false,
                        logo: "/gemini.png"
                    },
                    openrouterkey: openrouterKey,
                    messages: [
                        {
                            content: "You are a helpful naming assistant, in a chat application, you have to give a short name to that conversation based on my message for example 'Info About Wikipedia' etc. REMEMBER: Your response should contain only a few words that will be used as title of a chat based on my first message, Don't add any other characters in your response remember this. Only a few words that directly explain the title of that chat",
                            sender: "user",
                        },
                        {
                            content: searchQuery,
                            sender: "user",
                        }
                    ] as Partial<MessageInterface>[]
                }).then((response) => {

                    updateChat({
                        chatId: selectedChat.id,
                        chat: {
                            name: response as string,
                        }
                    })
                })
            }

            addMessage({
                chatId: selectedChat.id,
                message: messageToSubmit
            })

            setSearchQuery("");

        }
        else {
            toast.error("No chat selected");
        }

    }, [addMessage, setSearchQuery, updateChat]);

    return (
        <div className="w-full flex flex-row justify-center items-center h-full overflow-hidden">

            <Sidebar />

            <div className="relative z-0 h-full w-full px-[10%] flex flex-col justify-center items-center bg-white/5 overflow-hidden">
                <Header />
                <MessagesArea />
                <div className="h-auto w-full py-10 flex justify-center items-center">
                    <InputBox onSubmit={handleSubmit} />
                </div>

            </div>

        </div>
    )
}
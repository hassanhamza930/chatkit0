"use client";

import InputBox from "@/components/InputBox/InputBox";
import { useRouter } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { MessagesArea } from "./components/MessagesArea";
import { useMessages } from "./logic/useMessages";
import { Model } from "../interfaces";
import { useInputBoxStore } from "@/components/InputBox/store/inputboxstore";

export default function Chat() {
    const router = useRouter();
    const { searchQuery, selectedModel, setSearchQuery } = useInputBoxStore();
    const { addMessage } = useMessages();


    const handleSubmit = () => {
        if (!searchQuery) return;
        
        addMessage({
            content: searchQuery,
            sender: 'user',
            selectedModel: selectedModel || {
                name: 'Default',
                value: 'default',
                logo: '',
                byok: false
            }
        });

        setSearchQuery("");
    };

    return (
        <div className="w-full flex flex-row justify-center items-center h-full">

            <Sidebar />

            <div className="h-full w-full px-[10%] flex flex-col justify-center items-center">

                <MessagesArea />

                <div className="h-auto w-full py-10 flex justify-center items-center">
                    <InputBox onSubmit={handleSubmit} />
                </div>

            </div>

        </div>
    )
}
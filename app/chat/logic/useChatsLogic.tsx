import { useEffect, useState } from "react";
import { useChatStore } from "../store/store";
import { CHATS_STORAGE_KEY, readChatsFromLocalStorage } from "./chatUtils";

export const useChatsLogic = () => {
    const { chats, setChats, setSelectedChat, addChat, selectedChat } = useChatStore();
    const [initialized, setInitialized] = useState(false);

    //load chats from local storage and set them to the store
    useEffect(() => {
        const loadedChats = readChatsFromLocalStorage();
        setChats({ chats: loadedChats });

        if (!selectedChat) {
            if (loadedChats.length > 0) {
                const latestChat = [...loadedChats].sort((a, b) =>new Date(b.timeUpdated).getTime() - new Date(a.timeUpdated).getTime())[0];
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

    return { chats, setChats };
};



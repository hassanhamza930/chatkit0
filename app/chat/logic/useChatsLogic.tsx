import { useEffect } from "react";
import { useChatStore } from "../store/store";
import { CHATS_STORAGE_KEY, readChatsFromLocalStorage } from "./chatUtils";

export const useChatsLogic = () => {
    const { chats, setChats } = useChatStore();

    // Load chats from local storage
    useEffect(() => {
        var chats = readChatsFromLocalStorage();
        setChats({ chats });
    }, []);


    //store chats in local storage everytime the chats state changes
    useEffect(() => {
        localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
    }, [chats]);

    return { chats, setChats };
};



import { useEffect, useState } from "react";
import { useInputBoxStore } from "../store/inputboxstore";

export default function useInputBoxLogic() {
    const { searchQuery, setSearchQuery, selectedModel, setSelectedModel, openrouterKey, setOpenrouterKey } = useInputBoxStore();

    useEffect(() => {
        setOpenrouterKey(localStorage.getItem("openrouterKey") || "");
    }, []);

    return { searchQuery, setSearchQuery, selectedModel, setSelectedModel };
}
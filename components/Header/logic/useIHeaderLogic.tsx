import { useEffect, useState } from "react";
import { useInputBoxStore } from "../../InputBox/store/inputboxstore";
import { availableModels } from "@/app/const";

export default function useHeaderLogic() {
    const { setOpenrouterKey } = useInputBoxStore();

    useEffect(() => {
        setOpenrouterKey(localStorage.getItem("openrouterKey") || "");
    }, []);

    
}
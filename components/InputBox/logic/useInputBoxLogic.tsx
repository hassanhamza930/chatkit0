import { useEffect, useState } from "react";
import { useInputBoxStore } from "../store/inputboxstore";
import { availableModels } from "@/app/const";

export default function useInputBoxLogic() {
    const { setOpenrouterKey } = useInputBoxStore();

    useEffect(() => {
        setOpenrouterKey(localStorage.getItem("openrouterKey") || "");
    }, []);

    
}
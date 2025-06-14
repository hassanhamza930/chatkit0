import { useState } from "react";
import { useInputBoxStore } from "../store/inputboxstore";

export default function useInputBoxLogic() {
    const { searchQuery, setSearchQuery } = useInputBoxStore();

    return { searchQuery, setSearchQuery };
}
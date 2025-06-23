'use client'
import { FaCheck, FaExclamation, FaKey } from "react-icons/fa";
import { useInputBoxStore } from "../InputBox/store/inputboxstore";
import OpenRouterKeyModal from "./components/OpenRouterKeyModal";
import { useChatStore } from "@/app/chat/store/store";
import useHeaderLogic from "./logic/useIHeaderLogic";
import { memo, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const HeaderComponent = () => {
    useHeaderLogic();
    const { openrouterKey, setOpenrouterKeyModalOpen } = useInputBoxStore();
    const chatName = useChatStore(state => state.selectedChat?.name);
    const isMobile = useIsMobile();

    const handleOpenModal = useCallback(() => {
        setOpenrouterKeyModalOpen(true);
    }, [setOpenrouterKeyModalOpen]);

    return (
        <>
            <header className="absolute top-0 right-0 z-40 w-full flex flex-row justify-between items-center px-4 md:px-6 py-2 md:py-4 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-3xl">

                <div className={`flex flex-row justify-start items-center ${isMobile ? 'ml-10' : ''}`}>
                    <h1 style={{ fontFamily: "DM Sans" }} className="text-lg md:text-xl font-semibold subpixel-antialiased tracking-tight text-center text-white/80">
                        {chatName ? 
                            chatName.slice(0, isMobile ? 15 : 20) + (chatName.length > (isMobile ? 15 : 20) ? "..." : "") 
                            : "ChatKit0"
                        }
                    </h1>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                    {/* OpenRouter Key Icon */}
                    <div className="relative">
                        <button
                            onClick={handleOpenModal}
                            className={`p-1.5 md:p-2 rounded-full border transition-all duration-300 hover:scale-105 ${openrouterKey
                                ? 'bg-white/20 border-white/50 text-white'
                                : 'bg-white/5 border-white/20 text-white/60 hover:border-white/40'
                                }`}
                        >
                            <FaKey className="w-3 h-3 md:w-4 md:h-4" />
                        </button>
                        {/* Key status indicator dot */}
                        <div className={`absolute top-0 -right-1 w-3 h-3 rounded-full border-2 border-zinc-950 text-white`} >
                            {
                                openrouterKey ?
                                    <FaCheck className="w-2 h-2" />
                                    :
                                    <FaExclamation className="w-2 h-2" />
                            }
                        </div>
                    </div>
                </div>

            </header>

            <OpenRouterKeyModal />
        </>
    );
} 

export default memo(HeaderComponent); 
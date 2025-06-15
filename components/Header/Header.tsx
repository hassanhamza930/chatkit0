'use client'
import { FaCheck, FaExclamation, FaKey } from "react-icons/fa";
import { useInputBoxStore } from "../InputBox/store/inputboxstore";
import OpenRouterKeyModal from "./components/OpenRouterKeyModal";

export default function Header() {
    const { openrouterKey, setOpenrouterKeyModalOpen } = useInputBoxStore();

    const handleOpenModal = () => {
        setOpenrouterKeyModalOpen(true);
    };

    return (
        <>
            <header className="absolute top-0 right-0 z-50 p-6">
                <div className="flex items-center gap-4">
                    {/* OpenRouter Key Icon */}
                    <div className="relative">
                        <button
                            onClick={handleOpenModal}
                            className={`p-2 rounded-full border transition-all duration-300 hover:scale-105 ${openrouterKey
                                ? 'bg-white/20 border-white/50 text-white'
                                : 'bg-white/5 border-white/20 text-white/60 hover:border-white/40'
                                }`}
                        >
                            <FaKey className="w-4 h-4" />
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
'use client'
import { useState } from "react";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { useInputBoxStore } from "../../InputBox/store/inputboxstore";
import { Input } from "@/components/ui/input";

export default function OpenRouterKeyModal() {
    const { openrouterKey, setOpenrouterKey, openrouterKeyModalOpen, setOpenrouterKeyModalOpen } = useInputBoxStore();
    const [tempKey, setTempKey] = useState("");

    const handleOpenModal = () => {
        setTempKey(openrouterKey);
    };

    const handleSaveKey = () => {
        setOpenrouterKey(tempKey);
        localStorage.setItem("openrouterKey", tempKey);
        setOpenrouterKeyModalOpen(false);
    };

    const handleCancel = () => {
        setTempKey("");
        setOpenrouterKeyModalOpen(false);
    };

    const handleRemoveKey = () => {
        setOpenrouterKey("");
        localStorage.removeItem("openrouterKey");
        setTempKey("");
        setOpenrouterKeyModalOpen(false);
    };

    // Set temp key when modal opens
    if (openrouterKeyModalOpen && tempKey === "" && openrouterKey) {
        setTempKey(openrouterKey);
    }

    if (!openrouterKeyModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleCancel}
            />

            {/* Modal Content */}
            <div className="relative shadow-sm rounded-2xl shadow-white/20">
                {/* Glowing border effect */}
                <div className="absolute inset-[-2px] rounded-2xl overflow-hidden">
                    <div
                        className="absolute inset-[-2px] rounded-2xl animate-spin-slow"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent, white, #a855f7, #ec4899, transparent, white)',
                            filter: 'blur(8px)',
                            opacity: 0.4
                        }}
                    />
                    {/* Background mask */}
                    <div className="absolute inset-[1px] bg-zinc-950 rounded-2xl" />
                </div>

                {/* Main modal content */}
                <div className="relative bg-zinc-950/90 m-0 rounded-2xl p-6 w-full max-w-md shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white/90" style={{ fontFamily: "Geist" }}>
                            {openrouterKey ? 'Update API Key' : 'OpenRouter API Key'}
                        </h2>
                        <button
                            onClick={handleCancel}
                            className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white/90 transition-all duration-300 hover:scale-105"
                        >
                            <FaTimes className="w-4 h-4" />
                        </button>
                    </div>

                    <p className="text-white/60 text-sm mb-6 leading-relaxed" style={{ fontFamily: "Geist" }}>
                        {openrouterKey 
                            ? 'Update your OpenRouter API key or remove it to use free models only.'
                            : 'Enter your OpenRouter API key to access premium models. Your key is stored locally and never shared.'
                        }
                    </p>

                    <div className="space-y-6">
                        {openrouterKey ? (
                            <>
                                <div className="p-3 bg-white/5 border border-white/20 rounded-lg">
                                    <p className="text-white/50 text-xs mb-1" style={{ fontFamily: "Geist" }}>
                                        Current Key:
                                    </p>
                                    <p className="text-white/70 text-sm font-mono" style={{ fontFamily: "Geist Mono" }}>
                                        {openrouterKey.substring(0, 12)}...{openrouterKey.substring(openrouterKey.length - 4)}
                                    </p>
                                </div>
                                
                                <button
                                    onClick={handleRemoveKey}
                                    className="w-full h-10 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-all duration-300 hover:scale-[1.02] text-sm font-medium flex items-center justify-center gap-2"
                                    style={{ fontFamily: "Geist" }}
                                >
                                    <FaTrash className="w-3 h-3" />
                                    Remove Key
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="relative">
                                    <Input
                                        type="password"
                                        placeholder="sk-or-v1-..."
                                        value={tempKey}
                                        onChange={(e) => setTempKey(e.target.value)}
                                        className="bg-white/5 border-white/20 text-white/90 placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all duration-300 h-12 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                                        style={{ fontFamily: "Geist Mono" }}
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleSaveKey}
                                        disabled={!tempKey.trim()}
                                        className={`flex-1 h-10 rounded-lg border transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium ${tempKey.trim()
                                                ? 'bg-white/10 border-white/30 text-white/90 hover:bg-white/20 hover:border-white/40 hover:scale-[1.02] shadow-lg shadow-white/5'
                                                : 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed'
                                            }`}
                                        style={{ fontFamily: "Geist" }}
                                    >
                                        <FaCheck className="w-3 h-3" />
                                        Save Key
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 h-10 rounded-lg border border-white/20 text-white/70 hover:bg-white/5 hover:text-white/90 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] text-sm font-medium"
                                        style={{ fontFamily: "Geist" }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {openrouterKey && (
                        <div className="mt-6 p-4 bg-white/5 border border-white/20 rounded-xl">
                            <p className="text-white/70 text-sm flex items-center" style={{ fontFamily: "Geist" }}>
                                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse block" />
                                API key is currently active
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 
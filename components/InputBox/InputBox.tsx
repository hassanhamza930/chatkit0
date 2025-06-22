'use client'
import { motion } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaArrowsToCircle, FaBrain, FaExclamation, FaKey } from "react-icons/fa6";
import { Command, Plus, CornerDownLeft } from "lucide-react";
import { availableModels } from "@/app/const";
import { useInputBoxStore } from "./store/inputboxstore";
import { useChatStore } from "@/app/chat/store/store";
import { memo, useCallback } from "react";

interface InputBoxProps {
    onSubmit: () => void;
}

const InputBox = memo(({ onSubmit }: InputBoxProps) => {

    const { searchQuery, setSearchQuery, selectedModel, setSelectedModel, openrouterKey } = useInputBoxStore();
    const { loadingResponse } = useChatStore();

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (loadingResponse) {
            return;
        }
        if (e.key === 'Enter' && e.shiftKey) {
            return;
        }

        else if (e.key === 'Enter') {
            e.preventDefault();
            onSubmit();
        }
    }, [loadingResponse, onSubmit]);

    const handleModelChange = useCallback((value: string) => {
        const model = availableModels.find(m => m.value === value);
        setSelectedModel(model!);
    }, [setSelectedModel]);


    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0)" }}
            transition={{ duration: 1 }}
            className="relative w-full">

            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div
                    className="absolute inset-[-4px] rounded-2xl animate-spin-slow"
                    style={{
                        background: 'conic-gradient(from 0deg, transparent, white, #a855f7, #ec4899, transparent, white)',
                        filter: 'blur(20px)',
                        opacity: 0.5
                    }}
                />
                {/* Background mask */}
                <div className="absolute inset-[2px] bg-zinc-950 rounded-2xl" />
            </div>

            {/* Main content */}
            <div
                style={{ fontFamily: "Geist", resize: "none" }}
                className="relative shadow-xl shadow-white/5 bg-white/5 rounded-2xl overflow-hidden p-4 border border-white/20 outline-none placeholder:text-white/50 text-white/90 flex flex-col gap-y-5">
                <textarea
                    placeholder="Ask me anything..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full min-h-12 max-h-64 bg-transparent text-sm outline-none resize-none [field-sizing:content] scrollbar-hide font-normal tracking-normal break-all"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                />

                <div className="flex flex-row justify-between items-center w-full">

                    <div className="flex-row flex justify-start items-center">

                        <Select value={selectedModel?.value || ''} onValueChange={handleModelChange}>
                            <SelectTrigger className="bg-transparent text-white/90 border border-white/60 rounded-lg px-3 text-xs outline-none w-fit shadow-sm font-medium shadow-white/20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-950 border-white/20 text-xs outline-none">
                                {availableModels.map((model) => (
                                    <SelectItem key={model.value} value={model.value} className="text-white/90 focus:bg-white/10 font-medium">
                                        <div className="flex flex-row justify-start items-center gap-2">
                                            <img src={model.logo} alt={model.name} className="w-4 h-4 invert" />
                                            {
                                                model.name
                                            }
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>

                    <Button
                        onClick={onSubmit}
                        disabled={searchQuery.length === 0 || loadingResponse}
                        className={`bg-white/10 shadow-sm border-[1px] ${searchQuery.length > 0 ? 'border-white/60 text-white' : 'border-white/80 text-white/80'} hover:opacity-50 transition-all duration-300 h-8 rounded-sm flex flex-row justify-center items-center gap-1`}>

                        {
                            selectedModel?.byok == true && openrouterKey == "" ?
                                <div className="flex flex-row justify-center items-center gap-2 text-yellow-400">
                                    <FaKey style={{ width: '12px', height: '12px' }} />
                                    <span className="text-xs">Missing OpenRouter Key</span>
                                </div>
                                :
                                <FaArrowRight style={{ width: '10px', height: '12px' }} />
                        }


                    </Button>


                </div>
            </div>

        </motion.div>
    )
})

export default InputBox;
'use client'
import { motion } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import useInputBoxLogic from "./logic/useInputBoxLogic";
import { Command, Plus, CornerDownLeft } from "lucide-react";


export default function InputBox() {

    const { searchQuery, setSearchQuery, selectedModel, setSelectedModel } = useInputBoxLogic();


    const availableModels = [
        {
            name: "Gemini Flash 2.0 Lite",
            value: "google/gemini-2.0-flash-lite-001",
            byok: false
        },
        {
            name: "o4 Mini",
            value: "openai/o4-mini",
            byok: true
        },
    ];


    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0)" }}
            transition={{ duration: 1 }}
            className="relative w-3/5 2xl:w-[800px]">

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
                    className="w-full min-h-12 max-h-64 bg-transparent text-md outline-none resize-none [field-sizing:content] scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                />

                <div className="flex flex-row justify-between items-center w-full">

                    <div className="flex-row flex justify-start items-center">

                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                            <SelectTrigger className="bg-transparent text-white/90 border border-white/60 rounded-lg px-3 text-xs outline-none w-fit shadow-sm font-medium shadow-white/20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-950 border-white/20 text-xs ">
                                {availableModels.map((model) => (
                                    <SelectItem key={model.value} value={model.value} className="text-white/90 focus:bg-white/10 font-medium">{model.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>

                    <Button
                        disabled={searchQuery.length === 0}
                        className={`bg-white/5 shadow-sm border-[1px] ${searchQuery.length > 0 ? 'border-white/60 text-white' : 'border-white/80 text-white/80'} hover:opacity-50 transition-all duration-300 h-8 rounded-sm flex flex-row justify-center items-center gap-1`}>

                        {
                            searchQuery.length > 0 ?
                                <div className="flex flex-row justify-center items-center gap-1">
                                    <Command style={{ width: '12px', height: '12px' }} />
                                    <Plus style={{ width: '12px', height: '12px' }} />
                                    <CornerDownLeft style={{ width: '12px', height: '12px' }} />
                                </div>
                                :
                                <FaArrowRight style={{ width: '10px', height: '12px' }} />
                        }

                    </Button>


                </div>
            </div>

        </motion.div>
    )
}
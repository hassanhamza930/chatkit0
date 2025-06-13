import { motion } from "motion/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";

export default function InputBox() {
    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0)" }}
            transition={{ duration: 1 }}
            className="relative w-2/4 mt-10"
        >
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
                className="relative shadow-xl shadow-white/5 bg-white/5 rounded-2xl overflow-hidden p-4 border border-white/20 outline-none placeholder:text-white/50 text-white/90 flex flex-col gap-y-2"
            >
                <textarea
                    placeholder="Ask me anything..."
                    className="w-full min-h-24 max-h-64 bg-transparent text-md outline-none resize-none [field-sizing:content]"
                />

                <div className="flex flex-row justify-between items-center w-full">

                    <div className="flex-row flex justify-start items-center">

                        <Select defaultValue="gpt-4">
                            <SelectTrigger className="bg-transparent text-white/90 border border-white/60 rounded-lg px-3 text-xs outline-none w-fit shadow-sm shadow-white/20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-950 border-white/20 text-xs ">
                                <SelectItem value="gpt-4" className="text-white/90 focus:bg-white/10">GPT-4</SelectItem>
                                <SelectItem value="gpt-3.5" className="text-white/90 focus:bg-white/10">GPT-3.5</SelectItem>
                                <SelectItem value="gemini-pro" className="text-white/90 focus:bg-white/10">Gemini Pro</SelectItem>
                                <SelectItem value="claude-3" className="text-white/90 focus:bg-white/10">Claude 3</SelectItem>
                            </SelectContent>
                        </Select>

                    </div>

                    <Button className="bg-white/5 shadow-sm border border-white/60 text-white/90 h-8 rounded-sm px-3 flex flex-row justify-center items-center gap-2">
                        <span className="text-xs text-white/70">⌘ + Enter</span>
                        <FaArrowRight style={{ width: '12px', height: '12px' }} />
                    </Button>

                </div>
            </div>
        </motion.div>
    )
}
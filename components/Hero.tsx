
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { FaArrowRight, FaHandPointer, FaPaperPlane } from "react-icons/fa6";
import BlurReveal from "./BlurText";

export default function Hero() {
    return (
        <div
            className="w-full flex flex-col justify-start items-center px-[5%] md:px-[10%]">


            <BlurReveal
                style={{ fontFamily: "Geist Mono", fontWeight: "700" }}
                className="w-full max-w-[550px] text-4xl md:text-6xl text-center flex flex-wrap gap-x-2 justify-center tracking-tighter items-center text-shadow-2xs text-shadow-blue-600" text="ChatKit0" />

            <BlurReveal
                style={{ fontFamily: "Geist" }}
                className="mt-3 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4" text="An Abstraction Layer for multi-provider LLMs." />


            <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0)" }}
                transition={{ duration: 1 }}
                style={{ fontFamily: "Geist", resize: "none" }}
                className="h-36 w-2/4 bg-white/5 rounded-2xl overflow-hidden mt-10 p-4 border border-white/20 outline-none placeholder:text-white/50 text-white/90 flex flex-col">
               
                <textarea placeholder="Ask me anything..." className="w-full h-full bg-transparent text-md outline-none resize-none"></textarea>
               
                <div className="flex-row flex justify-end items-center w-full">
                    <Button className="bg-white/5 shadow-sm border border-white/60 text-white/90 h-8 w-8 rounded-sm">
                        <FaArrowRight className="h-full w-full" />
                    </Button>
                </div>

            </motion.div>



        </div >
    )
}
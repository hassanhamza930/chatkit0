'use client';

import BlurReveal from "@/components/BlurText";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "motion/react";
import { FaArrowRight } from "react-icons/fa6";



export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-[5%] md:px-[10%] h-full">


      <BlurReveal
        style={{ fontFamily: "Geist Mono", fontWeight: "700" }}
        className="w-full max-w-[550px] text-4xl md:text-6xl text-center flex flex-wrap gap-x-2 justify-center tracking-tighter items-center text-shadow-2xs text-shadow-blue-600" text="ChatKit0" />

      <BlurReveal
        style={{ fontFamily: "Geist" }}
        className="mt-3 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4" text="An Abstraction Layer for GPT, Gemini, Claude and more." />


      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0)" }}
        transition={{ duration: 1 }}
        style={{ fontFamily: "Geist", resize: "none" }}
        className="w-2/4 shadow-xl shadow-white/5 bg-white/5 rounded-2xl overflow-hidden mt-10 p-4 border border-white/20 outline-none placeholder:text-white/50 text-white/90 flex flex-col gap-y-2">

        <textarea
          placeholder="Ask me anything..."
          className="w-full min-h-24 max-h-64 bg-transparent text-md outline-none resize-none [field-sizing:content]"
        />

        <div className="flex flex-row justify-between items-center w-full">

          <div className="flex-row flex justify-start items-center">

            <Select defaultValue="gpt-4">
              <SelectTrigger className="bg-transparent text-white/90 border border-white/60 rounded-lg px-3 text-xs outline-none w-fit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/20 text-xs">
                <SelectItem value="gpt-4" className="text-white/90 focus:bg-white/10">GPT-4</SelectItem>
                <SelectItem value="gpt-3.5" className="text-white/90 focus:bg-white/10">GPT-3.5</SelectItem>
                <SelectItem value="gemini-pro" className="text-white/90 focus:bg-white/10">Gemini Pro</SelectItem>
                <SelectItem value="claude-3" className="text-white/90 focus:bg-white/10">Claude 3</SelectItem>
              </SelectContent>
            </Select>

          </div>

          <Button className="bg-white/5 shadow-sm border border-white/60 text-white/90 h-8 w-8 rounded-sm">
            <FaArrowRight className="h-full w-full" />
          </Button>

        </div>


      </motion.div>



    </div >
  )
}

'use client';

import BlurRevealText from "@/components/BlurText";
import InputBox from "@/components/InputBox/InputBox";



export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-[5%] md:px-[10%] h-full">


      <BlurRevealText
        style={{ fontFamily: "Geist Mono", fontWeight: "700" }}
        className="w-full max-w-[550px] text-4xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center tracking-tighter items-center text-shadow-2xs text-shadow-blue-600" text="ChatKit0" />

      <BlurRevealText
        style={{ fontFamily: "Geist" }}
        className="mt-3 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4 mb-10" text="An Abstraction Layer for GPT, Gemini, Claude and more." />


      <InputBox />

    </div >
  )
}

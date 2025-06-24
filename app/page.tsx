'use client';

import BlurRevealText from "@/components/BlurText";
import InputBox from "@/components/InputBox/InputBox";
import { useInputBoxStore } from "@/components/InputBox/store/inputboxstore";
import { useRouter } from "next/navigation";



export default function Home() {

  const router = useRouter();
  const { openrouterKey, selectedModel, setOpenrouterKeyModalOpen } = useInputBoxStore();


  return (
    <div className="w-full flex flex-col justify-center items-center px-[5%] md:px-[25%] h-full">


      <BlurRevealText
        style={{ fontFamily: "Geist Mono", fontWeight: "600" }}
        className="w-full max-w-[550px] text-4xl md:text-5xl text-center flex flex-wrap gap-x-2 justify-center tracking-tighter items-center text-shadow-2xs text-shadow-blue-600" text="ChatKit0" />

      <BlurRevealText
        style={{ fontFamily: "Geist" }}
        className="mt-3 text-sm md:text-md font-normal text-center text-white w-full max-w-[450px] px-4 mb-10" text="An Abstraction Layer for GPT, Gemini, Claude and more." />

      <InputBox onSubmit={() => {

        if (selectedModel?.byok == true && openrouterKey == "") {
          setOpenrouterKeyModalOpen(true);
        } else {
          router.push("/chat");
        }

      }} />

    </div >
  )
}

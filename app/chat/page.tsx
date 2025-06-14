"use client";

import InputBox from "@/components/InputBox/InputBox";
import { useRouter } from "next/navigation";

export default function Chat() {

    const router = useRouter();

    return (
        <div className="w-full flex flex-row justify-center items-center h-full">

            <div className="h-full w-72 bg-white/5 flex flex-none">

            </div>

            <div className="h-full w-full flex flex-col justify-center items-center">

                <div className="h-full w-full flex flex-col justify-center items-center"></div>

                <div className="h-auto w-full py-10 flex justify-center items-center">
                    <InputBox onSubmit={() => {}} />
                </div>

            </div>

        </div>

    )
}
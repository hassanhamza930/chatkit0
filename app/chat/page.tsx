"use client";

import InputBox from "@/components/InputBox/InputBox";
import { useRouter } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { MessagesArea } from "./components/MessagesArea";

export default function Chat() {

    const router = useRouter();

    return (
        <div className="w-full flex flex-row justify-center items-center h-full">

            <Sidebar />

            <div className="h-full w-full flex flex-col justify-center items-center">

                <MessagesArea />

                <div className="h-auto w-full py-10 flex justify-center items-center">
                    <InputBox onSubmit={() => {}} />
                </div>

            </div>

        </div>

    )
}
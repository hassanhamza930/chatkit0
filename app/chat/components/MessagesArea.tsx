import { MessageInterface, ModelInterface } from "@/app/interfaces";
import { Message } from "./Message";
import { hideScrollbar } from "@/app/const";
import { useChatStore } from "../store/store";
import { LoaderCircle } from "lucide-react";


export function MessagesArea() {

    const { selectedChat, loadingResponse } = useChatStore();

    return (
        <div
            className="h-full flex flex-col justify-start items-center py-10 pt-24 gap-y-2 w-full overflow-y-auto overflow-x-hidden"
            style={hideScrollbar as React.CSSProperties}
        >
            {
                selectedChat?.messages.map((message) => (
                    <Message
                        key={message.id}
                        {...message}
                    />
                ))
            }

            {loadingResponse && (
                <div className="flex justify-center items-center p-4">
                    <LoaderCircle className="w-8 h-8 text-white/80 animate-spin" />
                </div>
            )}

        </div>
    );
}

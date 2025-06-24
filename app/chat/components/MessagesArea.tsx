import { MessageInterface, ModelInterface } from "@/app/interfaces";
import { Message } from "./Message";
import { hideScrollbar } from "@/app/const";
import { useChatStore } from "../store/store";
import { memo, useEffect, useRef } from "react";

const MessagesAreaComponent = () => {

    const messages = useChatStore(state => state.selectedChat?.messages);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth"});
        }
    }, [messages]);

    return (
        <div
            className="h-full flex flex-col justify-start items-center pb-[10%] pt-24 gap-y-2 w-full overflow-y-auto overflow-x-hidden"
            style={hideScrollbar as React.CSSProperties}
        >
            {
                messages?.map((message) => (
                    <Message
                        key={message.id}
                        {...message}
                    />
                ))
            }
            {/* Invisible element at the bottom to scroll to */}
            <div ref={messagesEndRef} />
        </div>
    );
}

export const MessagesArea = memo(MessagesAreaComponent);

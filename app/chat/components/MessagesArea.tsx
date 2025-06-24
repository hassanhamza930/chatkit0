import { MessageInterface, ModelInterface } from "@/app/interfaces";
import { Message } from "./Message";
import { hideScrollbar } from "@/app/const";
import { useChatStore } from "../store/store";
import { memo, useEffect, useRef, useState } from "react";

const MessagesAreaComponent = () => {

    const messages = useChatStore(state => state.selectedChat?.messages);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollableDivRef = useRef<HTMLDivElement>(null);
    const [isUserScrollingUp, setIsUserScrollingUp] = useState(false);

    // Auto-scroll to bottom when new messages are added, unless user has scrolled up
    useEffect(() => {
        if (!isUserScrollingUp && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isUserScrollingUp]);

    // Detect user scroll and update isUserScrollingUp state
    useEffect(() => {
        const div = scrollableDivRef.current;
        if (!div) return;

        const handleScroll = () => {
            // Check if the user has scrolled up from the very bottom
            const { scrollTop, scrollHeight, clientHeight } = div;
            const atBottom = scrollHeight - scrollTop <= clientHeight + 1; // +1 for slight tolerance

            if (!atBottom && !isUserScrollingUp) {
                setIsUserScrollingUp(true);
            } else if (atBottom && isUserScrollingUp) {
                setIsUserScrollingUp(false);
            }
        };

        div.addEventListener("scroll", handleScroll);

        return () => {
            div.removeEventListener("scroll", handleScroll);
        };
    }, [isUserScrollingUp]);

    return (
        <div
            ref={scrollableDivRef} // Attach ref to the scrollable div
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

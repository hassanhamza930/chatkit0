import { Message } from "@/app/chat/components/Message";
import { useMessageStore } from "@/app/chat/store/store";
import type { Message as MessageType } from "@/app/interfaces";

// Hide scrollbar while keeping functionality
const hideScrollbar = {
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE and Edge
} as const;

export function MessagesArea() {
    const { messages } = useMessageStore();

    return (
        <div 
            className="h-full flex flex-col justify-start items-center py-10 pt-24 gap-y-4 w-full overflow-y-auto pr-3" 
            style={hideScrollbar as React.CSSProperties}
        >
            {messages.map((message) => (
                <Message key={message.id} {...message} />
            ))}
        </div>
    );
}

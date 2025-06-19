import { Message } from "@/app/chat/components/Message";
import { useMessageStore } from "@/app/chat/store/store";
import type { Message as MessageType } from "@/app/interfaces";

const scrollbarStyle = {
    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(75, 85, 99, 0.5)', // gray-600 with opacity
        borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(107, 114, 128, 0.7)', // gray-500 with opacity
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(75, 85, 99, 0.5) transparent',
} as const;



export function MessagesArea() {
    const { messages } = useMessageStore();

    return (
        <div className="h-full flex flex-col justify-start items-center py-10 gap-y-4 w-4/5 overflow-y-auto pr-3" style={{ ...scrollbarStyle as React.CSSProperties }}>
            {messages.map((message) => (
                <Message key={message.id} {...message} />
            ))}
        </div>
    );
}

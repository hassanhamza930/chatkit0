import { MessageInterface, ModelInterface } from "@/app/interfaces";
import { Message } from "./Message";
import { hideScrollbar } from "@/app/const";
import { useChatStore } from "../store/store";


export function MessagesArea() {

    const { selectedChat } = useChatStore();

    return (
        <div
            className="h-full flex flex-col justify-start items-center py-10 pt-24 gap-y-2 w-full overflow-y-auto"
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

        </div>
    );
}

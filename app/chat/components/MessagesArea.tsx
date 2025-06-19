import { Message } from "@/app/chat/components/Message";
import { MessageProps } from "@/app/interfaces";

export function MessagesArea() {
    return (
        <div className="h-full flex flex-col justify-center items-center w-4/5">
            {
                [
                    {
                        id: "1",
                        content: "Hello",
                        sender: "user",
                        timestamp: new Date(),
                        selectedModel: {
                            name: "Gemini Flash 2.5",
                            value: "google/gemini-2.5-flash-preview-05-20",
                            logo: "/gemini.png",
                            byok: false
                        }
                    } as MessageProps
                ].map((message) => (
                    <Message key={message.id} {...message} />
                ))
            }
        </div>
    );
}

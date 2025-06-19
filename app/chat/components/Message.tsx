import type { Message } from '@/app/interfaces';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';

export function Message({ id, content, sender, timestamp, selectedModel }: Message) {
    return (
        <div className={`w-full`}>
            <div className={cn("flex flex-col gap-2 p-4 rounded-lg w-full  text-white", sender === "user" ? "bg-transparent" : "bg-white/5")}>

                <div className="flex flex-row justify-start items-center">
                    {/* <span style={{ fontFamily: "Special Gothic Expanded One" }} className="font-semibold text-sm opacity-80">{sender === 'user' ? 'You' : 'Assistant'}</span> */}
                    <span className="text-[10px] font-normal opacity-60">
                        {new Intl.DateTimeFormat('en-US', { hour: '2-digit', day: '2-digit', month: 'short' }).format(timestamp)}
                    </span>
                </div>

                <p className="text-sm opacity-90 break-all">
                    {
                        content
                    }
                </p>

                <div className="flex justify-end opacity-60">
                    {
                        sender != "user" &&
                        <span className="text-[11px] px-3 py-1 rounded-full backdrop-blur-xl border border-white/20 flex flex-row justify-center items-center gap-x-1">
                            <img src={selectedModel.logo} className="w-3 h-3 invert" />
                            {selectedModel.name}
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}

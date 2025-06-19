import type { Message } from '@/app/interfaces';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';

export function Message({ id, content, sender, timestamp, selectedModel }: Message) {
    return (
        <div className={`w-full flex flex-row ${sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={cn("flex flex-col gap-2 p-4 rounded-2xl max-w-3/5 min-w-2/4 text-white shadow-white/5 shadow-2xl", sender === "user" ? "bg-white/5 border border-dashed border-white/20" : "bg-white/5")}>

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
                    <span className="text-xs px-2 py-1 rounded-full backdrop-blur-xl border border-white/20 flex flex-row justify-center items-center gap-x-2">
                        <img src={selectedModel.logo} className="w-3 h-3 invert" />
                        {selectedModel.name}
                    </span>
                </div>
            </div>
        </div>
    );
}

import { MessageProps } from '@/app/interfaces';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';

export function Message({ id, content, sender, timestamp, selectedModel }: MessageProps) {
    return (
        <div className={`w-full flex flex-row ${sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={cn("flex flex-col gap-2 p-4 rounded-lg max-w-3/5 min-w-2/4 text-white shadow-white/5 shadow-2xl", sender === "user" ? "bg-white/5 border border-dashed border-white/20" : "bg-white/5")}>
                <div className="flex justify-between items-center">
                    <span style={{ fontFamily: "Special Gothic Expanded One" }} className="font-semibold text-sm">{sender === 'user' ? 'You' : 'Assistant'}</span>
                    <span className="text-[10px] font-normal opacity-70">
                        {new Intl.DateTimeFormat('en-US', { hour: '2-digit', day: '2-digit', month: 'short' }).format(timestamp)}
                    </span>
                </div>
                <p className="text-sm">{content}</p>
                <div className="flex justify-end">
                    <span className="text-xs px-2 py-1 rounded-sm backdrop-blur-xl border border-white/20 flex flex-row justify-center items-center gap-x-2">
                        <img src={selectedModel.logo} className="w-3 h-3 invert" />
                        {selectedModel.name}
                    </span>
                </div>
            </div>
        </div>
    );
}

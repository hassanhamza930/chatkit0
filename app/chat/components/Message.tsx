import type { MessageInterface } from '@/app/interfaces';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';

export function Message({ id, content, sender, timestamp, selectedModel }: MessageInterface) {
    return (
        <div className={`w-full`}>
            <div className={cn("flex flex-col p-5 rounded-lg w-full text-white", sender === "user" ? "bg-transparent" : "bg-white/5")}>

                <div className="flex flex-row justify-start items-center">
                    {/* <span style={{ fontFamily: "Special Gothic Expanded One" }} className="font-semibold text-sm opacity-80">{sender === 'user' ? 'You' : 'Assistant'}</span> */}
                    <span className="text-[10px] font-normal opacity-60">
                        {new Intl.DateTimeFormat('en-US', { hour: '2-digit', day: '2-digit', month: 'short' }).format(timestamp)}
                    </span>
                </div>

                <div className="text-base leading-relaxed opacity-90 break-words overflow-x-hidden">
                    <MarkdownRenderer content={content} className="prose prose-invert max-w-none prose-p:my-2 prose-headings:my-4 prose-ul:my-2 prose-ol:my-2 prose-li:my-1" />
                </div>

                <div className="flex justify-end opacity-80">
                    {
                        sender != "user" &&
                        <span className="text-xs tracking-wide font-light px-3 py-1 rounded-full backdrop-blur-xl border border-white/40 flex flex-row justify-center items-center gap-x-1">
                            <img src={selectedModel.logo} className="w-4 h-4 invert" />
                            {selectedModel.name}
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}

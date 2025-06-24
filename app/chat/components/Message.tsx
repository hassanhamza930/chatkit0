import type { MessageInterface } from '@/app/interfaces';
import { cn } from '@/lib/utils';
import { Brain } from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { memo } from 'react';

const MessageComponent = ({ id, content, sender, timestamp, selectedModel }: MessageInterface) => {

    const isAssistantWithEmptyContent = sender === 'assistant' && (!content || content.trim() === '');
    
    return (
        <div className={`w-full`}>
            <div className={cn("flex flex-col p-5 rounded-lg w-full text-white", sender === "user" ? "bg-transparent" : "bg-white/5")}>

                <div className="flex flex-row justify-start items-center">
                    {/* <span style={{ fontFamily: "Special Gothic Expanded One" }} className="font-semibold text-sm opacity-80">{sender === 'user' ? 'You' : 'Assistant'}</span> */}
                    <span className="text-[10px] md:text-xs font-normal opacity-60">
                        {new Intl.DateTimeFormat('en-US', { hour: '2-digit', day: '2-digit', month: 'short' }).format(timestamp)}
                    </span>
                </div>

                <div className="text-sm md:text-base leading-relaxed opacity-90 break-words overflow-x-hidden">
                    {isAssistantWithEmptyContent ? (
                    // {true ? (
                        <div className="animate-pulse mt-4">
                            <div className="flex flex-row justify-start items-center space-x-2">
                                <div className="flex space-x-1">
                                    <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce"></div>
                                    <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-1 h-1 bg-white/60 rounded-full animate-bounce-slow" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-white/60 text-xs md:text-sm">Thinking</span>
                            </div>
                        </div>
                    ) : (
                        <MarkdownRenderer content={content} className="prose prose-invert max-w-none prose-sm md:prose-base" />
                    )}
                </div>

                <div className="flex justify-end opacity-80">
                    {
                        sender != "user" &&
                        <span className="text-[10px] md:text-xs tracking-wide font-light px-3 py-1 rounded-full backdrop-blur-xl border border-white/40 flex flex-row justify-center items-center gap-x-1">
                            <img src={selectedModel.logo} className="w-4 h-4 invert" />
                            {selectedModel.name}
                        </span>
                    }
                </div>
            </div>
        </div>
    );
}

export const Message = memo(MessageComponent);

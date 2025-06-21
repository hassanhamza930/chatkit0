import { ModelInterface } from "./interfaces";

export const availableModels = [
    {
        name: "Gemini Flash 2.5",
        value: "google/gemini-2.5-flash-preview-05-20",
        logo: "/gemini.png",
        byok: false
    },
    {
        name: "Gemini Flash 2.5 (Thinking)",
        value: "google/gemini-2.5-flash-preview-05-20:thinking",
        logo: "/gemini.png",
        byok: true,
        thinking: true
    },
    {
        name: "o4 Mini",
        value: "openai/o4-mini",
        logo: "/openai.png",
        byok: true,
        thinking: true
    },
    {
        name: "Claude 3.7 Sonnet",
        value: "anthropic/claude-3.7-sonnet",
        logo: "/anthropic.png",
        byok: true
    },
    {
        name: "Claude 3.7 Sonnet (Thinking)",
        value: "anthropic/claude-3.7-sonnet:thinking",
        logo: "/anthropic.png",
        byok: true,
        thinking: true
    }
] as Array<ModelInterface>;


export const hideScrollbar = {
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
} as const;
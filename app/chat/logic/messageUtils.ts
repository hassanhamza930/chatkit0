import { Message } from '@/app/interfaces';

export const MESSAGES_STORAGE_KEY = 'chat_messages';

export async function callOpenRouter(
  messages: Omit<Message, 'id' | 'timestamp'>[],
  model: string,
  apiKey: string
): Promise<string> {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': window.location.href,
      'X-Title': 'ChatKit',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: messages.map(msg => ({
        role: msg.sender,
        content: msg.content,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

export function parseStoredMessages(stored: string | null): Message[] {
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      : [];
  } catch (error) {
    console.error('Error parsing stored messages:', error);
    return [];
  }
}

export function serializeMessages(messages: Message[]): string {
  return JSON.stringify(
    messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }))
  );
}

export function generateMessageId(): string {
  return crypto.randomUUID();
}

// Boxed-up effect logic helpers
export function loadMessagesFromStorage(storageKey: string, parseFn: (stored: string | null) => Message[], setMessages: (msgs: Message[]) => void, setIsInitialized: (val: boolean) => void) {
  const stored = localStorage.getItem(storageKey);
  const parsed = parseFn(stored);
  if (parsed.length > 0) setMessages(parsed);
  setIsInitialized(true);
}

export function saveMessagesToStorage(storageKey: string, serializeFn: (msgs: Message[]) => string, messages: Message[], prevMessagesRef: React.MutableRefObject<Message[]>, isInitialized: boolean) {
  if (!isInitialized || messages === prevMessagesRef.current) return;
  try {
    localStorage.setItem(storageKey, serializeFn(messages));
    prevMessagesRef.current = [...messages];
  } catch (error) {
    console.error('Error saving messages to localStorage:', error);
  }
}

export async function respondToUserMessage({
  messages,
  openrouterKey,
  setStreamingResponse,
  handleAddMessage,
}: {
  messages: Message[];
  openrouterKey: string | undefined;
  setStreamingResponse: (val: boolean) => void;
  handleAddMessage: (msg: Omit<Message, 'id' | 'timestamp'>) => void;
}) {
  if (messages.length === 0) return;
  const last = messages[messages.length - 1];
  if (last.sender !== 'user') return;
  const selectedModel = last.selectedModel;
  const apiKey = selectedModel.byok ? openrouterKey || '' : process.env.NEXT_PUBLIC_OPENROUTER_KEY || '';
  if (!apiKey) {
    console.error('No API key available for OpenRouter');
    return;
  }
  try {
    setStreamingResponse(true);
    const assistantResponse = await callOpenRouter(
      messages.map(({ content, sender, selectedModel }) => ({ content, sender, selectedModel })),
      selectedModel.value,
      apiKey
    );
    handleAddMessage({
      content: assistantResponse,
      sender: 'assistant',
      selectedModel,
    });
  } catch (error) {
    console.error('Error calling OpenRouter:', error);
    handleAddMessage({
      content: 'Sorry, I encountered an error processing your request.',
      sender: 'assistant',
      selectedModel,
    });
  } finally {
    setStreamingResponse(false);
  }
}

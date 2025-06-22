import { ChatInterface, MessageInterface, ModelInterface, OpenRouterMessage } from '@/app/interfaces';
import { toast } from 'sonner';
import { useChatStore } from '../store/store';

export const CHATS_STORAGE_KEY = 'chats';

export function readChatsFromLocalStorage(): ChatInterface[] {

  const chats = localStorage.getItem(CHATS_STORAGE_KEY);

  if (chats != undefined) {
    const parsedChats = JSON.parse(chats) as ChatInterface[];

    // Convert timestamp strings back to Date objects
    return parsedChats.map(chat => ({
      ...chat,
      timeUpdated: new Date(chat.timeUpdated),
      messages: chat.messages.map(message => ({
        ...message,
        timestamp: new Date(message.timestamp)
      }))
    }));
  }

  else {
    return [];
  }

}

export async function callOpenRouter({ selectedModel, openrouterkey, messages }: { selectedModel: ModelInterface, openrouterkey: string, messages: Partial<MessageInterface>[] }) {

  var apiToUse = selectedModel.byok ? openrouterkey : process.env.NEXT_PUBLIC_OPENROUTER_KEY;
  console.log("Using API Key");
  console.log(apiToUse);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToUse}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: selectedModel.value,
      messages: messages.map((message) => {
        return {
          role: message.sender,
          content: message.content
        } as OpenRouterMessage
      }),
    }),
  });

  const data = await response.json();

  if (data.choices[0].message.content) {
    return data.choices[0].message.content;
  }

  else {
    console.log(data);
    return "Error: $ " + data.error.message;
  }

}

export async function callOpenRouterStreaming({ 
  selectedModel, 
  openrouterkey, 
  messages, 
  onChunk 
}: { 
  selectedModel: ModelInterface, 
  openrouterkey: string, 
  messages: Partial<MessageInterface>[], 
  onChunk: (chunk: string) => void 
}) {
  var apiToUse = selectedModel.byok ? openrouterkey : process.env.NEXT_PUBLIC_OPENROUTER_KEY;
  console.log("Using API Key for streaming");
  console.log(apiToUse);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToUse}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: selectedModel.value,
      messages: messages.map((message) => {
        return {
          role: message.sender,
          content: message.content
        } as OpenRouterMessage
      }),
      stream: true
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error: ${errorData.error?.message || 'Unknown error'}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No reader available');
  }

  const decoder = new TextDecoder();
  let buffer = '';
  let fullContent = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      buffer += decoder.decode(value, { stream: true });
      
      // Process complete lines
      while (true) {
        const lineEnd = buffer.indexOf('\n');
        if (lineEnd === -1) break;
        
        const line = buffer.slice(0, lineEnd).trim();
        buffer = buffer.slice(lineEnd + 1);
        
        // Skip empty lines and comments
        if (!line || line.startsWith(':')) continue;
        
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          
          if (data === '[DONE]') {
            break;
          }
          
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            
            if (content) {
              fullContent += content;
              onChunk(content);
            }
          } catch (e) {
            // Skip invalid JSON
            console.warn('Failed to parse SSE data:', data);
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  return fullContent;
}



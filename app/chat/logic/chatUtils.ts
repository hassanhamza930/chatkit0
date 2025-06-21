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



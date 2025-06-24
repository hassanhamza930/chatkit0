export interface ModelInterface {
  name: string;
  value: string;
  logo: string;
  byok: boolean;
  thinking?: boolean;
}

export interface MessageInterface {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  selectedModel: ModelInterface;
}

export interface OpenRouterMessage{
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatInterface{
  id: string;
  name: string;
  messages: MessageInterface[];
  timeUpdated: Date;
}

export interface SuggestionInterface {
  text: string;
}

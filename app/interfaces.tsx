export interface Model {
  name: string;
  value: string;
  logo: string;
  byok: boolean;
  thinking?: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  selectedModel: Model;
}

export interface Chat{
  id: string;
  name: string;
  messages: Message[];
  timeUpdated: Date;
}

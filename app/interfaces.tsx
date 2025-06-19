export interface Model {
  name: string;
  value: string;
  logo: string;
  byok: boolean;
  thinking?: boolean;
}

export interface MessageProps {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  selectedModel: Model;
}

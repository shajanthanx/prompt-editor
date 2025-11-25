export interface Prompt {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  tags?: string[];
}

export interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  isCustom: boolean;
  description?: string;
}

export interface PowerPhrase {
  id: string;
  text: string;
  category: string;
  isCustom: boolean;
  description?: string;
}

export type Category = 'general' | 'reasoning' | 'format' | 'role' | 'quality' | 'custom';


export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  isPending?: boolean;
}

export interface UserProfile {
  name: string;
  phone: string;
}

export enum Language {
  ENGLISH = 'English',
  URDU = 'Urdu',
  ROMAN_URDU = 'Roman Urdu'
}

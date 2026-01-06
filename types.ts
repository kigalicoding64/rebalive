
export enum ContentType {
  VIDEO = 'VIDEO',
  AGASOBANUYE = 'AGASOBANUYE',
  SHORT = 'SHORT',
  MUSIC = 'MUSIC',
  PODCAST = 'PODCAST',
  NEWS = 'NEWS',
  BOOK = 'BOOK',
  LIVE = 'LIVE'
}

export enum Language {
  RW = 'RW',
  EN = 'EN',
  FR = 'FR'
}

export enum Monetization {
  FREE = 'FREE',
  ADS = 'ADS',
  PREMIUM = 'PREMIUM',
  CREDITS = 'CREDITS'
}

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  thumbnail: string;
  creator: string;
  creatorAvatar?: string;
  views: number;
  duration?: string;
  language: Language;
  monetization: Monetization;
  creditPrice?: number;
  isTrending?: boolean;
  publishedAt: string;
  url?: string;
  narrator?: string; // Specific for Agasobanuye
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  credits: number;
  role: 'VISITOR' | 'USER' | 'CREATOR' | 'MEDIA_HOUSE' | 'ADMIN';
  language: Language;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

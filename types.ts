
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
  CREDITS = 'CREDITS',
  PPV = 'PPV'
}

export enum DownloadStatus {
  NONE = 'NONE',
  DOWNLOADING = 'DOWNLOADING',
  COMPLETED = 'COMPLETED'
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
  category?: string;
  rating?: number;
}

export interface Book extends ContentItem {
  author: string;
  pages: number;
  genres: string[];
  sampleText?: string;
}

export interface NarratorProfile {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  bio: string;
  isVerified: boolean;
  followers: number;
  totalViews: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  credits: number;
  role: 'VISITOR' | 'USER' | 'CREATOR' | 'MEDIA_HOUSE' | 'ADMIN';
  language: Language;
  isPremium: boolean;
  watchHistory: string[];
  ownedBooks: string[];
  downloadedIds: string[];
  followingNarrators: string[];
}

export interface CreatorProfile {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  bio: string;
  isVerified: boolean;
  followers: number;
  socialLinks: { platform: string; url: string }[];
  subscriptionTiers: SubscriptionTier[];
}

export interface SubscriptionTier {
  id: string;
  name: 'BASIC' | 'PREMIUM' | 'VIP';
  price: number;
  features: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'alert';
  isRead: boolean;
}

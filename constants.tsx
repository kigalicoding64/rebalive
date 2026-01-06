
import { ContentType, Language, Monetization, ContentItem } from './types';

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: '1',
    type: ContentType.VIDEO,
    title: 'The Beauty of Lake Kivu',
    description: 'A deep dive into the serene landscapes of Rwanda\'s western border.',
    thumbnail: 'https://images.unsplash.com/photo-1542128962-9d50ad7bf714?q=80&w=1600&auto=format&fit=crop',
    creator: 'Rwanda Discovery',
    views: 125000,
    duration: '12:45',
    language: Language.RW,
    monetization: Monetization.FREE,
    isTrending: true,
    publishedAt: '2 days ago'
  },
  {
    id: 'agas-1',
    type: ContentType.AGASOBANUYE,
    title: 'John Wick: Chapter 4 (Agasobanuye)',
    description: 'The legendary hitman takes on the High Table. Narrated with local flavor and humor.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    creator: 'Yanga Junior',
    narrator: 'Sankara',
    views: 850000,
    duration: '2:49:00',
    language: Language.RW,
    monetization: Monetization.CREDITS,
    creditPrice: 200,
    publishedAt: 'Yesterday'
  },
  {
    id: '2',
    type: ContentType.MUSIC,
    title: 'Kigali Nights',
    description: 'The latest afrobeat vibes straight from the heart of Kigali.',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
    creator: 'DJ Ishimwe',
    views: 45000,
    duration: '03:30',
    language: Language.EN,
    monetization: Monetization.PREMIUM,
    publishedAt: '5 hours ago'
  },
  {
    id: '3',
    type: ContentType.NEWS,
    title: 'New Infrastructure Project in Musanze',
    description: 'The government announces a multi-million dollar bypass project to ease traffic.',
    thumbnail: 'https://images.unsplash.com/photo-1590234791772-23c2d46e147e?q=80&w=800&auto=format&fit=crop',
    creator: 'Kigali Today',
    views: 12000,
    language: Language.RW,
    monetization: Monetization.ADS,
    publishedAt: '1 hour ago'
  },
  {
    id: '4',
    type: ContentType.SHORT,
    title: 'Gorilla Trekking 101',
    description: 'Quick tips for your first visit to Volcanoes National Park.',
    thumbnail: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?q=80&w=400&auto=format&fit=crop',
    creator: 'Visit Rwanda',
    views: 890000,
    language: Language.EN,
    monetization: Monetization.FREE,
    isTrending: true,
    publishedAt: 'Yesterday'
  },
  {
    id: '5',
    type: ContentType.LIVE,
    title: 'Kwita Izina 2024 - Live Ceremony',
    description: 'Join us live as we name the newest members of our gorilla family.',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    creator: 'RDB Official',
    views: 5400,
    language: Language.RW,
    monetization: Monetization.FREE,
    publishedAt: 'Live Now'
  },
  {
    id: '6',
    type: ContentType.BOOK,
    title: 'A Thousand Hills',
    description: 'An inspiring autobiography of resilience and hope in modern Rwanda.',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=400&auto=format&fit=crop',
    creator: 'Umutesi Marie',
    views: 8900,
    language: Language.FR,
    monetization: Monetization.CREDITS,
    creditPrice: 500,
    publishedAt: 'Last Month'
  }
];

export const APP_THEME = {
  primary: '#ef4444', 
  secondary: '#fbbf24',
  background: '#050505',
  surface: '#121212',
  text: '#ffffff',
  muted: '#737373'
};

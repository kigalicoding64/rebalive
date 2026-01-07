
import { ContentType, Language, Monetization, ContentItem, Book, NarratorProfile } from './types';

export const NARRATORS: NarratorProfile[] = [
  {
    id: 'rocky-kimomo',
    name: 'Rocky Kimomo',
    avatar: 'https://picsum.photos/seed/rocky/300/300',
    banner: 'https://images.unsplash.com/photo-1598897349489-4476ceaf133c?q=80&w=1600&auto=format&fit=crop',
    bio: 'King of Cinema translation. Narrating blockbusters that make you feel like you are right in the middle of the action.',
    isVerified: true,
    followers: 240000,
    totalViews: 82000000
  },
  {
    id: 'gaheza',
    name: 'Gaheza',
    avatar: 'https://picsum.photos/seed/gaheza/300/300',
    banner: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1600&auto=format&fit=crop',
    bio: 'Master of emotional and thriller translations. Deep voice, deep impact.',
    isVerified: true,
    followers: 95000,
    totalViews: 12000000
  },
  {
    id: 'fey',
    name: 'Fey',
    avatar: 'https://picsum.photos/seed/fey/300/300',
    banner: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1600&auto=format&fit=crop',
    bio: 'Bringing humor and high energy to action flicks. The voice that keeps you awake.',
    isVerified: true,
    followers: 110000,
    totalViews: 18000000
  },
  {
    id: 'sankara',
    name: 'Sankara',
    avatar: 'https://picsum.photos/seed/sankara/300/300',
    banner: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1600&auto=format&fit=crop',
    bio: 'The legendary voice of Agasobanuye. High-stakes action specialist.',
    isVerified: true,
    followers: 125000,
    totalViews: 45000000
  }
];

const createAgasobanuye = (id: string, title: string, narrator: string, externalUrl: string, views: number, duration: string): ContentItem => ({
  id,
  type: ContentType.AGASOBANUYE,
  title,
  description: `Watch ${title} in Kinyarwanda, narrated by ${narrator}. RebaLive RW exclusive.`,
  thumbnail: `https://picsum.photos/seed/${id}/800/450`,
  url: externalUrl,
  creator: narrator,
  narrator,
  views,
  duration,
  language: Language.RW,
  monetization: Monetization.CREDITS,
  creditPrice: 200,
  publishedAt: 'New Release',
  isTrending: views > 100000
});

export const MOCK_CONTENT: ContentItem[] = [
  // User Requested Library
  createAgasobanuye('r1a', 'Laal Singh Chaddha A - ROCKY', 'Rocky Kimomo', 'https://guxhag.com/2gqdk0l78epz', 125000, '45:00'),
  createAgasobanuye('r1b', 'Laal Singh Chaddha B - ROCKY', 'Rocky Kimomo', 'https://guxhag.com/uf92d65tbn1k', 110000, '48:20'),
  createAgasobanuye('r2a', 'Radhe Shyam A - ROCKY', 'Rocky Kimomo', 'https://guxhag.com/n5kxylrwknqz', 89000, '52:00'),
  createAgasobanuye('r2b', 'Radhe Shyam B - ROCKY', 'Rocky Kimomo', 'https://gradehgplus.com/j5exok7wd82s', 87000, '51:15'),
  createAgasobanuye('r3a', 'Bajrangi Bhaijaan A - ROCKY', 'Rocky Kimomo', 'https://habetar.com/wo1jofioo0p2', 245000, '55:00'),
  createAgasobanuye('r3b', 'Bajrangi Bhaijaan B - ROCKY', 'Rocky Kimomo', 'https://habetar.com/jbmfayqmzvwb', 240000, '54:30'),
  createAgasobanuye('r4a', 'Thugs of Hindostan A - ROCKY', 'Rocky Kimomo', 'https://hglink.to/ntn4yj88yupz', 92000, '49:00'),
  createAgasobanuye('r4b', 'Thugs of Hindostan B - ROCKY', 'Rocky Kimomo', 'https://dumbalag.com/l0ou4okkifd0', 90000, '48:45'),
  createAgasobanuye('r5a', 'War 2 Part 1 - Rocky', 'Rocky Kimomo', 'https://dumbalag.com/ozj7hm5rpwrh', 310000, '60:00'),
  createAgasobanuye('r5b', 'War 2 Part 2 - Rocky', 'Rocky Kimomo', 'https://dumbalag.com/doqjjy4ekcj9', 305000, '60:00'),
  createAgasobanuye('r5c', 'War 2 Part 3 - Rocky', 'Rocky Kimomo', 'https://hglink.to/wuy1u00cno7a', 300000, '60:00'),
  createAgasobanuye('r6', 'A Gentleman - ROCKY', 'Rocky Kimomo', 'https://dumbalag.com/havqj6q3z2rt', 67000, '125:00'),
  createAgasobanuye('r7', 'Maharshi - ROCKY', 'Rocky Kimomo', 'https://haxloppd.com/4vmooyhiz7ja', 156000, '145:00'),
  createAgasobanuye('r8a', 'Raaz Reboot A - Rocky', 'Rocky Kimomo', 'https://haxloppd.com/82hvnc9ysl3c', 43000, '50:00'),
  createAgasobanuye('r8b', 'Raaz Reboot B - Rocky', 'Rocky Kimomo', 'https://hglink.to/nei0mpl6r9sk', 41000, '52:00'),
  createAgasobanuye('r9', 'Kyon Ki - Rocky', 'Rocky Kimomo', 'https://haxloppd.com/qai7fut60d2f', 32000, '135:00'),
  createAgasobanuye('r10a', 'BAAGHI 4 - ROCKY', 'Rocky Kimomo', 'https://haxloppd.com/5tkzmosvrs5i', 420000, '115:00'),
  createAgasobanuye('r10b', 'BAAGHI 4B - ROCKY', 'Rocky Kimomo', 'https://uasopt.com/25suzkioskik', 415000, '115:00'),
  createAgasobanuye('r11', 'Section 375 - ROCKY', 'Rocky Kimomo', 'https://uasopt.com/8iodw27yligj', 24000, '118:00'),
  createAgasobanuye('r12a', 'Kesar 2A - ROCKY', 'Rocky Kimomo', 'https://gradehgplus.com/susyq6czsig4', 35000, '55:00'),
  createAgasobanuye('r12b', 'Kesar 2B - ROCKY', 'Rocky Kimomo', 'https://habetar.com/9i25thyrh8i4', 33000, '56:00'),
  createAgasobanuye('g13a', 'Pathaan - GAHEZA Part 1', 'Gaheza', 'https://dhcplay.com/pjr54syn2xse', 560000, '50:00'),
  createAgasobanuye('g13b', 'Pathaan - GAHEZA Part 2', 'Gaheza', 'https://dumbalag.com/86m8cllvdce1', 555000, '52:00'),
  createAgasobanuye('r14a', 'Sikandar A - ROCKY', 'Rocky Kimomo', 'https://haxloppd.com/44nxq7xqq0pu', 120000, '55:00'),
  createAgasobanuye('r14b', 'Sikandar B - ROCKY', 'Rocky Kimomo', 'https://dumbalag.com/wj9r9mnvqsv1', 115000, '56:00'),
  createAgasobanuye('r15a', 'Jaat - ROCKY Part 1', 'Rocky Kimomo', 'https://cavanhabg.com/6edzlqv4oej5', 98000, '60:00'),
  createAgasobanuye('r15b', 'Jaat - ROCKY Part 2', 'Rocky Kimomo', 'https://cavanhabg.com/u2it7fbtrrcx', 95000, '60:00'),
  createAgasobanuye('r16a', 'Runaway - ROCKY A', 'Rocky Kimomo', 'https://haxloppd.com/tmxfr59hv4x2', 45000, '60:00'),
  createAgasobanuye('r16b', 'Runaway - ROCKY B', 'Rocky Kimomo', 'https://uasopt.com/ko4xi4bz44rk', 44000, '60:00'),
  createAgasobanuye('r17a', 'Fighter A - ROCKY', 'Rocky Kimomo', 'https://dumbalag.com/it1yq9gw7d3k', 230000, '50:00'),
  createAgasobanuye('r17b', 'Fighter B - ROCKY', 'Rocky Kimomo', 'https://uasopt.com/lpc7ldi09txy', 225000, '52:00'),
  createAgasobanuye('f18a', 'Bang Bang A - FEY', 'Fey', 'https://cavanhabg.com/3ft1jbltxloi', 145000, '45:00'),
  createAgasobanuye('f18b', 'Bang Bang B - FEY', 'Fey', 'https://dumbalag.com/corvpdn6a2ta', 140000, '46:00'),
  createAgasobanuye('f18c', 'Bang Bang C - FEY', 'Fey', 'https://uasopt.com/0ekdkm6qi017', 135000, '47:00'),
  createAgasobanuye('r19', 'We Are Family - ROCKY', 'Rocky Kimomo', 'https://dumbalag.com/66hngh64970d', 23000, '130:00'),
  createAgasobanuye('r20', 'SANAK - ROCKY', 'Rocky Kimomo', 'https://hglink.to/e/ozjj79b7d1ow', 167000, '120:00'),

  {
    id: 'hero-main',
    type: ContentType.VIDEO,
    title: 'Visit Rwanda: The Heart of Africa',
    description: 'A cinematic journey through the 1000 hills.',
    thumbnail: 'https://images.unsplash.com/photo-1542128962-9d50ad7bf714?q=80&w=1600&auto=format&fit=crop',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    creator: 'Rwanda Development Board',
    views: 890000,
    duration: '12:45',
    language: Language.EN,
    monetization: Monetization.FREE,
    isTrending: true,
    publishedAt: '1 month ago'
  }
];

export const MOCK_BOOKS: Book[] = []; // Simplified for this view

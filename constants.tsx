
import { ContentType, Language, Monetization, ContentItem, Book, NarratorProfile } from './types';

export const NARRATORS: NarratorProfile[] = [
  {
    id: 'sankara',
    name: 'Sankara',
    avatar: 'https://picsum.photos/seed/sankara/300/300',
    banner: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1600&auto=format&fit=crop',
    bio: 'The legendary voice of Agasobanuye. Bringing you the best action movies with a touch of Rwandan soul and humor.',
    isVerified: true,
    followers: 125000,
    totalViews: 45000000
  },
  {
    id: 'rocky-kimomo',
    name: 'Rocky Kimomo',
    avatar: 'https://picsum.photos/seed/rocky/300/300',
    banner: 'https://images.unsplash.com/photo-1598897349489-4476ceaf133c?q=80&w=1600&auto=format&fit=crop',
    bio: 'King of Cinema translation. Narrating blockbusters that make you feel like you are right in the middle of the action.',
    isVerified: true,
    followers: 180000,
    totalViews: 62000000
  }
];

export const MOCK_CONTENT: ContentItem[] = [
  {
    id: 'hero-1',
    type: ContentType.VIDEO,
    title: 'The Last King of Rwanda',
    description: 'A grand historical epic detailing the final years of the monarchy. High-definition restoration.',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop',
    creator: 'Rwanda Film Office',
    views: 450000,
    duration: '2h 15m',
    language: Language.RW,
    monetization: Monetization.PREMIUM,
    isTrending: true,
    publishedAt: 'New Release'
  },
  {
    id: 'agas-1',
    type: ContentType.AGASOBANUYE,
    title: 'Extraction 2 (Agasobanuye)',
    description: 'Tyler Rake returns for another deadly mission. Fully narrated in Kinyarwanda with local humor by the legend Sankara.',
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop',
    creator: 'Yanga Junior',
    narrator: 'Sankara',
    views: 850000,
    duration: '2:10:00',
    language: Language.RW,
    monetization: Monetization.CREDITS,
    creditPrice: 200,
    publishedAt: 'Trending'
  },
  {
    id: 'agas-2',
    type: ContentType.AGASOBANUYE,
    title: 'John Wick: Chapter 4 (Agasobanuye)',
    description: 'The High Table has met its match. Narrated with intense action descriptions by Rocky Kimomo.',
    thumbnail: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=800&auto=format&fit=crop',
    creator: 'Yanga Junior',
    narrator: 'Rocky Kimomo',
    views: 1200000,
    duration: '2:49:00',
    language: Language.RW,
    monetization: Monetization.PREMIUM,
    publishedAt: '2 days ago'
  },
  {
    id: 'agas-3',
    type: ContentType.AGASOBANUYE,
    title: 'The Gray Man (Agasobanuye)',
    description: 'Elite CIA operative Court Gentry is hunted by former colleague Lloyd Hansen. Pure adrenaline!',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop',
    creator: 'Yanga Junior',
    narrator: 'Sankara',
    views: 640000,
    duration: '2:02:00',
    language: Language.RW,
    monetization: Monetization.FREE,
    publishedAt: '1 week ago'
  },
  {
    id: 'agas-4',
    type: ContentType.AGASOBANUYE,
    title: 'RRR (Agasobanuye)',
    description: 'A tale of two legendary revolutionaries and their journey away from home before they started fighting for their country.',
    thumbnail: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=800&auto=format&fit=crop',
    creator: 'Yanga Junior',
    narrator: 'Rocky Kimomo',
    views: 980000,
    duration: '3:07:00',
    language: Language.RW,
    monetization: Monetization.CREDITS,
    creditPrice: 250,
    publishedAt: 'New'
  },
  {
    id: 'music-1',
    type: ContentType.MUSIC,
    title: 'Bwiza Vibes',
    description: 'The soul of Kigali modern pop. Fresh vibes from the heart of Rwanda.',
    thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop',
    creator: 'Bwiza Official',
    views: 1200000,
    duration: '3:45',
    language: Language.RW,
    monetization: Monetization.FREE,
    publishedAt: '2 days ago',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: 'news-1',
    type: ContentType.NEWS,
    title: 'Kigali Innovation City: Tech Hub Progress',
    description: 'Exclusive look inside the new infrastructure project set to change East Africa. The project aims to centralize technology companies and research institutions.',
    thumbnail: 'https://images.unsplash.com/photo-1512403754473-27835f7b9984?q=80&w=800&auto=format&fit=crop',
    creator: 'Kigali Today',
    views: 25000,
    language: Language.RW,
    monetization: Monetization.ADS,
    publishedAt: '1 hour ago'
  }
];

// Top 100 Books Data
const generateBooks = (): Book[] => {
  const categories = [
    { name: 'Fantasy', count: 15, titles: ['Harry Potter', 'Lord of the Rings', 'Game of Thrones', 'The Hobbit', 'The Name of the Wind', 'Mistborn', 'The Way of Kings', 'American Gods', 'The Witcher', 'The Wheel of Time', 'Percy Jackson', 'Narnia', 'Alice in Wonderland', 'Dark Tower', 'Neverending Story'] },
    { name: 'Sci-Fi', count: 15, titles: ['Dune', '1984', 'The Martian', 'Foundation', 'Neuromancer', 'Snow Crash', 'Hyperion', 'Brave New World', 'The Expanse', 'Starship Troopers', 'Enders Game', 'Left Hand of Darkness', 'Solaris', 'The Time Machine', 'War of the Worlds'] },
    { name: 'Thriller', count: 15, titles: ['Gone Girl', 'Da Vinci Code', 'The Girl with the Dragon Tattoo', 'Silence of the Lambs', 'Shutter Island', 'Inferno', 'The Reversal', 'Big Little Lies', 'Bird Box', 'The Guest List', 'One by One', 'No Exit', 'Local Woman Missing', 'Verity', 'The Silent Patient'] },
    { name: 'Romance', count: 15, titles: ['Pride & Prejudice', 'It Ends With Us', 'The Hating Game', 'Beach Read', 'Red, White & Royal Blue', 'The Love Hypothesis', 'Ugly Love', 'November 9', 'Reminders of Him', 'The Seven Husbands of Evelyn Hugo', 'Outlander', 'A Court of Thorns and Roses', 'The Notebook', 'Me Before You', 'Vision in White'] },
    { name: 'Drama/Classics', count: 15, titles: ['Great Gatsby', 'To Kill a Mockingbird', 'The Catcher in the Rye', 'Moby Dick', 'War and Peace', 'Ulysses', 'The Odyssey', 'Don Quixote', 'Crime and Punishment', 'Grapes of Wrath', 'Wuthering Heights', 'Jane Eyre', 'Anna Karenina', 'Les Miserables', 'The Picture of Dorian Gray'] },
    { name: 'Horror', count: 10, titles: ['It', 'The Shining', 'Dracula', 'Frankenstein', 'Bird Box', 'Pet Sematary', 'Haunting of Hill House', 'The Stand', 'Mexican Gothic', 'Heart-Shaped Box'] },
    { name: 'YA', count: 10, titles: ['Hunger Games', 'Divergent', 'Twilight', 'Fault in Our Stars', 'Looking for Alaska', 'Thirteen Reasons Why', 'The Giver', 'Scythe', 'Legend', 'Shatter Me'] },
    { name: 'Non-Fiction', count: 5, titles: ['Atomic Habits', 'Sapiens', 'Educated', 'Becoming', 'Thinking, Fast and Slow'] }
  ];

  let idCounter = 1;
  const books: Book[] = [];

  categories.forEach(cat => {
    cat.titles.forEach((title) => {
      books.push({
        id: `book-${idCounter++}`,
        type: ContentType.BOOK,
        title: title,
        description: `Experience the captivating world of ${cat.name}. This masterpiece has shaped modern literature and offers a deep dive into human emotion and societal shifts.`,
        thumbnail: `https://picsum.photos/seed/book${idCounter}/400/600`,
        creator: 'Global Publishers',
        author: 'Famed Author',
        views: Math.floor(Math.random() * 100000),
        language: Language.EN,
        monetization: Monetization.CREDITS,
        creditPrice: 250,
        publishedAt: '2023',
        pages: 350,
        genres: [cat.name],
        sampleText: "It was a dark and stormy night... The beginning of an adventure that would change history. For years, the people of the valley had lived in fear, but today was different. Today, they would stand up and reclaim what was rightfully theirs. The sun began to rise, casting long shadows across the cobblestone streets..."
      });
    });
  });

  return books;
};

export const MOCK_BOOKS = generateBooks();

export const APP_THEME = {
  primary: '#ef4444', 
  secondary: '#fbbf24',
  background: '#050505',
  surface: '#121212',
  text: '#ffffff',
  muted: '#737373'
};

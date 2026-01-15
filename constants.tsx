
import { Destination, TrendingSpot } from './types';

export const COLORS = {
  primary: '#00b2b2',
  text: '#2C3E50',
  accentCoral: '#FF7043',
  accentAmber: '#FFBF00',
  background: '#faf8f4',
  white: '#FFFFFF'
};

export const RECOMMENDED_DESTINATIONS: Destination[] = [
  {
    id: 'ind-1',
    name: 'Jaipur Pink City',
    country: 'India',
    days: 4,
    matchScore: 96,
    imageUrl: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800',
    price: 12500,
    groupSize: 12,
    category: 'Culture'
  },
  {
    id: 'ind-2',
    name: 'Kerala Backwaters',
    country: 'India',
    days: 6,
    matchScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800',
    price: 18000,
    groupSize: 8,
    category: 'Relaxation'
  },
  {
    id: 'ind-3',
    name: 'Varanasi Ghats',
    country: 'India',
    days: 3,
    matchScore: 88,
    imageUrl: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&q=80&w=800',
    price: 8500,
    groupSize: 15,
    category: 'Spiritual'
  },
  {
    id: 'ind-4',
    name: 'Leh Ladakh Expedition',
    country: 'India',
    days: 8,
    matchScore: 94,
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=400',
    price: 32000,
    groupSize: 10,
    category: 'Adventure'
  }
];

export const TRENDING_SPOTS: TrendingSpot[] = [
  { id: 'it1', name: 'Manali', imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=400' },
  { id: 'it2', name: 'Hampi Ruins', imageUrl: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&q=80&w=800' },
  { id: 'it3', name: 'Goa Beaches', imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=400' },
  { id: 'it4', name: 'Munnar Hills', imageUrl: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=400' }
];

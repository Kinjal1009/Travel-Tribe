
export enum AppTab {
  EXPLORE = 'Explore',
  MY_TRIPS = 'My Trips',
  WALLET = 'Wallet',
  CHAT = 'Chat',
  PROFILE = 'Profile'
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  days: number;
  matchScore: number;
  imageUrl: string;
  price?: number;
  priceRange?: { min: number; max: number };
  groupSize?: number;
  maxGroupSize?: number;
  category?: string;
  activities?: string[];
  ageRange?: { min: number; max: number };
  status?: 'DRAFT' | 'ACTIVE';
}

export interface TrendingSpot {
  id: string;
  name: string;
  imageUrl: string;
}

export type ScreenState = 
  | 'SPLASH' 
  | 'LANDING' 
  | 'SIGNUP_STEP1' 
  | 'SIGNUP_STEP2_EMAIL' 
  | 'SIGNUP_STEP3_PHONE' 
  | 'SIGNUP_STEP4_PROFILE' 
  | 'BIO_SETUP'
  | 'VIBE_CHECK'
  | 'VIBE_MATCH_RESULTS'
  | 'TRUST_PROFILE' 
  | 'IDENTITY_VERIFY' 
  | 'FACE_MATCH' 
  | 'DASHBOARD' 
  | 'COMMUNITY_ADVENTURES'
  | 'MATCH_SETTINGS'
  | 'CAMERA_PROFILE'
  | 'VIDEO_VERIFY'
  | 'SAFETY_SETUP'
  | 'SAFETY_HUB'
  | 'NOTIFICATIONS'
  | 'TRIP_DETAILS'
  | 'CREATE_TRIP'
  | 'ITINERARY'
  | 'CHAT_HUB'
  | 'ADD_EXPENSE'
  | 'GROUP_CHAT'
  | 'DIRECT_CHAT'
  | 'GROUP_INFO'
  | 'JOINED_GROUP'
  | 'TRIP_CONFIRMATION'
  | 'REVIEW_BOOKING'
  | 'CHECKOUT'
  | 'BOOKING_CONFIRMED'
  | 'PACKING_LIST';

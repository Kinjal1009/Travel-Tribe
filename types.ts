export enum AppTab {
  EXPLORE = 'Explore',
  MY_TRIPS = 'My Trips',
  WALLET = 'Wallet',
  CHAT = 'Chat',
  PROFILE = 'Profile'
}

export enum AppView {
  INTERESTS = 'INTERESTS',
  TRIP_DETAILS = 'TRIP_DETAILS',
  LOADING = 'LOADING',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface Match {
  id: string;
  name: string;
  travelStyle: string;
  compatibility: number;
  interests: string[];
  avatar: string;
}

export interface QuizData {
  questions: Question[];
}

export interface Interest {
  id: string;
  label: string;
  icon: string;
}

export interface TripDetails {
  duration: number;
  budget: 'eco' | 'balanced' | 'luxury';
  vibe: 'spiritual' | 'party' | 'adventure' | 'nomad' | 'relaxed';
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


export interface Flight {
  airline: string;
  flight_number?: string;
  departure: string;
  arrival: string;
  departure_time?: string;
  arrival_time?: string;
  duration?: string;
  stops: number;
  price: number;
  extensions?: string[];
}

export interface FlightSearchResponse {
  success: boolean;
  flights: Flight[];
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
  | 'FLIGHT_BOOKING'
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
  | 'PACKING_LIST'
  | 'RATING_TRIP'
  | 'ALUMNI_COMMUNITY'
  | 'SHARED_MEMORIES';
import { Question, Match } from '../types';

const RAG_API_URL = 'https://kinjal25-rag-byop-solo-traveller.hf.space';

const FALLBACK_QUIZ: Question[] = [
  { id: 'f1', text: 'How do you prefer to start your morning in the Yoga Capital?', options: ['Sunrise Yoga by the Ganga', 'Espresso at a Riverside Cafe', 'A silent forest trek', 'Ashram meditation'] },
  { id: 'f2', text: 'Which element of Rishikesh resonates most with you?', options: ['The rush of the river (Adventure)', 'The silence of the ashram (Peace)', 'The rhythm of the Aarti (Culture)', 'The energy of the cafes (Community)'] },
  { id: 'f3', text: 'What is your ideal evening ritual?', options: ['Ganga Aarti at Parmarth Niketan', 'Live Sitar at a rooftop cafe', 'Sunset hike to Neer Garh', 'Quiet stargazing by the river'] },
  { id: 'f4', text: 'What kind of accommodation feels most like home?', options: ['Eco-Ashram', 'Boutique Riverside Stay', 'Backpacker Hostel', 'Luxury Wellness Resort'] },
  { id: 'f5', text: 'How do you approach meeting new people?', options: ['Deep conversations over tea', 'Shared physical challenges', 'Spontaneous group outings', 'Quiet observation first'] }
];

export async function generateRishikeshQuiz(interests: string[]): Promise<Question[]> {
  try {
    const response = await fetch(`${RAG_API_URL}/generate-quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        interests: interests,
        destination: 'Rishikesh',
        num_questions: 5
      })
    });

    if (!response.ok) {
      return FALLBACK_QUIZ;
    }

    const data = await response.json();
    // Validate response structure
    if (!data || !data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
      console.warn('RAG Service returned empty or invalid questions, using fallback');
      return FALLBACK_QUIZ;
    }

    return data.questions.map((q: any, idx: number) => ({
      id: q.id || `q${idx}`,
      text: q.question || q.text,
      options: q.options || []
    }));
  } catch (error) {
    console.warn('RAG API Quiz failed, using fallback:', error);
    return FALLBACK_QUIZ;
  }
}

export async function matchTravelers(
  userInterests: string[],
  answers: Record<number, number>,
  questions: Question[]
): Promise<Match[]> {
  try {
    const response = await fetch(`${RAG_API_URL}/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quiz_answers: answers,
        destination: 'Bali'
      })
    });

    if (!response.ok) {
      throw new Error(`RAG API Error: ${response.status}`);
    }

    const data = await response.json();
    if (!data.matches || !Array.isArray(data.matches)) {
      throw new Error('Invalid matches response format');
    }

    return data.matches.map((m: any, idx: number) => {
      const travelStyle = m.travel_style
        ? m.travel_style.split('_').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Spiritual Traveler';

      return {
        id: `match_${idx}`,
        name: m.name || 'Fellow Traveler',
        travelStyle: travelStyle,
        compatibility: m.compatibility || Math.floor(Math.random() * 20) + 75,
        interests: extractInterestsFromMetadata(m.metadata),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name || 'Traveler')}&background=00b2b2&color=fff&bold=true&size=400`
      };
    });
  } catch (error) {
    console.warn('Error matching travelers, using mock matches:', error);
    return [
      { id: 'm1', name: 'Arjun S.', travelStyle: 'Adventure Seeker', compatibility: 94, interests: ['Rafting', 'Photography'], avatar: 'https://i.pravatar.cc/150?u=arjun' },
      { id: 'm2', name: 'Priya V.', travelStyle: 'Explorer', compatibility: 89, interests: ['Yoga', 'Meditation'], avatar: 'https://i.pravatar.cc/150?u=priya' },
      { id: 'm3', name: 'Marcus L.', travelStyle: 'Foodie Explorer', compatibility: 85, interests: ['Cafes', 'Culture'], avatar: 'https://i.pravatar.cc/150?u=marcus' }
    ];
  }
}

function extractInterestsFromMetadata(metadata: any): string[] {
  const styleMap: Record<string, string[]> = {
    'adventure_seeker': ['Rafting', 'Bungee', 'Trekking'],
    'spiritual_explorer': ['Yoga', 'Ashrams', 'Meditation'],
    'foodie': ['Street Food', 'Cafes', 'Organic Dining'],
    'wellness_seeker': ['Ayurveda', 'Spa', 'Retreats'],
    'digital_nomad': ['Cafes', 'Coworking', 'Networking'],
    'nature_lover': ['Waterfalls', 'Hiking', 'Riverside'],
    'photographer': ['Ganga Aarti', 'Bridges', 'Landscapes']
  };

  const style = metadata?.travel_style || 'balanced_traveler';
  return styleMap[style] || ['Exploring', 'Yoga', 'Adventure'];
}

import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import LandingScreen from './screens/LandingScreen';
import SignUpStep1 from './screens/SignUpStep1';
import SignUpStep2Email from './screens/SignUpStep2Email';
import SignUpStep3Phone from './screens/SignUpStep3Phone';
import BioSetupScreen from './screens/BioSetupScreen';
import VibeCheckScreen from './screens/VibeCheckScreen';
import VibeMatchResultsScreen from './screens/VibeMatchResultsScreen';
import TrustProfileScreen from './screens/TrustProfileScreen';
import IdentityVerifyScreen from './screens/IdentityVerifyScreen';
import FaceMatchScreen from './screens/FaceMatchScreen';
import MatchSettingsScreen from './screens/MatchSettingsScreen';
import ExploreScreen from './screens/ExploreScreen';
import ProfileScreen from './screens/ProfileScreen';
import CommunityAdventuresScreen from './screens/CommunityAdventuresScreen';
import SafetySetupScreen from './screens/SafetySetupScreen';
import SafetyHubScreen from './screens/SafetyHubScreen';
import NotificationScreen from './screens/NotificationScreen';
import TripDetailsScreen from './screens/TripDetailsScreen';
import MyTripsScreen from './screens/MyTripsScreen';
import CreateTripScreen from './screens/CreateTripScreen';
import ItineraryScreen from './screens/ItineraryScreen';
import ChatHubScreen from './screens/ChatHubScreen';
import GroupChatScreen from './screens/GroupChatScreen';
import GroupInfoScreen from './screens/GroupInfoScreen';
import DirectChatScreen from './screens/DirectChatScreen';
import WalletScreen from './screens/WalletScreen';
import AddExpenseScreen from './screens/AddExpenseScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';
import JoinedGroupScreen from './screens/JoinedGroupScreen';
import TripConfirmationScreen from './screens/TripConfirmationScreen';
import ReviewBookingScreen from './screens/ReviewBookingScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';
import PackingListScreen from './screens/PackingListScreen';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';
import { AppTab, ScreenState, Destination } from './types';

const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('SPLASH');
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.EXPLORE);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [hasCompletedVibeCheck, setHasCompletedVibeCheck] = useState(false);
  const [showJoinNotification, setShowJoinNotification] = useState(false);

  // Verification states
  const [isVerifiedVideo, setIsVerifiedVideo] = useState(false);
  const [isVerifiedIdentity, setIsVerifiedIdentity] = useState(false);
  const [isVerifiedSocial, setIsVerifiedSocial] = useState(false);

  // Global trips state
  const [userCreatedTrips, setUserCreatedTrips] = useState<Destination[]>([
    {
      id: 'user-trip-ind-1',
      name: 'Rishikesh Yoga Retreat',
      country: 'India',
      days: 7,
      matchScore: 99,
      imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=400',
      price: 25000,
      maxGroupSize: 15,
      category: 'Spiritual',
      status: 'ACTIVE'
    }
  ]);

  const [bookedTrips, setBookedTrips] = useState<Destination[]>([]);

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userBio, setUserBio] = useState<string>('');
  const [userInterests, setUserInterests] = useState<string[]>([]);
  
  const [walletExpenses, setWalletExpenses] = useState<any[]>([
    {
      id: 'e1',
      title: 'Kerala Houseboat Split',
      amount: 8000,
      paidBy: 'Arjun',
      status: 'owe',
      statusAmount: 2000,
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=200"
    }
  ]);

  const [matchSettings, setMatchSettings] = useState({
    groupSize: 6,
    ageRange: { min: 22, max: 35 },
    budgetAlignment: true,
    hasConfigured: false
  });

  const [isSafetySetupComplete, setIsSafetySetupComplete] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('DASHBOARD');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setScreen('DASHBOARD');
    setActiveTab(AppTab.EXPLORE);
  };

  const handleTabChange = (tab: AppTab) => {
    if (!isLoggedIn && tab !== AppTab.EXPLORE) {
      setScreen('LANDING');
      return;
    }
    setActiveTab(tab);
    setScreen('DASHBOARD');
  };

  const navigateTo = (next: ScreenState) => setScreen(next);
  const goToDashboard = () => setScreen('DASHBOARD');

  const isUserVerified = isVerifiedIdentity && isVerifiedVideo;

  if (screen === 'SPLASH') return <SplashScreen />;
  if (screen === 'LANDING') return <LandingScreen onLogin={handleLogin} onSignUp={() => navigateTo('SIGNUP_STEP1')} onBack={() => setScreen('DASHBOARD')} />;
  
  if (screen === 'SIGNUP_STEP1') return <SignUpStep1 onBack={() => navigateTo('LANDING')} onNext={() => navigateTo('SIGNUP_STEP3_PHONE')} />;
  if (screen === 'SIGNUP_STEP3_PHONE') return <SignUpStep3Phone onBack={() => navigateTo('SIGNUP_STEP1')} onNext={() => navigateTo('SIGNUP_STEP2_EMAIL')} />;
  if (screen === 'SIGNUP_STEP2_EMAIL') return <SignUpStep2Email onBack={() => navigateTo('SIGNUP_STEP3_PHONE')} onNext={() => { setIsLoggedIn(true); setScreen('DASHBOARD'); }} />;
  
  if (screen === 'VIBE_CHECK') return <VibeCheckScreen onBack={() => setScreen('TRIP_DETAILS')} destination={selectedTrip?.name || 'the destination'} onNext={() => setScreen('VIBE_MATCH_RESULTS')} />;

  if (screen === 'VIBE_MATCH_RESULTS') {
    return (
      <VibeMatchResultsScreen 
        onBack={() => setScreen('VIBE_CHECK')}
        onJoin={() => { setHasCompletedVibeCheck(true); setShowJoinNotification(true); goToDashboard(); }}
        onCompleteProfile={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }}
        isProfileIncomplete={!isUserVerified}
      />
    );
  }

  if (screen === 'JOINED_GROUP') return <JoinedGroupScreen onBack={goToDashboard} onJoinChat={() => { setActiveTab(AppTab.CHAT); setScreen('GROUP_CHAT'); }} tripDetails={selectedTrip} />;

  if (screen === 'COMMUNITY_ADVENTURES') return <CommunityAdventuresScreen onBack={goToDashboard} onSelectTrip={(trip) => { setSelectedTrip(trip); setScreen('TRIP_DETAILS'); }} userTrips={userCreatedTrips} />;
  
  if (screen === 'NOTIFICATIONS') return (
    <NotificationScreen 
      onBack={goToDashboard} 
      showJoinSuccess={showJoinNotification}
      onChatClick={() => setScreen('JOINED_GROUP')}
      onCompleteProfileClick={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }}
      isUserVerified={isUserVerified}
      tripName={selectedTrip?.name}
    />
  );
  
  if (screen === 'TRIP_DETAILS') return (
    <TripDetailsScreen 
      trip={selectedTrip} 
      onBack={goToDashboard} 
      onEnroll={() => setScreen('VIBE_CHECK')} 
      isLoggedIn={isLoggedIn}
      onStartAuth={() => setScreen('LANDING')}
    />
  );
  
  if (screen === 'CREATE_TRIP') return (
    <CreateTripScreen 
      onClose={goToDashboard} 
      onPublish={(tripData) => { 
        const newTrip: Destination = {
          id: `user-trip-${Date.now()}`,
          name: tripData.title,
          country: 'India',
          days: 5,
          matchScore: 100,
          imageUrl: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=800',
          price: tripData.budgetRange.max,
          maxGroupSize: tripData.groupSize,
          category: tripData.activities[0] || 'Adventure',
          status: 'ACTIVE',
          activities: tripData.activities,
          ageRange: tripData.ageRange
        };
        setUserCreatedTrips(prev => [newTrip, ...prev]);
        setScreen('COMMUNITY_ADVENTURES');
      }} 
    />
  );

  if (screen === 'ITINERARY') return <ItineraryScreen onBack={goToDashboard} />;
  
  if (screen === 'ADD_EXPENSE') return (
    <AddExpenseScreen 
      onBack={() => setScreen('DASHBOARD')} 
      onSave={(expData) => { 
        const newExpense = {
          id: `e-${Date.now()}`,
          title: expData.title,
          amount: expData.amount,
          paidBy: expData.paidBy,
          status: 'owe',
          statusAmount: expData.amount / (expData.splitWith.length + 1),
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=200"
        };
        setWalletExpenses(prev => [...prev, newExpense]); 
        setScreen('DASHBOARD'); 
        setActiveTab(AppTab.WALLET); 
      }} 
    />
  );

  if (screen === 'GROUP_CHAT') return <GroupChatScreen onBack={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.CHAT); }} onInfoClick={() => setScreen('GROUP_INFO')} tripDetails={selectedTrip} />;
  if (screen === 'GROUP_INFO') return <GroupInfoScreen onBack={() => setScreen('GROUP_CHAT')} tripDetails={selectedTrip} onViewConfirmation={() => setScreen('TRIP_CONFIRMATION')} />;
  
  if (screen === 'TRIP_CONFIRMATION') return <TripConfirmationScreen onBack={() => setScreen('GROUP_INFO')} onBook={() => setScreen('REVIEW_BOOKING')} tripName={selectedTrip?.name} />;
  if (screen === 'REVIEW_BOOKING') return <ReviewBookingScreen onBack={() => setScreen('TRIP_CONFIRMATION')} onProceed={() => setScreen('CHECKOUT')} trip={selectedTrip} />;
  if (screen === 'CHECKOUT') return <CheckoutScreen onBack={() => setScreen('REVIEW_BOOKING')} onSuccess={() => {
    if (selectedTrip) {
      setBookedTrips(prev => {
        if (prev.find(t => t.id === selectedTrip.id)) return prev;
        return [...prev, selectedTrip];
      });
    }
    setScreen('BOOKING_CONFIRMED');
  }} trip={selectedTrip} />;
  
  if (screen === 'BOOKING_CONFIRMED') return (
    <BookingConfirmationScreen 
      onClose={goToDashboard} 
      onMeetGroup={() => { setActiveTab(AppTab.CHAT); setScreen('GROUP_CHAT'); }} 
      onReviewItinerary={() => { setScreen('ITINERARY'); }} 
      onPackingList={() => setScreen('PACKING_LIST')}
    />
  );

  if (screen === 'PACKING_LIST') return <PackingListScreen onBack={() => setScreen('BOOKING_CONFIRMED')} tripName={selectedTrip?.name} />;

  if (screen === 'DIRECT_CHAT') return <DirectChatScreen onBack={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.CHAT); }} recipient={selectedRecipient} />;
  
  if (screen === 'BIO_SETUP') return <BioSetupScreen onBack={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} initialBio={userBio} initialInterests={userInterests} onSave={(data) => { setUserBio(data.bio); setUserInterests(data.interests); setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} />;
  if (screen === 'SAFETY_SETUP') return <SafetySetupScreen onBack={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} initialData={emergencyContact} onSave={(data) => { setEmergencyContact(data); setIsSafetySetupComplete(true); setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} />;
  if (screen === 'SAFETY_HUB') return <SafetyHubScreen onBack={() => setScreen('DASHBOARD')} onEdit={() => setScreen('SAFETY_SETUP')} />;

  if (screen === 'CAMERA_PROFILE') return <FaceMatchScreen title="Profile Picture" onBack={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} onNext={() => { setProfileImage("https://i.pravatar.cc/150?u=current_user"); setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} />;
  if (screen === 'VIDEO_VERIFY') return <FaceMatchScreen title="Video Intro" isVideo={true} onBack={() => setScreen('TRUST_PROFILE')} onNext={() => { setIsVerifiedVideo(true); setScreen('TRUST_PROFILE'); }} />;
  if (screen === 'TRUST_PROFILE') return <TrustProfileScreen isVerifiedVideo={isVerifiedVideo} isVerifiedIdentity={isVerifiedIdentity} isVerifiedSocial={isVerifiedSocial} onBack={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} onSkip={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} onNext={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} onVerifyVideo={() => setScreen('VIDEO_VERIFY')} onVerifyIdentity={() => setScreen('IDENTITY_VERIFY')} onVerifySocial={() => setIsVerifiedSocial(true)} />;
  if (screen === 'IDENTITY_VERIFY') return <IdentityVerifyScreen onBack={() => setScreen('TRUST_PROFILE')} onSkip={() => { setScreen('DASHBOARD'); setActiveTab(AppTab.PROFILE); }} onNext={() => { setIsVerifiedIdentity(true); setScreen('TRUST_PROFILE'); }} />;
  if (screen === 'MATCH_SETTINGS') return <MatchSettingsScreen onBack={goToDashboard} onSave={(data) => { setMatchSettings({ ...data, hasConfigured: true }); goToDashboard(); }} initialData={matchSettings} />;

  const renderDashboard = () => {
    switch (activeTab) {
      case AppTab.EXPLORE:
        return <ExploreScreen onSeeAll={() => setScreen('COMMUNITY_ADVENTURES')} isLoggedIn={isLoggedIn} onStartAuth={() => setScreen('LANDING')} onSelectTrip={(trip) => { setSelectedTrip(trip); setScreen('TRIP_DETAILS'); }} />;
      case AppTab.MY_TRIPS:
        return (
          <MyTripsScreen 
            onCreateTrip={() => setScreen('CREATE_TRIP')} 
            onItineraryClick={() => setScreen('ITINERARY')} 
            onChatClick={() => setScreen('GROUP_CHAT')} 
            onNotificationClick={() => setScreen('NOTIFICATIONS')} 
            onUpcomingTripClick={(trip) => { setSelectedTrip(trip); setScreen('BOOKING_CONFIRMED'); }}
            profileImage={profileImage} 
            bookedTrips={bookedTrips}
          />
        );
      case AppTab.CHAT:
        return (
          <ChatHubScreen 
            profileImage={profileImage} 
            onNotificationClick={() => setScreen('NOTIFICATIONS')} 
            onGroupClick={(trip) => { setSelectedTrip(trip); setScreen('GROUP_CHAT'); }} 
            onDirectClick={(rec) => { setSelectedRecipient(rec); setScreen('DIRECT_CHAT'); }} 
            bookedTrips={bookedTrips}
          />
        );
      case AppTab.WALLET:
        return <WalletScreen onBack={() => setActiveTab(AppTab.EXPLORE)} profileImage={profileImage} onNotificationClick={() => setScreen('NOTIFICATIONS')} onAddExpense={() => setScreen('ADD_EXPENSE')} expenses={walletExpenses} />;
      case AppTab.PROFILE:
        return <ProfileScreen profileImage={profileImage} userBio={userBio} userInterests={userInterests} emergencyContact={emergencyContact} matchSettings={matchSettings} onEditClick={() => setScreen('CAMERA_PROFILE')} onAddBio={() => setScreen('BIO_SETUP')} onSelectInterests={() => setScreen('MATCH_SETTINGS')} onVerifyClick={() => setScreen('TRUST_PROFILE')} isSafetySetupComplete={isSafetySetupComplete} onEmergencyDetailsClick={() => setScreen('SAFETY_SETUP')} onSafetyCenterClick={() => setScreen('SAFETY_HUB')} isVerifiedVideo={isVerifiedVideo} isVerifiedIdentity={isVerifiedIdentity} isVerifiedSocial={isVerifiedSocial} />;
      default:
        return <PlaceholderScreen tab={activeTab} />;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-background-light relative overflow-hidden">
      {screen === 'DASHBOARD' && activeTab === AppTab.EXPLORE && (
        <TopBar activeTab={activeTab} isLoggedIn={isLoggedIn} onLoginClick={() => setScreen('LANDING')} onSafetyClick={() => setScreen('SAFETY_HUB')} onNotificationClick={() => setScreen('NOTIFICATIONS')} />
      )}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">{renderDashboard()}</div>
      {screen === 'DASHBOARD' && (
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} isLoggedIn={isLoggedIn} profileImage={profileImage} />
      )}
    </div>
  );
};

export default App;

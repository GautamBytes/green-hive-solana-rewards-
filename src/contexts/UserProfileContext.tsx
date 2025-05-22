
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useNotifications } from './NotificationContext';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date | null;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  progress: number;
  target: number;
}

export interface EcoBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  earnedAt: Date;
}

export interface UserLevel {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
}

export interface UserProfile {
  username: string | null;
  bio: string | null;
  avatar: string | null;
  totalGreenTokens: number;
  availableGreenTokens: number;
  stakingGreenTokens: number;
  ecoImpactScore: number;
  karma: number;
  xp: number;
  level: UserLevel;
  achievements: Achievement[];
  badges: EcoBadge[];
  tasksCompleted: number;
  streak: {
    current: number;
    longest: number;
    lastActivity: Date | null;
  };
  joinedAt: Date;
  location: {
    city: string | null;
    country: string | null;
  };
}

interface UserProfileContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (updates: Partial<UserProfile>) => void;
  increaseXp: (amount: number) => void;
  addAchievement: (achievement: Achievement) => void;
  addBadge: (badge: EcoBadge) => void;
  updateStreak: () => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

const LEVELS: UserLevel[] = [
  { level: 1, title: 'Eco Beginner', minXp: 0, maxXp: 100 },
  { level: 2, title: 'Green Novice', minXp: 100, maxXp: 250 },
  { level: 3, title: 'Earth Friend', minXp: 250, maxXp: 500 },
  { level: 4, title: 'Eco Enthusiast', minXp: 500, maxXp: 1000 },
  { level: 5, title: 'Green Guardian', minXp: 1000, maxXp: 2000 },
  { level: 6, title: 'Planet Protector', minXp: 2000, maxXp: 4000 },
  { level: 7, title: 'Environmental Hero', minXp: 4000, maxXp: 8000 },
  { level: 8, title: 'Earth Champion', minXp: 8000, maxXp: 16000 },
  { level: 9, title: 'Sustainability Sage', minXp: 16000, maxXp: 32000 },
  { level: 10, title: 'Legendary EcoWarrior', minXp: 32000, maxXp: Infinity }
];

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connected, publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(true);
  const { addNotification } = useNotifications();
  
  // Default user profile - this would be loaded from an API in a real app
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  
  // Get the user's level based on XP
  const getUserLevel = (xp: number): UserLevel => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].minXp) {
        return LEVELS[i];
      }
    }
    return LEVELS[0];
  };
  
  // Update the user profile
  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  };
  
  // Increase user XP and check for level up
  const increaseXp = (amount: number) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      
      const currentLevel = prev.level;
      const newXp = prev.xp + amount;
      const newLevel = getUserLevel(newXp);
      
      // Check for level up
      if (newLevel.level > currentLevel.level) {
        addNotification({
          title: 'Level Up!',
          message: `Congratulations! You've reached level ${newLevel.level}: ${newLevel.title}`,
          type: 'achievement',
        });
      }
      
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };
  
  // Add a new achievement
  const addAchievement = (achievement: Achievement) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      
      const existingIndex = prev.achievements.findIndex(a => a.id === achievement.id);
      
      if (existingIndex >= 0) {
        const updatedAchievements = [...prev.achievements];
        updatedAchievements[existingIndex] = achievement;
        return { ...prev, achievements: updatedAchievements };
      } else {
        addNotification({
          title: 'New Achievement Unlocked!',
          message: `${achievement.title}: ${achievement.description}`,
          type: 'achievement',
        });
        return { ...prev, achievements: [...prev.achievements, achievement] };
      }
    });
  };
  
  // Add a new badge
  const addBadge = (badge: EcoBadge) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      
      const hasBadge = prev.badges.some(b => b.id === badge.id);
      
      if (hasBadge) return prev;
      
      addNotification({
        title: 'New Badge Earned!',
        message: `${badge.name}: ${badge.description}`,
        type: 'reward',
      });
      
      return { ...prev, badges: [...prev.badges, badge] };
    });
  };
  
  // Update streak (call daily when user performs an eco-action)
  const updateStreak = () => {
    setUserProfile(prev => {
      if (!prev) return prev;
      
      const today = new Date();
      const lastActivity = prev.streak.lastActivity;
      
      // First activity ever
      if (!lastActivity) {
        return {
          ...prev,
          streak: {
            current: 1,
            longest: 1,
            lastActivity: today
          }
        };
      }
      
      // Check if last activity was yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const lastActivityDate = new Date(lastActivity);
      const isYesterday = 
        lastActivityDate.getDate() === yesterday.getDate() &&
        lastActivityDate.getMonth() === yesterday.getMonth() &&
        lastActivityDate.getFullYear() === yesterday.getFullYear();
      
      // Check if already logged activity today
      const isToday = 
        lastActivityDate.getDate() === today.getDate() &&
        lastActivityDate.getMonth() === today.getMonth() &&
        lastActivityDate.getFullYear() === today.getFullYear();
      
      if (isToday) {
        // Already logged activity today
        return prev;
      } else if (isYesterday) {
        // Continue streak
        const newCurrent = prev.streak.current + 1;
        const newLongest = Math.max(newCurrent, prev.streak.longest);
        
        // Check for streak milestones
        if (newCurrent === 7) {
          addNotification({
            title: 'One Week Streak!',
            message: 'You\'ve been active for 7 days in a row. Keep it up!',
            type: 'achievement',
          });
        } else if (newCurrent === 30) {
          addNotification({
            title: 'One Month Streak!',
            message: 'Amazing dedication! 30 days of continuous eco-action!',
            type: 'achievement',
          });
        }
        
        return {
          ...prev,
          streak: {
            current: newCurrent,
            longest: newLongest,
            lastActivity: today
          }
        };
      } else {
        // Streak broken
        addNotification({
          title: 'Streak Reset',
          message: 'Your activity streak has been reset. Start a new one today!',
          type: 'system',
        });
        
        return {
          ...prev,
          streak: {
            current: 1,
            longest: prev.streak.longest,
            lastActivity: today
          }
        };
      }
    });
  };
  
  // Initialize or load user profile
  useEffect(() => {
    if (connected && publicKey) {
      setIsLoading(true);
      
      // In a real app, you would load the profile from an API
      // This is mock data
      const mockProfile: UserProfile = {
        username: 'EcoWarrior',
        bio: 'Passionate about making the world greener, one task at a time.',
        avatar: null,
        totalGreenTokens: 465,
        availableGreenTokens: 420,
        stakingGreenTokens: 45,
        ecoImpactScore: 87,
        karma: 124,
        xp: 780,
        level: getUserLevel(780),
        achievements: [
          {
            id: 'first-task',
            title: 'First Steps',
            description: 'Complete your first eco-task',
            icon: '🌱',
            unlockedAt: new Date(Date.now() - 86400000 * 7), // 7 days ago
            rarity: 'common',
            progress: 1,
            target: 1
          },
          {
            id: 'recycling-pro',
            title: 'Recycling Pro',
            description: 'Complete 5 recycling tasks',
            icon: '♻️',
            unlockedAt: new Date(Date.now() - 86400000 * 3), // 3 days ago
            rarity: 'uncommon',
            progress: 5,
            target: 5
          }
        ],
        badges: [
          {
            id: 'early-adopter',
            name: 'Early Adopter',
            description: 'Joined GreenTask during its beta phase',
            imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop',
            rarity: 'rare',
            earnedAt: new Date(Date.now() - 86400000 * 30) // 30 days ago
          }
        ],
        tasksCompleted: 12,
        streak: {
          current: 3,
          longest: 5,
          lastActivity: new Date(Date.now() - 86400000) // Yesterday
        },
        joinedAt: new Date(Date.now() - 86400000 * 60), // 60 days ago
        location: {
          city: 'San Francisco',
          country: 'USA'
        }
      };
      
      // Simulate API loading delay
      setTimeout(() => {
        setUserProfile(mockProfile);
        setIsLoading(false);
      }, 1000);
    } else {
      setUserProfile(null);
      setIsLoading(false);
    }
  }, [connected, publicKey]);
  
  return (
    <UserProfileContext.Provider 
      value={{ 
        userProfile,
        isLoading,
        updateProfile,
        increaseXp,
        addAchievement,
        addBadge,
        updateStreak
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

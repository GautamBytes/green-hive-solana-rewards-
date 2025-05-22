import React, { useState } from 'react';
import { useUserProfile } from '@/contexts/UserProfileContext';
import { Progress } from "@/components/ui/progress";
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Award, Star, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";

const GamificationSystem = () => {
  const { userProfile, isLoading } = useUserProfile();
  
  if (isLoading || !userProfile) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse flex flex-col gap-4">
          <div className="h-4 bg-green-200 rounded w-3/4 mx-auto"></div>
          <div className="h-24 bg-green-100 rounded"></div>
          <div className="h-32 bg-green-100 rounded"></div>
        </div>
      </div>
    );
  }
  
  // Calculate level progress
  const levelProgress = Math.round(
    ((userProfile.xp - userProfile.level.minXp) / 
     (userProfile.level.maxXp - userProfile.level.minXp)) * 100
  );
  
  const renderRarityBadge = (rarity: string) => {
    let variant: "gold" | "purple" | "secondary" | "eco" = "secondary";
    
    switch (rarity) {
      case "legendary":
        variant = "gold";
        break;
      case "rare":
        variant = "purple";
        break;
      case "uncommon":
        variant = "eco";
        break;
      case "common":
      default:
        variant = "secondary";
    }
    
    return <Badge variant={variant} size="lg">{rarity}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/40 dark:to-green-800/40 rounded-xl shadow-sm"
      >
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-semibold text-green-800 dark:text-green-300 flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
              Level {userProfile.level.level}: {userProfile.level.title}
            </h3>
            <p className="text-sm text-green-600 dark:text-green-400">
              {userProfile.xp} XP / {userProfile.level.maxXp} XP
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="eco" className="flex items-center gap-1 glow">
              <Star className="h-3 w-3" /> {userProfile.ecoImpactScore}
            </Badge>
            <Badge variant="gold" className="flex items-center gap-1">
              <Trophy className="h-3 w-3" /> Rank #126
            </Badge>
          </div>
        </div>
        
        <Progress 
          value={levelProgress} 
          className="h-5 bg-gradient-to-r from-green-400 to-green-600 glow"
          size="md"
          showValue
        />
        
        <div className="mt-2 flex justify-between text-xs text-green-600 dark:text-green-400">
          <span>Level {userProfile.level.level}</span>
          <span>Level {userProfile.level.level + 1}</span>
        </div>
      </motion.div>
      
      {/* Activity Streak */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-green-200 dark:bg-green-900/20 dark:border-green-800 overflow-hidden">
          <CardHeader className="bg-green-50 dark:bg-green-900/40 pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-300">
              <Award className="h-5 w-5 text-green-600" />
              Daily Activity Streak
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Complete eco-actions daily to build your streak
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{userProfile.streak.current}</div>
                <div className="text-sm text-green-500 dark:text-green-500">Current Streak</div>
              </div>
              <div className="h-12 w-px bg-green-200 dark:bg-green-700"></div>
              <div className="text-center flex-1">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{userProfile.streak.longest}</div>
                <div className="text-sm text-green-500 dark:text-green-500">Longest Streak</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => {
                const isActive = i < userProfile.streak.current % 7;
                return (
                  <div 
                    key={i}
                    className={`h-2 rounded-full ${
                      isActive ? 'bg-green-500 dark:bg-green-400' : 'bg-green-200 dark:bg-green-800'
                    }`}
                  />
                );
              })}
            </div>
            
            <div className="mt-1 flex justify-between text-xs text-green-500 dark:text-green-500">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
            
            <div className="mt-4 text-sm text-green-600 dark:text-green-400">
              {userProfile.streak.lastActivity ? (
                <>
                  Last activity: {new Date(userProfile.streak.lastActivity).toLocaleDateString()}
                </>
              ) : (
                "No activities recorded yet"
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Recent Achievements */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <CardHeader className="bg-green-50 dark:bg-green-900/40 pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-300">
              <Trophy className="h-5 w-5 text-green-600" />
              Recent Achievements
            </CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Your eco-accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ScrollArea className="h-[220px] pr-4">
              {userProfile.achievements.length > 0 ? (
                <div className="space-y-4">
                  {userProfile.achievements.map((achievement) => (
                    <div 
                      key={achievement.id}
                      className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-800/30 rounded-lg border border-green-100 dark:border-green-700"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-green-800 dark:text-green-300">{achievement.title}</h4>
                          {renderRarityBadge(achievement.rarity)}
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">{achievement.description}</p>
                        {achievement.unlockedAt ? (
                          <p className="text-xs text-green-500 dark:text-green-500 mt-1">
                            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                          </p>
                        ) : (
                          <div className="mt-1">
                            <div className="text-xs text-green-500 dark:text-green-500 flex justify-between">
                              <span>Progress</span>
                              <span>{achievement.progress} / {achievement.target}</span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.target) * 100} 
                              className="h-1.5 mt-1"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-green-500 dark:text-green-500">
                  <Trophy className="h-12 w-12 mx-auto mb-3 opacity-40" />
                  <p>Complete tasks to earn achievements!</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="bg-green-50 dark:bg-green-900/40 border-t border-green-100 dark:border-green-700">
            <div className="w-full text-center">
              <span className="text-sm text-green-500 dark:text-green-500">
                {userProfile.achievements.length} achievement{userProfile.achievements.length !== 1 ? 's' : ''} unlocked
              </span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default GamificationSystem;

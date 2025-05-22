
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, Award, Trophy } from "lucide-react";
import { useUserProfile } from '@/contexts/UserProfileContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useToast } from '@/components/ui/use-toast';

interface Post {
  id: string;
  username: string;
  avatar?: string;
  content: string;
  images?: string[];
  task?: {
    type: string;
    reward: number;
  };
  achievement?: {
    title: string;
    icon: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  };
  likes: number;
  comments: number;
  timestamp: Date;
  liked: boolean;
}

const SocialFeed = () => {
  const { userProfile } = useUserProfile();
  const { addNotification } = useNotifications();
  const { toast } = useToast();
  const [newPostContent, setNewPostContent] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      username: 'GreenWarrior',
      avatar: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&auto=format&fit=crop',
      content: 'Just finished cleaning up Riverside Park! Found over 20 pounds of plastic waste that won\'t be going into our oceans. 🌊♻️',
      images: ['https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=500&auto=format&fit=crop'],
      task: {
        type: 'Beach Cleanup',
        reward: 25
      },
      likes: 24,
      comments: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      liked: false
    },
    {
      id: '2',
      username: 'EcoChampion',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&auto=format&fit=crop',
      content: 'My community garden project is really taking off! 🌱 Can\'t wait to share the organic produce with my neighbors.',
      images: ['https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=500&auto=format&fit=crop'],
      likes: 42,
      comments: 7,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      liked: true
    },
    {
      id: '3',
      username: 'TreeHugger92',
      content: 'Just unlocked the "Forest Guardian" achievement by planting my 10th tree! 🌳',
      achievement: {
        title: 'Forest Guardian',
        icon: '🌳',
        rarity: 'rare'
      },
      likes: 18,
      comments: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      liked: false
    }
  ]);
  
  const handlePostSubmit = () => {
    if (!newPostContent.trim() || !userProfile) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      username: userProfile.username || 'Anonymous',
      avatar: userProfile.avatar || undefined,
      content: newPostContent,
      likes: 0,
      comments: 0,
      timestamp: new Date(),
      liked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    
    toast({
      title: "Post shared!",
      description: "Your eco-update has been shared with the community.",
      duration: 3000
    });
    
    // Reward user with XP
    setTimeout(() => {
      addNotification({
        title: "Social Engagement",
        message: "You earned 5 XP for sharing your eco-journey",
        type: "reward"
      });
    }, 1000);
  };
  
  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.liked;
        return {
          ...post,
          liked: !wasLiked,
          likes: wasLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-green-200 dark:bg-green-900/20 dark:border-green-800">
        <CardHeader className="bg-green-50 dark:bg-green-900/40 pb-3">
          <CardTitle className="text-green-800 dark:text-green-300">Community Feed</CardTitle>
          <CardDescription className="text-green-600 dark:text-green-400">
            Share your eco-journey and inspire others
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {userProfile && (
            <div className="mb-6 space-y-3">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <div className="bg-green-200 dark:bg-green-700 h-full w-full flex items-center justify-center text-green-800 dark:text-green-200 font-medium">
                    {userProfile.username?.charAt(0) || 'U'}
                  </div>
                </Avatar>
                <Textarea
                  placeholder="Share your eco-actions with the community..."
                  className="min-h-24 resize-none flex-1"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={handlePostSubmit}
                  disabled={!newPostContent.trim()}
                  className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                >
                  Post Update
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="p-4 bg-white dark:bg-green-900/30 rounded-lg border border-green-100 dark:border-green-800 shadow-sm"
              >
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    {post.avatar ? (
                      <img src={post.avatar} alt={post.username} />
                    ) : (
                      <div className="bg-green-200 dark:bg-green-700 h-full w-full flex items-center justify-center text-green-800 dark:text-green-200 font-medium">
                        {post.username.charAt(0)}
                      </div>
                    )}
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-green-800 dark:text-green-300">{post.username}</span>
                      <span className="text-xs text-green-500 dark:text-green-500">{formatTime(post.timestamp)}</span>
                    </div>
                    
                    <p className="mt-2 text-green-700 dark:text-green-400">{post.content}</p>
                    
                    {post.images && post.images.length > 0 && (
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        {post.images.map((img, i) => (
                          <img 
                            key={i}
                            src={img}
                            alt="Post image"
                            className="rounded-lg w-full max-h-[300px] object-cover"
                          />
                        ))}
                      </div>
                    )}
                    
                    {post.task && (
                      <div className="mt-3 flex items-center gap-2 p-2 bg-green-50 dark:bg-green-800/30 rounded-md border border-green-100 dark:border-green-700">
                        <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            Completed {post.task.type}
                          </span>
                        </div>
                        <Badge variant="eco" className="ml-auto">
                          +{post.task.reward} $GREEN
                        </Badge>
                      </div>
                    )}
                    
                    {post.achievement && (
                      <div className="mt-3 flex items-center gap-2 p-2 bg-green-50 dark:bg-green-800/30 rounded-md border border-green-100 dark:border-green-700">
                        <div className="text-2xl">{post.achievement.icon}</div>
                        <div className="flex-1">
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            Achievement Unlocked: {post.achievement.title}
                          </span>
                        </div>
                        <Badge 
                          variant={
                            post.achievement.rarity === 'legendary' ? 'legendary' :
                            post.achievement.rarity === 'rare' ? 'rare' : 
                            post.achievement.rarity === 'uncommon' ? 'success' :
                            'secondary'
                          } 
                          className="ml-auto"
                        >
                          {post.achievement.rarity}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className={`flex items-center gap-1 ${
                          post.liked ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                        }`}
                        onClick={() => toggleLike(post.id)}
                      >
                        <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-1 text-green-600 dark:text-green-400"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="flex items-center gap-1 text-green-600 dark:text-green-400"
                      >
                        <Share className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="bg-green-50 dark:bg-green-900/40 border-t border-green-100 dark:border-green-700">
          <Button variant="outline" className="w-full">
            Load more posts
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SocialFeed;

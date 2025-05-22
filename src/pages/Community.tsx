
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from "@/components/Navbar";
import Leaderboard from "@/components/community/Leaderboard";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, MessageSquare, Award, ChevronRight } from "lucide-react";

const Community = () => {
  const { connected } = useWallet();
  
  // Mock upcoming events
  const upcomingEvents = [
    {
      id: "event-1",
      title: "Central Park Cleanup",
      date: "May 28, 2025",
      time: "10:00 AM",
      location: "Central Park, New York",
      participants: 24,
    },
    {
      id: "event-2",
      title: "Community Tree Planting",
      date: "June 5, 2025",
      time: "9:30 AM",
      location: "Riverside Park, New York",
      participants: 32,
    }
  ];
  
  // Mock community updates
  const communityUpdates = [
    {
      id: "update-1",
      author: "Sarah J.",
      authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      time: "2 hours ago",
      content: "Just completed my 30th eco-task! The beach is looking so much cleaner now. Thanks to everyone who joined today's cleanup event!",
      likes: 24,
      comments: 8,
      image: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format&fit=crop"
    },
    {
      id: "update-2",
      author: "GreenTask Team",
      authorImage: "https://api.dicebear.com/7.x/initials/svg?seed=GT",
      time: "1 day ago",
      content: "We're excited to announce our new partnership with TreeFund! For every 10 tree-planting tasks completed, they will match with an additional tree planted in the Amazon rainforest.",
      likes: 42,
      comments: 15,
      image: null
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isConnected={connected} onConnect={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-2">Community</h1>
            <p className="text-green-600 dark:text-green-400">
              Connect with other eco-heroes and join community events
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Leaderboard />
            
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">Community Feed</h2>
              
              <div className="bg-white dark:bg-green-900/20 rounded-lg border border-gray-200 dark:border-green-800 p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-100 dark:bg-green-900/40 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-green-800/40 transition-colors">
                    <p className="text-gray-500 dark:text-gray-400">Share your eco achievements...</p>
                  </div>
                  <Button>Post</Button>
                </div>
              </div>
              
              {communityUpdates.map((update) => (
                <Card key={update.id} className="border-green-100 dark:border-green-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={update.authorImage} />
                          <AvatarFallback>{update.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                          <CardTitle className="text-base">{update.author}</CardTitle>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{update.time}</p>
                        </div>
                      </div>
                      {update.author === "GreenTask Team" && (
                        <Badge variant="eco">Official</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-gray-700 dark:text-gray-300">{update.content}</p>
                    {update.image && (
                      <div className="mt-3 rounded-lg overflow-hidden">
                        <img 
                          src={update.image} 
                          alt="Community update" 
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 flex justify-between">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {update.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                        <MessageSquare className="h-5 w-5 mr-1" />
                        {update.comments}
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              <div className="flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <Card className="border-green-100 dark:border-green-800">
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-green-50 dark:bg-green-900/30 rounded-lg p-3 border border-green-100 dark:border-green-800"
                  >
                    <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">{event.title}</h3>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400 mb-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-green-600 dark:text-green-400 mb-3">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">
                        {event.participants} attending
                      </Badge>
                      <Button size="sm">Join</Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">View All Events</Button>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 dark:border-green-800">
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Sarah J.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", score: 450, badge: "gold" },
                  { name: "Michael C.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike", score: 386, badge: "silver" },
                  { name: "Elena R.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena", score: 352, badge: "bronze" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.img} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {user.badge && (
                        <div className={`absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs ${
                          user.badge === "gold" ? "bg-amber-500" :
                          user.badge === "silver" ? "bg-gray-300" :
                          "bg-amber-800"
                        } text-white rounded-full border-2 border-white dark:border-green-900`}>
                          {index + 1}
                        </div>
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="font-medium text-sm">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">This month</div>
                    </div>
                    <Badge variant={
                      user.badge === "gold" ? "legendary" :
                      user.badge === "silver" ? "secondary" :
                      "outline"
                    }>
                      {user.score}
                    </Badge>
                  </div>
                ))}
                <Separator />
                <Button variant="ghost" size="sm" className="w-full">
                  <Award className="h-4 w-4 mr-2" />
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-green-100 dark:border-green-800">
              <CardHeader>
                <CardTitle>Join The Conversation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full flex justify-between items-center" variant="outline">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                    Twitter
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button className="w-full flex justify-between items-center" variant="outline">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-500" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                    </svg>
                    Discord
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Button>
                <Button className="w-full flex justify-between items-center" variant="outline">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9.78 18.65l.28-4.23l7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3L3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
                    </svg>
                    Telegram
                  </div>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

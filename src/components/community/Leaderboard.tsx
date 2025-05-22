
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user data for leaderboard
const topUsers = [
  {
    rank: 1,
    name: "Sarah Johnson",
    username: "eco_sarah",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    score: 1250,
    treesPlanted: 28,
    tasksCompleted: 42
  },
  {
    rank: 2,
    name: "Michael Chen",
    username: "green_mike",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    score: 980,
    treesPlanted: 18,
    tasksCompleted: 36
  },
  {
    rank: 3,
    name: "Elena Rodriguez",
    username: "planet_elena",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    score: 840,
    treesPlanted: 15,
    tasksCompleted: 29
  },
  {
    rank: 4,
    name: "James Wilson",
    username: "eco_james",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    score: 780,
    treesPlanted: 12,
    tasksCompleted: 26
  },
  {
    rank: 5,
    name: "Aisha Patel",
    username: "green_aisha",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    score: 720,
    treesPlanted: 10,
    tasksCompleted: 24
  },
  {
    rank: 6,
    name: "David Thompson",
    username: "earth_david",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    score: 690,
    treesPlanted: 8,
    tasksCompleted: 23
  },
  {
    rank: 7,
    name: "Olivia Martinez",
    username: "eco_olivia",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    score: 650,
    treesPlanted: 7,
    tasksCompleted: 22
  },
  {
    rank: 8,
    name: "Jamal Adams",
    username: "green_jamal",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamal",
    score: 620,
    treesPlanted: 6,
    tasksCompleted: 21
  },
  {
    rank: 9,
    name: "Emily Chang",
    username: "planet_emily",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    score: 580,
    treesPlanted: 5,
    tasksCompleted: 19
  },
  {
    rank: 10,
    name: "Lucas Müller",
    username: "eco_lucas",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    score: 540,
    treesPlanted: 4,
    tasksCompleted: 18
  }
];

const communities = [
  {
    id: "com-1",
    name: "SF Green Team",
    members: 124,
    score: 4750,
    image: "https://api.dicebear.com/7.x/initials/svg?seed=SF"
  },
  {
    id: "com-2",
    name: "NYC Recyclers",
    members: 98,
    score: 3890,
    image: "https://api.dicebear.com/7.x/initials/svg?seed=NY"
  },
  {
    id: "com-3",
    name: "Portland Tree Huggers",
    members: 86,
    score: 3240,
    image: "https://api.dicebear.com/7.x/initials/svg?seed=PT"
  }
];

const events = [
  {
    id: "event-1",
    title: "Central Park Cleanup",
    date: "May 28, 2025",
    location: "Central Park, NY",
    participants: 24,
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=300&auto=format&fit=crop"
  },
  {
    id: "event-2",
    title: "Community Tree Planting",
    date: "June 5, 2025",
    location: "Riverside Park, NY",
    participants: 32,
    image: "https://images.unsplash.com/photo-1513764822893-5a29befa1a63?w=300&auto=format&fit=crop"
  },
  {
    id: "event-3",
    title: "E-Waste Collection Drive",
    date: "June 12, 2025",
    location: "Union Square, NY",
    participants: 18,
    image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=300&auto=format&fit=crop"
  }
];

const Leaderboard = () => {
  const [period, setPeriod] = useState<"week" | "month" | "allTime">("month");
  
  return (
    <div className="space-y-6 mb-8">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">Community & Leaderboard</h2>
      
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="leaderboard">Top Eco Heroes</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="leaderboard" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Eco Heroes Leaderboard</CardTitle>
                <div className="flex bg-gray-100 dark:bg-green-900/30 rounded-lg p-1">
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod("week")}
                    className={period === "week" ? "bg-white dark:bg-green-800 shadow-sm" : ""}
                  >
                    Week
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod("month")}
                    className={period === "month" ? "bg-white dark:bg-green-800 shadow-sm" : ""}
                  >
                    Month
                  </Button>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => setPeriod("allTime")}
                    className={period === "allTime" ? "bg-white dark:bg-green-800 shadow-sm" : ""}
                  >
                    All Time
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Top 3 users with podium */}
                <div className="flex flex-wrap justify-center items-end gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-green-800">
                  {topUsers.slice(0, 3).map((user, index) => {
                    const isFirst = index === 0;
                    const isSecond = index === 1;
                    const isThird = index === 2;
                    
                    return (
                      <motion.div
                        key={user.rank}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex flex-col items-center ${
                          isSecond ? 'order-1' : isFirst ? 'order-2' : 'order-3'
                        } ${isFirst ? 'mb-0' : 'mb-6'}`}
                      >
                        <div 
                          className={`relative border-4 ${
                            isFirst ? 'border-amber-500 dark:border-amber-400' : 
                            isSecond ? 'border-gray-400 dark:border-gray-500' : 
                            'border-amber-700 dark:border-amber-800'
                          } rounded-full`}
                        >
                          <Avatar className={`h-16 w-16 ${isFirst ? 'h-24 w-24' : ''}`}>
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div 
                            className={`absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center text-white ${
                              isFirst ? 'bg-amber-500' : 
                              isSecond ? 'bg-gray-400' : 
                              'bg-amber-700'
                            } rounded-full text-sm font-bold shadow-lg`}
                          >
                            {user.rank}
                          </div>
                        </div>
                        <h3 className="font-medium text-base mt-3 text-center">
                          {user.name.split(' ')[0]}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</div>
                        <div className="mt-1">
                          <Badge variant={
                            isFirst ? "legendary" : 
                            isSecond ? "secondary" : 
                            "eco"
                          }>
                            {user.score} $GREEN
                          </Badge>
                        </div>
                        <div className="mt-2 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
                          <span className="mr-2">🌳 {user.treesPlanted}</span>
                          <span>✅ {user.tasksCompleted}</span>
                        </div>
                        {isFirst && (
                          <div className="mt-3 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full text-xs font-medium">
                            Top Contributor
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Rest of leaderboard */}
                <div className="space-y-2">
                  {topUsers.slice(3, 10).map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index + 3) * 0.05 }}
                      className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-green-900/30"
                    >
                      <div className="w-8 flex justify-center font-medium text-gray-700 dark:text-gray-300">
                        {user.rank}
                      </div>
                      <Avatar className="h-10 w-10 mx-2">
                        <AvatarImage src={user.avatarUrl} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 ml-2">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mr-4">
                          <span className="mr-2">🌳 {user.treesPlanted}</span>
                          <span>✅ {user.tasksCompleted}</span>
                        </div>
                        <Badge variant="outline">
                          {user.score} $GREEN
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-4">
                  <Button variant="ghost" size="sm">
                    View Full Leaderboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="communities" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Eco Communities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {communities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-green-800 rounded-lg overflow-hidden"
                  >
                    <div className="bg-green-50 dark:bg-green-900/30 p-4 flex items-center">
                      <Avatar className="h-14 w-14">
                        <AvatarImage src={community.image} />
                        <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <h3 className="font-semibold text-green-800 dark:text-green-300">{community.name}</h3>
                        <p className="text-sm text-green-600 dark:text-green-400">{community.members} members</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Community Score</span>
                        <Badge variant="eco">{community.score} pts</Badge>
                      </div>
                      <Button variant="outline" className="w-full">Join Community</Button>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border border-dashed border-gray-200 dark:border-green-800 rounded-lg flex flex-col items-center justify-center p-6"
                >
                  <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="mt-3 font-medium text-gray-600 dark:text-gray-400">Create Community</p>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-1">
                    Start your own eco community
                  </p>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Eco Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-green-800 rounded-lg overflow-hidden"
                  >
                    <div className="h-32 w-full relative">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                        <h3 className="font-medium text-white">{event.title}</h3>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">
                          {event.participants} attending
                        </Badge>
                        <Button size="sm">Join</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button>View All Events</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;


import { useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Globe, Recycle, Trees, Leaf } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Participant {
  id: string;
  name: string;
  avatar: string;
  contribution: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: any;
  totalGoal: number;
  currentProgress: number;
  deadline: string;
  participants: Participant[];
  reward: number;
  joined: boolean;
}

const challenges: Challenge[] = [
  {
    id: "city-cleanup",
    title: "City Cleanup Challenge",
    description: "Let's collect 1,000kg of trash from our city streets and parks",
    icon: Recycle,
    totalGoal: 1000,
    currentProgress: 580,
    deadline: "2025-07-01",
    participants: [
      { id: "1", name: "Alex", avatar: "", contribution: 42 },
      { id: "2", name: "Jamie", avatar: "", contribution: 35 },
      { id: "3", name: "Taylor", avatar: "", contribution: 56 },
      { id: "4", name: "Morgan", avatar: "", contribution: 28 }
    ],
    reward: 250,
    joined: true
  },
  {
    id: "tree-planting",
    title: "Community Forest",
    description: "Plant 500 trees in local neighborhoods and parks",
    icon: Trees,
    totalGoal: 500,
    currentProgress: 142,
    deadline: "2025-08-15",
    participants: [
      { id: "1", name: "Alex", avatar: "", contribution: 12 },
      { id: "5", name: "Jordan", avatar: "", contribution: 23 },
      { id: "6", name: "Casey", avatar: "", contribution: 16 }
    ],
    reward: 300,
    joined: false
  },
  {
    id: "garden-project",
    title: "Community Gardens",
    description: "Create 50 community garden plots for growing local produce",
    icon: Leaf,
    totalGoal: 50,
    currentProgress: 8,
    deadline: "2025-09-30",
    participants: [
      { id: "7", name: "Riley", avatar: "", contribution: 3 },
      { id: "8", name: "Dakota", avatar: "", contribution: 5 }
    ],
    reward: 400,
    joined: false
  }
];

const CommunityChallenges = () => {
  const [localChallenges, setLocalChallenges] = useState<Challenge[]>(challenges);
  const { toast } = useToast();

  const joinChallenge = (id: string) => {
    setLocalChallenges(prev => 
      prev.map(challenge => 
        challenge.id === id ? { ...challenge, joined: true } : challenge
      )
    );
    
    toast({
      title: "Challenge joined!",
      description: "You've successfully joined this community challenge.",
      duration: 3000
    });
  };

  const getTimeRemaining = (deadline: string) => {
    const diff = new Date(deadline).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days remaining`;
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-100">Community Challenges</h2>
          <p className="text-green-700 dark:text-green-300">Join forces with others for bigger environmental impact</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Globe className="mr-2 h-4 w-4" />
          All Challenges
        </Button>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {localChallenges.map((challenge, index) => (
          <motion.div 
            key={challenge.id}
            variants={fadeInUp}
            custom={index}
            className="h-full"
          >
            <Card className="h-full border-green-200 dark:border-green-800 overflow-hidden hover:shadow-lg transition-shadow bg-white/90 dark:bg-green-900/80 backdrop-blur-sm">
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-100">
                      {challenge.title}
                    </CardTitle>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {getTimeRemaining(challenge.deadline)}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    +{challenge.reward} $GREEN
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="flex gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-800/60 rounded-full">
                    <challenge.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {challenge.description}
                  </p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-700 dark:text-green-300">Progress</span>
                    <span className="font-medium text-green-800 dark:text-green-100">
                      {challenge.currentProgress}/{challenge.totalGoal}
                    </span>
                  </div>
                  <Progress 
                    value={(challenge.currentProgress / challenge.totalGoal) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-green-700 dark:text-green-300 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {challenge.participants.length} Participants
                    </span>
                  </div>
                  <div className="flex -space-x-2">
                    {challenge.participants.slice(0, 4).map((participant) => (
                      <Avatar key={participant.id} className="border-2 border-white dark:border-green-900 w-8 h-8">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback className="bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100 text-xs">
                          {participant.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {challenge.participants.length > 4 && (
                      <Avatar className="border-2 border-white dark:border-green-900 w-8 h-8">
                        <AvatarFallback className="bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100 text-xs">
                          +{challenge.participants.length - 4}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${challenge.joined ? 
                    "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-100" : 
                    "bg-green-600 hover:bg-green-700 text-white"}`}
                  disabled={challenge.joined}
                  onClick={() => !challenge.joined && joinChallenge(challenge.id)}
                >
                  {challenge.joined ? "Joined" : "Join Challenge"}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CommunityChallenges;

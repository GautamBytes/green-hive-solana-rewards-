import React from "react";
import { motion } from "framer-motion";
import { 
  LeafyGreen, 
  Droplet, 
  Trash2, 
  Recycle, 
  Sprout, 
  TreePine,
  CloudFog
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

export const ImpactDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<"personal" | "community">("personal");
  
  const personalStats = {
    treesSaved: 12,
    waterSaved: 240, // gallons
    trashCollected: 28, // pounds
    co2Reduced: 120, // kg
    recyclingItems: 145,
    rankPercentile: 82,
  };
  
  const communityStats = {
    treesSaved: 1856,
    waterSaved: 34500, // gallons
    trashCollected: 4280, // pounds
    co2Reduced: 15600, // kg
    recyclingItems: 28750,
    activeTasks: 86,
  };
  
  const handleShare = () => {
    toast({
      title: "Impact Shared!",
      description: "Your environmental impact stats have been shared to your social feed!",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 flex items-center">
            <LeafyGreen className="mr-2 h-6 w-6 text-green-600" /> 
            Environmental Impact
          </h2>
          <p className="text-muted-foreground">Track your contribution to a greener planet</p>
        </div>
        
        <div className="inline-flex bg-muted/50 rounded-lg p-1">
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === "personal" 
                ? "bg-white dark:bg-green-800 shadow-sm text-green-800 dark:text-green-100" 
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal
          </button>
          <button
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === "community" 
                ? "bg-white dark:bg-green-800 shadow-sm text-green-800 dark:text-green-100" 
                : "text-muted-foreground hover:bg-muted"
            }`}
            onClick={() => setActiveTab("community")}
          >
            Community
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {activeTab === "personal" ? (
          <>
            <StatsCard 
              title="Trees Saved" 
              value={personalStats.treesSaved}
              icon={<TreePine className="h-5 w-5" />}
              color="bg-gradient-to-br from-green-500 to-green-600"
              description="Equivalent to paper recycling impact"
              change="+2 this month"
              changePositive={true}
            />
            
            <StatsCard 
              title="Water Saved" 
              value={`${personalStats.waterSaved} gal`}
              icon={<Droplet className="h-5 w-5" />}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
              description="From conservation activities"
              change="+45 gal this month"
              changePositive={true}
            />
            
            <StatsCard 
              title="Trash Collected" 
              value={`${personalStats.trashCollected} lbs`}
              icon={<Trash2 className="h-5 w-5" />}
              color="bg-gradient-to-br from-amber-500 to-amber-600"
              description="From cleanup activities"
              change="+8 lbs this month"
              changePositive={true}
            />
          </>
        ) : (
          <>
            <StatsCard 
              title="Trees Saved" 
              value={communityStats.treesSaved}
              icon={<TreePine className="h-5 w-5" />}
              color="bg-gradient-to-br from-green-500 to-green-600"
              description="Our community's total impact"
              change="+124 this month"
              changePositive={true}
            />
            
            <StatsCard 
              title="Water Saved" 
              value={`${(communityStats.waterSaved / 1000).toFixed(1)}K gal`}
              icon={<Droplet className="h-5 w-5" />}
              color="bg-gradient-to-br from-blue-500 to-blue-600"
              description="From conservation activities"
              change="+2.8K gal this month"
              changePositive={true}
            />
            
            <StatsCard 
              title="Active Tasks" 
              value={communityStats.activeTasks}
              icon={<Sprout className="h-5 w-5" />}
              color="bg-gradient-to-br from-purple-500 to-purple-600"
              description="Currently in progress"
              change="+12 this week"
              changePositive={true}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTab === "personal" ? (
          <>
            <DetailCard 
              title="Your Carbon Footprint Reduction" 
              value={personalStats.co2Reduced}
              unit="kg CO₂"
              icon={CloudFog}
              color="text-green-600"
              progress={65}
              target={200}
              description="You've reduced 120kg of CO₂ emissions through your eco activities!"
            />
            
            <DetailCard 
              title="Recycling Impact" 
              value={personalStats.recyclingItems}
              unit="items"
              icon={Recycle}
              color="text-blue-600"
              progress={72}
              target={200}
              description="By recycling 145 items, you've helped reduce landfill waste significantly."
            />
          </>
        ) : (
          <>
            <DetailCard 
              title="Community Carbon Reduction" 
              value={communityStats.co2Reduced}
              unit="kg CO₂"
              icon={CloudFog}
              color="text-green-600"
              progress={78}
              target={20000}
              description="Together we've prevented 15,600kg of CO₂ emissions!"
            />
            
            <DetailCard 
              title="Community Recycling" 
              value={communityStats.recyclingItems}
              unit="items"
              icon={Recycle}
              color="text-blue-600"
              progress={86}
              target={30000}
              description="Our community has recycled 28,750 items so far this year."
            />
          </>
        )}
      </div>

      {activeTab === "personal" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-6"
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">Your Impact Ranking</CardTitle>
                <Badge variant="eco">Top {100 - personalStats.rankPercentile}%</Badge>
              </div>
              <CardDescription>How you compare to other eco-warriors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pt-2">
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-1 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                    style={{ width: `${personalStats.rankPercentile}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Beginner</span>
                  <span>Advanced</span>
                  <span>Expert</span>
                </div>
                
                <div 
                  className="absolute top-0.5 h-6 flex flex-col items-center"
                  style={{ left: `${personalStats.rankPercentile}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="w-1.5 h-6 bg-green-600 rounded-full"></div>
                  <div className="mt-1 text-xs font-medium px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-md">
                    You
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Share your impact</p>
                  <p className="text-xs text-muted-foreground">Let your friends know about your eco-contributions</p>
                </div>
                
                <button 
                  onClick={handleShare}
                  className="text-sm bg-white dark:bg-green-800 text-green-800 dark:text-green-100 px-4 py-1.5 rounded-md shadow-sm hover:shadow transition-all font-medium"
                >
                  Share Stats
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  description: string;
  change: string;
  changePositive: boolean;
}

const StatsCard = ({ title, value, icon, color, description, change, changePositive }: StatsCardProps) => {
  return (
    <Card className="border-green-100 dark:border-green-800">
      <CardHeader className={`${color} text-white rounded-t-lg pb-2 pt-3 px-4`}>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">{title}</h3>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-green-800 dark:text-green-300">{value}</span>
          <span className="text-xs text-muted-foreground">{description}</span>
          
          <div className={`mt-2 flex items-center text-xs ${changePositive ? 'text-green-600' : 'text-red-600'}`}>
            {changePositive ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12 7a1 1 0 01-1 1H9v2h2a1 1 0 110 2H9v2a1 1 0 11-2 0v-2H5a1 1 0 110-2h2V8H5a1 1 0 010-2h2V4a1 1 0 112 0v2h2a1 1 0 011 1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
            <span>{change}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface DetailCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  progress: number;
  target: number;
  description: string;
}

const DetailCard = ({ title, value, unit, icon: Icon, color, progress, target, description }: DetailCardProps) => {
  return (
    <Card className="border-green-100 dark:border-green-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className={`p-2 rounded-full bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-bold text-green-800 dark:text-green-300">{value}</span>
          <span className="ml-1 text-sm text-muted-foreground">{unit}</span>
        </div>
        
        <div className="space-y-1.5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="progress-animated">
                  <Progress 
                    value={progress} 
                    className="h-2 bg-muted" 
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">{value} of {target} {unit} ({progress}% of target)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Progress: {progress}%</span>
            <span>Target: {target} {unit}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex justify-between items-center pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">Updated today</span>
          <Badge variant="outline" className="text-xs">
            {progress >= 75 ? "Excellent" : progress >= 50 ? "Good" : "In Progress"}
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

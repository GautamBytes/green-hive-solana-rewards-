
import React from "react";
import { motion } from "framer-motion";
import { Leaf, Calendar, MapPin, Clock, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/contexts/NotificationContext";

interface EcoActionProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  impact: string;
  reward: number;
  category: string;
  image: string;
  status?: "upcoming" | "active" | "completed";
}

export const EcoActionCard = ({ 
  id,
  title,
  description,
  date,
  location,
  participants,
  impact,
  reward,
  category,
  image,
  status = "active"
}: EcoActionProps) => {
  const { toast } = useToast();
  const { addNotification } = useNotifications();

  const handleJoin = () => {
    toast({
      title: "Action Joined!",
      description: `You've successfully joined '${title}'. Check your notifications for updates.`,
    });
    
    addNotification({
      title: "Eco Action Joined",
      message: `You've joined the ${title} eco-action. Don't forget to mark your calendar for ${date}!`,
      type: "system", // Changed from "info" to "system" to match NotificationType
    });
  };

  const getCategoryColor = () => {
    switch (category.toLowerCase()) {
      case "recycling":
        return "bg-blue-500";
      case "planting":
        return "bg-green-500";
      case "cleanup":
        return "bg-amber-500";
      case "conservation":
        return "bg-purple-500";
      default:
        return "bg-green-500";
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "upcoming":
        return <Badge variant="blue">Upcoming</Badge>;
      case "active":
        return <Badge variant="eco">Active</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 10px 25px rgba(34, 197, 94, 0.2)" }}
      className="eco-card"
    >
      <Card className="overflow-hidden h-full flex flex-col relative border-green-100 dark:border-green-800">
        {/* Category indicator */}
        <div className={`absolute top-0 right-0 w-20 h-20 ${getCategoryColor()} -mr-10 -mt-10 rotate-45`}></div>
        <div className="absolute top-2 right-2 z-10">
          {getStatusBadge()}
        </div>
        
        {/* Image */}
        <div 
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        </div>
        
        <CardHeader className="pb-2 pt-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-green-800 dark:text-green-300">{title}</CardTitle>
            <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        </CardHeader>
        
        <CardContent className="pb-2 flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-green-600 dark:text-green-400">
              <Calendar className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">{date}</span>
            </div>
            
            <div className="flex items-center text-green-600 dark:text-green-400">
              <MapPin className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            
            <div className="flex items-center text-green-600 dark:text-green-400">
              <Clock className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span>Duration: 2 hours</span>
            </div>
            
            <div className="flex items-center text-green-600 dark:text-green-400">
              <Users className="h-3.5 w-3.5 mr-2 flex-shrink-0" />
              <span>{participants} participants</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 flex justify-between items-center">
          <div className="flex items-center">
            <Award className="h-4 w-4 text-amber-500 dark:text-amber-400 mr-1" />
            <span className="font-bold text-green-700 dark:text-green-300">+{reward} $GREEN</span>
          </div>
          
          <Button 
            variant="eco" // Changed from "nature" to "eco"
            size="sm"
            onClick={handleJoin}
          >
            Join Action
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

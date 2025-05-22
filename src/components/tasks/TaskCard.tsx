
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";

interface TaskCardProps {
  task: {
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    location: string;
    distance: string;
    status: 'available' | 'inProgress' | 'completed' | 'verified';
    reward: number;
    imageUrl: string;
    category: string;
  };
  onClick: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className="overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 border-green-100 dark:border-green-800"
        onClick={onClick}
      >
        <div className="relative h-40 overflow-hidden">
          <img 
            src={task.imageUrl} 
            alt={task.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <Badge variant={task.category === "Recycling" ? "success" : (task.category === "Tree Planting" ? "eco" : "info")}>
              {task.category}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="legendary" className="shadow-sm text-md font-bold">
              +{task.reward} $GREEN
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg text-green-800 dark:text-green-300 mb-1">{task.title}</h3>
          
          <div className="flex items-center text-sm text-green-700 dark:text-green-400 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{task.date}</span>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{task.distance} away</span>
            </div>
            
            <Badge variant={
              task.status === 'available' ? 'outline' : 
              task.status === 'inProgress' ? 'blue' : 
              task.status === 'completed' ? 'success' : 'shimmer'
            }>
              {task.status === 'available' ? 'Available' : 
               task.status === 'inProgress' ? 'In Progress' : 
               task.status === 'completed' ? 'Completed' : 'Verified'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;

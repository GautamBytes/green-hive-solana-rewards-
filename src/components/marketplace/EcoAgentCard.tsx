
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Sparkles } from "lucide-react";
import { EcoAgent } from "@/types/EcoAgent";

interface EcoAgentCardProps {
  agent: EcoAgent;
  onSelect: (agent: EcoAgent) => void;
}

const EcoAgentCard = ({ agent, onSelect }: EcoAgentCardProps) => {
  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-green-100 dark:border-green-800 cursor-pointer h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={agent.image} 
            alt={agent.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <Badge variant="eco" className="shadow-sm">{agent.category}</Badge>
          </div>
          {agent.rating >= 4.5 && (
            <div className="absolute top-2 right-2">
              <Badge variant="legendary" className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Top Rated
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-lg text-green-800 dark:text-green-300 mb-1">{agent.name}</h3>
          <p className="text-sm text-green-600 dark:text-green-400 mb-3 line-clamp-2">{agent.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {agent.category === "Navigation" && (
              <div className="flex items-center text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full px-2 py-1">
                <MapPin className="h-3 w-3 mr-1" /> Path Optimizer
              </div>
            )}
            {agent.category === "Scheduling" && (
              <div className="flex items-center text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full px-2 py-1">
                <Clock className="h-3 w-3 mr-1" /> Time Manager
              </div>
            )}
            {agent.category === "Analytics" && (
              <div className="flex items-center text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full px-2 py-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                Data Analyzer
              </div>
            )}
          </div>
          
          <div className="flex items-baseline justify-between mt-auto">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">{agent.rating.toFixed(1)}</span>
            </div>
            <div className="text-lg font-bold text-green-700 dark:text-green-400">
              {agent.price} $GREEN
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4 px-4">
          <Button className="w-full" onClick={() => onSelect(agent)}>
            View Agent
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EcoAgentCard;

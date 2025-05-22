
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Vote, ArrowRight, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GovernanceCardProps {
  onShowSneakPeek: () => void;
}

const GovernanceCard = ({ onShowSneakPeek }: GovernanceCardProps) => {
  const { toast } = useToast();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-dashed border-green-300 dark:border-green-700 shadow-sm relative group"
    >
      {/* Ribbon */}
      <div className="absolute -right-12 top-6 bg-amber-500 text-white px-12 py-1 transform rotate-45 shadow-md z-10">
        <Sparkles className="h-4 w-4 inline-block mr-1" />
        <span className="text-xs font-medium">Coming Soon</span>
      </div>
      
      <div className="p-6">
        <div className="p-3 bg-green-100/50 dark:bg-green-800/30 rounded-full w-14 h-14 flex items-center justify-center mb-4">
          <Vote className="h-7 w-7 text-green-600/80 dark:text-green-400/80" />
        </div>
        
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">DAO Governance</h3>
        
        <Badge variant="outline" className="bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 mb-4">
          Coming Q1 2026
        </Badge>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Use your $GREEN tokens to propose and vote on new eco-actions. Watch this space for our on-chain community forum!
        </p>
        
        <Button 
          variant="outline" 
          className="w-full border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-800/40"
          onClick={onShowSneakPeek}
        >
          Get a Sneak Peek
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default GovernanceCard;

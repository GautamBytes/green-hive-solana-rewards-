
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { X, Sparkles, ArrowRight } from "lucide-react";

const WaitlistBanner = () => {
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when new features are available",
      });
      
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-b border-green-200 dark:border-green-700"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
            <p className="text-sm text-green-800 dark:text-green-200 font-medium">
              Help shape GreenTask's future → Join our waitlist
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 items-center">
            <form onSubmit={handleSubmit} className="flex flex-wrap sm:flex-nowrap gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full sm:w-auto min-w-[200px] text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button 
                type="submit" 
                size="sm"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Subscribing...' : 'Get Early Access'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsVisible(false)}
              className="ml-auto sm:ml-0"
            >
              <X className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WaitlistBanner;

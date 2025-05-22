
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Vote, ChevronLeft, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SneakPeekModalProps {
  open: boolean;
  onClose: () => void;
}

const SneakPeekModal = ({ open, onClose }: SneakPeekModalProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const slides = [
    {
      title: "Proposal Creation",
      description: "Create proposals for new eco-initiatives directly from your dashboard",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=3431&auto=format&fit=crop"
    },
    {
      title: "Token-Weighted Voting",
      description: "Use your $GREEN tokens to cast votes on community proposals",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2712&auto=format&fit=crop"
    },
    {
      title: "Impact Tracking",
      description: "See the real-world impact of proposals you've supported",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=4000&auto=format&fit=crop"
    }
  ];
  
  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-green-900 rounded-xl shadow-xl max-w-3xl w-full relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full hover:bg-black/10 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-gradient-to-br from-green-50 to-white dark:from-green-800 dark:to-green-900 p-6 md:p-8">
                <Badge variant="outline" className="mb-4 bg-amber-100/50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                  Sneak Peek
                </Badge>
                
                <h2 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-100 mb-2">
                  DAO Governance Portal
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Token-weighted voting is live on our Testnet—coming to Mainnet in Q1 2026!
                </p>
                
                <Tabs defaultValue="preview">
                  <TabsList>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="preview" className="mt-4 space-y-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      The GreenTask DAO governance portal will allow token holders to:
                    </p>
                    
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 bg-green-100 dark:bg-green-800 rounded-full p-1 mt-0.5">
                          <Vote className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Create and vote on eco-initiative proposals</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 bg-green-100 dark:bg-green-800 rounded-full p-1 mt-0.5">
                          <Vote className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Allocate community funds to impactful projects</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 bg-green-100 dark:bg-green-800 rounded-full p-1 mt-0.5">
                          <Vote className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">Participate in protocol governance decisions</span>
                      </li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="features" className="mt-4">
                    <div className="space-y-3">
                      <div className="bg-green-50 dark:bg-green-800/40 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 dark:text-green-300">On-Chain Voting</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">All votes are recorded transparently on Solana blockchain</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-800/40 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 dark:text-green-300">Delegation System</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Delegate your voting power to environmentalists you trust</p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-800/40 rounded-lg p-3">
                        <h4 className="font-medium text-green-800 dark:text-green-300">Community Treasury</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Community-controlled fund for environmental initiatives</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="w-full md:w-1/2 relative">
                {/* Carousel */}
                <div className="relative h-[300px] md:h-full overflow-hidden">
                  {slides.map((slide, index) => (
                    <div 
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        currentSlide === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img 
                        src={slide.image} 
                        alt={slide.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-white font-semibold mb-1">{slide.title}</h3>
                        <p className="text-white/80 text-sm">{slide.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Carousel controls */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="bg-black/30 hover:bg-black/50 text-white rounded-full" 
                      onClick={handlePrevSlide}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex space-x-1">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            currentSlide === index ? 'bg-white' : 'bg-white/50'
                          }`}
                          onClick={() => setCurrentSlide(index)}
                        />
                      ))}
                    </div>
                    
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="bg-black/30 hover:bg-black/50 text-white rounded-full" 
                      onClick={handleNextSlide}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-green-950 border-t border-gray-200 dark:border-green-800 flex justify-end">
              <Button onClick={onClose}>Close Preview</Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SneakPeekModal;

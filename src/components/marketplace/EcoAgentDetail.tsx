
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EcoAgent } from "@/types/EcoAgent";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, CreditCard, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface EcoAgentDetailProps {
  agent: EcoAgent | null;
  open: boolean;
  onClose: () => void;
}

const EcoAgentDetail = ({ agent, open, onClose }: EcoAgentDetailProps) => {
  const [stage, setStage] = useState<'details' | 'purchase' | 'success'>('details');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  
  const handlePurchase = () => {
    setStage('purchase');
  };
  
  const handleConfirmPurchase = () => {
    setStage('success');
    toast.success(`You've successfully purchased ${agent?.name}!`);
  };
  
  const handleClose = () => {
    setStage('details');
    setLocation('');
    setTime('');
    onClose();
  };
  
  const handleActivate = () => {
    if (!location) {
      toast.error("Please enter a location first");
      return;
    }
    
    toast.success(`${agent?.name} is analyzing the best route for your task!`);
  };
  
  if (!agent) return null;
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {stage === 'details' ? agent.name : 
             stage === 'purchase' ? 'Purchase Eco-Agent' : 
             'Purchase Successful'}
          </DialogTitle>
          <DialogDescription>
            {stage === 'details' ? `AI ${agent.category} assistant` : 
             stage === 'purchase' ? `Purchase ${agent.name} for ${agent.price} $GREEN` : 
             'Your Eco-Agent is ready to help'}
          </DialogDescription>
        </DialogHeader>
        
        {stage === 'details' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="rounded-lg overflow-hidden border border-green-100 dark:border-green-800">
                  <img 
                    src={agent.image} 
                    alt={agent.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Price:</span>
                    <span className="font-bold text-green-700 dark:text-green-400">{agent.price} $GREEN</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Rating:</span>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300 ml-1">{agent.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <Badge variant="outline" className="font-normal">
                      {agent.category}
                    </Badge>
                  </div>
                </div>
                
                <Button className="w-full mt-4" onClick={handlePurchase}>
                  Purchase for {agent.price} $GREEN
                </Button>
              </div>
              
              <div className="md:col-span-2">
                <Tabs defaultValue="about">
                  <TabsList className="mb-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg text-green-800 dark:text-green-300 mb-2">Description</h3>
                      <p className="text-gray-700 dark:text-gray-300">{agent.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-semibold text-lg text-green-800 dark:text-green-300 mb-2">Try it out</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Enter a location to get optimized eco-routes and tips
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Enter your task location</label>
                          <Input 
                            placeholder="e.g., Central Park, New York"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                        
                        {agent.category === "Scheduling" && (
                          <div>
                            <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">When do you plan to do this task?</label>
                            <Input 
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                            />
                          </div>
                        )}
                        
                        <Button onClick={handleActivate}>
                          Activate Agent
                        </Button>
                      </div>
                      
                      {location && (
                        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                          <p className="font-medium text-green-800 dark:text-green-300 mb-1">Agent Response:</p>
                          <p className="text-sm text-green-700 dark:text-green-400">
                            {agent.category === "Navigation" ? 
                              `For ${location}, I recommend taking the eco-friendly route via public transportation. Take the subway line 2 to Central Park Station, then walk 0.4 miles to reduce your carbon footprint.` :
                              agent.category === "Scheduling" ? 
                              `The best time for eco-activities at ${location} is early morning around 8-9 AM when there's less traffic and pollution. If you go at ${time}, expect moderate crowds.` :
                              `Based on data analysis, ${location} has seen a 12% improvement in air quality this month compared to last year. Your participation will contribute to this positive trend.`
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg text-green-800 dark:text-green-300 mb-2">Key Features</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-start p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                          <div className="mr-3 mt-0.5 text-green-600 dark:text-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-300">AI-Powered {agent.category}</h4>
                            <p className="text-sm text-green-700 dark:text-green-400">Uses advanced algorithms to optimize your eco-actions</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                          <div className="mr-3 mt-0.5 text-green-600 dark:text-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-300">Real-time Updates</h4>
                            <p className="text-sm text-green-700 dark:text-green-400">Get the latest information about local conditions</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                          <div className="mr-3 mt-0.5 text-green-600 dark:text-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-300">Personalized Advice</h4>
                            <p className="text-sm text-green-700 dark:text-green-400">Customized recommendations based on your location and preferences</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                          <div className="mr-3 mt-0.5 text-green-600 dark:text-green-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-medium text-green-800 dark:text-green-300">On-Chain Verification</h4>
                            <p className="text-sm text-green-700 dark:text-green-400">All agent actions are logged on Solana for transparency</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg text-green-800 dark:text-green-300">User Reviews</h3>
                        <Badge variant="outline">{agent.rating.toFixed(1)} / 5.0</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        {[
                          { name: "Sarah K.", rating: 5, comment: "This agent saved me so much time finding the best eco-friendly routes!" },
                          { name: "Michael T.", rating: 4, comment: "Very useful for planning my recycling trips, but could use more detail on traffic conditions." },
                          { name: "Jamie L.", rating: 5, comment: "I've completed twice as many tasks since getting this agent. Worth every $GREEN!" },
                        ].map((review, index) => (
                          <div key={index} className="border border-green-100 dark:border-green-800 rounded-lg p-3">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium text-green-800 dark:text-green-300">{review.name}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? 'text-amber-500' : 'text-gray-300 dark:text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </>
        )}
        
        {stage === 'purchase' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <img 
                src={agent.image} 
                alt={agent.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-300">{agent.name}</h3>
                <p className="text-sm text-green-600 dark:text-green-400">AI {agent.category} Assistant</p>
              </div>
              <div className="ml-auto font-bold text-green-700 dark:text-green-400">
                {agent.price} $GREEN
              </div>
            </div>
            
            <div className="border border-green-100 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-medium text-green-800 dark:text-green-300 mb-3">Purchase Summary</h4>
              
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Agent price</span>
                <span className="text-gray-700 dark:text-gray-300">{agent.price} $GREEN</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Network fee</span>
                <span className="text-gray-700 dark:text-gray-300">0.001 SOL</span>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between font-bold">
                <span className="text-green-800 dark:text-green-300">Total</span>
                <span className="text-green-700 dark:text-green-400">{agent.price} $GREEN</span>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-green-600 dark:text-green-400 mb-2">Your wallet balance:</p>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">
                    <CreditCard className="h-4 w-4 inline-block mr-1" /> $GREEN Tokens
                  </span>
                  <span className="font-medium">120.5 $GREEN</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
              <Button onClick={handleConfirmPurchase}>Confirm Purchase</Button>
            </div>
          </div>
        )}
        
        {stage === 'success' && (
          <div className="py-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.6 
              }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-30"></div>
                <div className="relative rounded-full bg-green-100 p-4 dark:bg-green-900">
                  <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-2">
                Purchase Successful!
              </h3>
              <p className="text-center text-green-600 dark:text-green-400 mb-6">
                {agent.name} has been added to your account
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 flex items-center gap-4 mb-6 w-full max-w-md">
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-300">{agent.name}</h4>
                  <p className="text-sm text-green-600 dark:text-green-400">AI {agent.category} Assistant</p>
                </div>
              </div>
              
              <div className="flex justify-center gap-3 mt-3 w-full">
                <Button variant="outline" onClick={handleClose}>
                  Close
                </Button>
                <Button onClick={() => {
                  handleClose();
                  toast.success("Agent activated and ready to use!");
                }}>
                  Start Using Now
                </Button>
              </div>
            </motion.div>
          </div>
        )}
        
        {stage === 'details' && (
          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EcoAgentDetail;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EcoAgent } from "@/types/EcoAgent";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { toast } from "@/components/ui/sonner";

interface MarketPlaceProps {
  isConnected: boolean;
}

const MarketPlace = ({ isConnected }: MarketPlaceProps) => {
  const { connected } = useWallet();
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  // Mock data
  const mockAgents: EcoAgent[] = [
    {
      id: "agent-1",
      name: "RecycleBot",
      description: "Helps identify recyclable items and suggests optimal recycling methods.",
      price: 25,
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800&auto=format&fit=crop",
      category: "recycling",
      rating: 4.7
    },
    {
      id: "agent-2",
      name: "CleanRouteAI",
      description: "Optimizes routes for beach and park cleanups based on trash density patterns.",
      price: 40,
      image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=800&auto=format&fit=crop",
      category: "cleanup",
      rating: 4.9
    },
    {
      id: "agent-3",
      name: "TreeMapper",
      description: "Identifies optimal locations for planting trees based on soil conditions and sunlight.",
      price: 35,
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop",
      category: "planting",
      rating: 4.5
    },
    {
      id: "agent-4",
      name: "WasteWizard",
      description: "Analyzes your waste and suggests ways to reduce, reuse, and properly dispose of items.",
      price: 20,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      category: "waste",
      rating: 4.2
    }
  ];

  const handlePurchase = (agent: EcoAgent) => {
    toast.success(`${agent.name} purchased for ${agent.price} $GREEN tokens!`);
  };

  const filteredAgents = filter === "all" 
    ? mockAgents 
    : mockAgents.filter(agent => agent.category === filter);

  if (!connected && !isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-6">Connect your wallet to access the marketplace</h2>
        <p className="text-green-600 dark:text-green-400 mb-6 max-w-lg text-center">
          Browse and purchase AI eco-agents that help you optimize your environmental actions and maximize your impact.
        </p>
        <WalletMultiButton className="bg-green-600 hover:bg-green-700 text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-300">Eco-Agent Marketplace</h2>
          <p className="text-green-600 dark:text-green-400">AI assistants to optimize your environmental impact</p>
        </div>
        <div className="bg-green-100 dark:bg-green-800/50 px-4 py-2 rounded-lg text-green-800 dark:text-green-300 font-semibold">
          Your balance: 120.5 $GREEN
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
        <TabsList className="mb-6 bg-green-100 dark:bg-green-800/30">
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="recycling">Recycling</TabsTrigger>
          <TabsTrigger value="cleanup">Cleanup</TabsTrigger>
          <TabsTrigger value="planting">Planting</TabsTrigger>
          <TabsTrigger value="waste">Waste Management</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredAgents.map((agent) => (
              <Card 
                key={agent.id} 
                className="border-green-200 dark:border-green-800 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg dark:hover:shadow-green-900/30"
              >
                <div 
                  className="h-48 bg-cover bg-center relative" 
                  style={{ backgroundImage: `url(${agent.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 hover:bg-green-200 dark:hover:bg-green-700">
                          {agent.category}
                        </Badge>
                      </div>
                      <div className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {agent.price} $GREEN
                      </div>
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardDescription className="text-green-600 dark:text-green-400">
                      Rating: {agent.rating}/5
                    </CardDescription>
                    <Button 
                      variant="link" 
                      onClick={() => setShowDetails(showDetails === agent.id ? null : agent.id)} 
                      className="text-green-600 dark:text-green-400 p-0"
                    >
                      {showDetails === agent.id ? "Hide Details" : "View Details"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="py-2 flex-1">
                  <p className="text-sm text-green-700 dark:text-green-300">{agent.description}</p>
                  
                  {showDetails === agent.id && (
                    <div className="mt-4 border-t border-green-100 dark:border-green-800 pt-4 space-y-3">
                      <h4 className="font-semibold text-green-800 dark:text-green-300">Agent Capabilities:</h4>
                      <ul className="list-disc pl-5 text-sm text-green-700 dark:text-green-400 space-y-1">
                        <li>Real-time environmental data processing</li>
                        <li>Personalized sustainability recommendations</li>
                        <li>Integration with GreenTask mission system</li>
                        <li>Token rewards optimization strategies</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="bg-green-50 dark:bg-green-900/30 border-t border-green-100 dark:border-green-800">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                    onClick={() => handlePurchase(agent)}
                  >
                    Purchase Agent
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketPlace;

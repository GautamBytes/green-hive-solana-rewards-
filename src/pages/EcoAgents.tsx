
import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Sparkles } from "lucide-react";
import EcoAgentCard from "@/components/marketplace/EcoAgentCard";
import EcoAgentDetail from "@/components/marketplace/EcoAgentDetail";
import { EcoAgent } from "@/types/EcoAgent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

const EcoAgents = () => {
  const { connected } = useWallet();
  const [selectedAgent, setSelectedAgent] = useState<EcoAgent | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('all');
  const [sortValue, setSortValue] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState({
    navigation: true,
    scheduling: true,
    analytics: true
  });
  
  // Mock eco-agents data
  const mockAgents: EcoAgent[] = [
    {
      id: "agent-1",
      name: "RouteMaster 3000",
      description: "Find the most eco-friendly routes for your tasks. Optimize your path to reduce emissions and save time.",
      price: 75,
      image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=800&auto=format&fit=crop",
      category: "Navigation",
      rating: 4.8
    },
    {
      id: "agent-2",
      name: "EcoScheduler",
      description: "Smart scheduling assistant that plans your eco-tasks for optimal environmental impact and efficiency.",
      price: 60,
      image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=800&auto=format&fit=crop",
      category: "Scheduling",
      rating: 4.5
    },
    {
      id: "agent-3",
      name: "ImpactAnalyzer",
      description: "Track and visualize your environmental contributions with detailed analytics and reports.",
      price: 90,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
      category: "Analytics",
      rating: 4.7
    },
    {
      id: "agent-4",
      name: "GreenPathfinder",
      description: "Discover hidden eco-friendly locations and opportunities in your area. Perfect for avid environmentalists.",
      price: 85,
      image: "https://images.unsplash.com/photo-1498192467103-290f567eb3a3?w=800&auto=format&fit=crop",
      category: "Navigation",
      rating: 4.2
    },
    {
      id: "agent-5",
      name: "TaskTimer Pro",
      description: "Advanced scheduling tool with weather integration to plan your outdoor eco-activities for optimal conditions.",
      price: 70,
      image: "https://images.unsplash.com/photo-1584277261846-c6a1672ed979?w=800&auto=format&fit=crop",
      category: "Scheduling",
      rating: 4.4
    },
    {
      id: "agent-6",
      name: "EcoMetrics",
      description: "Comprehensive analytics suite that calculates your exact environmental impact down to the gram of CO2 saved.",
      price: 120,
      image: "https://images.unsplash.com/photo-1548407260-da850faa41e3?w=800&auto=format&fit=crop",
      category: "Analytics",
      rating: 4.9
    },
    {
      id: "agent-7",
      name: "UrbanForester",
      description: "Specialized agent for urban tree planting that helps you identify optimal locations and species for your area.",
      price: 95,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop",
      category: "Navigation",
      rating: 4.6
    },
    {
      id: "agent-8",
      name: "WasteWise",
      description: "Recycling assistant that helps you sort waste correctly and find proper disposal methods for tricky items.",
      price: 50,
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop",
      category: "Analytics",
      rating: 4.3
    }
  ];
  
  const handleOpenAgentDetail = (agent: EcoAgent) => {
    setSelectedAgent(agent);
    setIsDetailOpen(true);
  };
  
  const handleCloseAgentDetail = () => {
    setIsDetailOpen(false);
  };
  
  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };
  
  const handleSortChange = (value: string) => {
    setSortValue(value);
  };
  
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Filter and sort agents
  const filteredAgents = mockAgents.filter(agent => {
    if (filterValue === 'all') return true;
    if (filterValue === 'topRated') return agent.rating >= 4.5;
    if (filterValue === 'affordable') return agent.price <= 75;
    return true;
  }).filter(agent => {
    if (agent.category === "Navigation" && !selectedCategories.navigation) return false;
    if (agent.category === "Scheduling" && !selectedCategories.scheduling) return false;
    if (agent.category === "Analytics" && !selectedCategories.analytics) return false;
    return agent.price >= priceRange[0] && agent.price <= priceRange[1];
  });
  
  // Sort agents
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (sortValue === 'popular') {
      return b.rating - a.rating;
    }
    if (sortValue === 'priceLow') {
      return a.price - b.price;
    }
    if (sortValue === 'priceHigh') {
      return b.price - a.price;
    }
    return 0;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isConnected={connected} onConnect={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-2">Eco-Agents Marketplace</h1>
            <p className="text-green-600 dark:text-green-400">
              Purchase AI agents to optimize your environmental impact
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Agents</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="text-xs font-normal text-gray-500 pt-2">Categories</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.navigation}
                  onCheckedChange={() => handleCategoryToggle('navigation')}
                >
                  Navigation
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.scheduling}
                  onCheckedChange={() => handleCategoryToggle('scheduling')}
                >
                  Scheduling
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.analytics}
                  onCheckedChange={() => handleCategoryToggle('analytics')}
                >
                  Analytics
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-normal text-gray-500">Sort By</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleSortChange('popular')}>
                  <Sparkles className="h-4 w-4 mr-2" /> Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('priceLow')}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('priceHigh')}>
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search eco-agents..."
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="mb-6 flex flex-wrap gap-2">
          <Button 
            variant={filterValue === 'all' ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFilterChange('all')}
          >
            All Agents
          </Button>
          <Button 
            variant={filterValue === 'topRated' ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange('topRated')}
          >
            Top Rated
          </Button>
          <Button 
            variant={filterValue === 'affordable' ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange('affordable')}
          >
            75 $GREEN or less
          </Button>
        </div>
        
        {sortedAgents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedAgents.map((agent) => (
              <EcoAgentCard
                key={agent.id}
                agent={agent}
                onSelect={handleOpenAgentDetail}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-green-900/20 rounded-lg border border-gray-200 dark:border-green-800">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 16h.01M12 13a1 1 0 100-2 1 1 0 000 2z" />
                <circle cx="12" cy="12" r="10" strokeWidth="1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Agents Found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              No eco-agents match your current filter criteria. Try adjusting your filters to see more options.
            </p>
          </div>
        )}
        
        <Separator className="my-12" />
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Want to build your own eco-agent?</h2>
          <p className="text-green-600 dark:text-green-400 mb-4">
            Developers can create and sell custom eco-agents on our marketplace
          </p>
          <Button variant="outline">Register as Developer</Button>
        </div>
      </div>
      
      <EcoAgentDetail
        agent={selectedAgent}
        open={isDetailOpen}
        onClose={handleCloseAgentDetail}
      />
    </div>
  );
};

export default EcoAgents;

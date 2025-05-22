
import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, Search, MapPin, Calendar } from "lucide-react";
import TaskMap from "@/components/tasks/TaskMap";
import TaskCard from "@/components/tasks/TaskCard";
import TaskDetail from "@/components/tasks/TaskDetail";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Define task type to match the TaskCardProps interface
type TaskStatus = 'available' | 'inProgress' | 'completed' | 'verified';

interface Task {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  location: string;
  distance: string;
  coordinates?: string;
  status: TaskStatus;
  reward: number;
  imageUrl: string;
  category: string;
}

const Tasks = () => {
  const { connected } = useWallet();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('all');
  const [sortValue, setSortValue] = useState('proximity');
  const [selectedCategories, setSelectedCategories] = useState({
    recycling: true,
    treePlanting: true,
    cleanup: true,
    education: true
  });

  // Mock task data - in a real app, this would come from an API
  const mockTasks: Task[] = [
    {
      id: "task-1",
      type: "Recycling",
      title: "Plastic Clean-up @ Central Park",
      description: "Help clean up plastic waste at Central Park. Collect at least 5kg of plastic waste and document your efforts. Your contribution will help make the park cleaner and safer for wildlife.",
      date: "Sat, May 25, 2025",
      location: "Central Park, New York",
      distance: "0.8 mi",
      coordinates: "40.785091, -73.968285",
      status: 'available',
      reward: 50,
      imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&auto=format&fit=crop",
      category: "Recycling"
    },
    {
      id: "task-2",
      type: "Tree Planting",
      title: "Community Tree Planting",
      description: "Join our community tree planting initiative! Plant at least one tree in the designated area and document the process. We'll provide the saplings and tools.",
      date: "Sun, May 26, 2025",
      location: "Riverside Park, New York",
      distance: "1.2 mi",
      status: 'available',
      reward: 75,
      imageUrl: "https://images.unsplash.com/photo-1513764822893-5a29befa1a63?w=800&auto=format&fit=crop",
      category: "Tree Planting"
    },
    {
      id: "task-3",
      type: "Beach Cleanup",
      title: "Beach Cleanup Drive",
      description: "Help preserve our coastal ecosystem by participating in our beach cleanup drive. Collect trash, document your findings, and help protect marine life.",
      date: "Sat, Jun 1, 2025",
      location: "Coney Island Beach, Brooklyn",
      distance: "5.3 mi",
      status: 'available',
      reward: 60,
      imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&auto=format&fit=crop",
      category: "Cleanup"
    },
    {
      id: "task-4",
      type: "Recycling",
      title: "Electronics Recycling Event",
      description: "Bring your old electronics for proper recycling. Document what you're recycling, and we'll ensure it's handled sustainably.",
      date: "Wed, Jun 5, 2025",
      location: "Community Center, Queens",
      distance: "3.7 mi",
      status: 'available',
      reward: 45,
      imageUrl: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?w=800&auto=format&fit=crop",
      category: "Recycling"
    },
    {
      id: "task-5",
      type: "Education",
      title: "Eco Workshop for Kids",
      description: "Help us educate the next generation! Assist in running a workshop teaching kids about sustainability and environmental protection.",
      date: "Sat, Jun 8, 2025",
      location: "Public Library, Manhattan",
      distance: "1.9 mi",
      status: 'available',
      reward: 65,
      imageUrl: "https://images.unsplash.com/photo-1544717305-996b815c338c?w=800&auto=format&fit=crop",
      category: "Education"
    },
    {
      id: "task-6",
      type: "Tree Planting",
      title: "Urban Garden Development",
      description: "Help transform an abandoned lot into a thriving urban garden. Plant vegetables, herbs, and flowers to create a green space for the community.",
      date: "Sun, Jun 9, 2025",
      location: "Community Garden, Bronx",
      distance: "4.5 mi",
      status: 'available',
      reward: 80,
      imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop",
      category: "Tree Planting"
    }
  ];

  const handleOpenTaskDetail = (task: Task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  const handleCloseTaskDetail = () => {
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

  // Filter and sort tasks
  const filteredTasks = mockTasks.filter(task => {
    if (filterValue === 'all') return true;
    if (filterValue === 'highReward') return task.reward >= 60;
    if (filterValue === 'nearby') return parseFloat(task.distance) <= 2;
    return true;
  }).filter(task => {
    if (task.category === "Recycling" && !selectedCategories.recycling) return false;
    if (task.category === "Tree Planting" && !selectedCategories.treePlanting) return false;
    if (task.category === "Cleanup" && !selectedCategories.cleanup) return false;
    if (task.category === "Education" && !selectedCategories.education) return false;
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortValue === 'proximity') {
      // Fix Type Error: Convert string distances to numbers before arithmetic operations
      return parseFloat(a.distance) - parseFloat(b.distance);
    }
    if (sortValue === 'reward') {
      return b.reward - a.reward;
    }
    if (sortValue === 'date') {
      // Convert dates to timestamps for comparison
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isConnected={connected} onConnect={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-2">Eco Tasks</h1>
            <p className="text-green-600 dark:text-green-400">
              Complete environmental tasks to earn $GREEN tokens and make a real impact
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Tabs defaultValue="map" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter Tasks</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="text-xs font-normal text-gray-500 pt-2">Categories</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.recycling}
                  onCheckedChange={() => handleCategoryToggle('recycling')}
                >
                  Recycling
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.treePlanting}
                  onCheckedChange={() => handleCategoryToggle('treePlanting')}
                >
                  Tree Planting
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.cleanup}
                  onCheckedChange={() => handleCategoryToggle('cleanup')}
                >
                  Cleanup
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedCategories.education}
                  onCheckedChange={() => handleCategoryToggle('education')}
                >
                  Education
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-normal text-gray-500">Sort By</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleSortChange('proximity')}>
                  <MapPin className="h-4 w-4 mr-2" /> Distance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('reward')}>
                  <Badge variant="outline" className="h-4 mr-2">$</Badge> Reward Amount
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange('date')}>
                  <Calendar className="h-4 w-4 mr-2" /> Date
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search eco tasks..."
              className="pl-9"
            />
          </div>
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-white dark:bg-green-900 cursor-pointer hover:bg-gray-100 dark:hover:bg-green-800/60" onClick={() => handleFilterChange('all')}>
            All Tasks
          </Badge>
          <Badge variant="outline" className="bg-white dark:bg-green-900 cursor-pointer hover:bg-gray-100 dark:hover:bg-green-800/60" onClick={() => handleFilterChange('nearby')}>
            Nearby (&lt;2mi)
          </Badge>
          <Badge variant="outline" className="bg-white dark:bg-green-900 cursor-pointer hover:bg-gray-100 dark:hover:bg-green-800/60" onClick={() => handleFilterChange('highReward')}>
            High Reward (60+ $GREEN)
          </Badge>
        </div>
        
        <Tabs defaultValue="map" className="w-full">
          <TabsContent value="map" className="mt-0">
            <TaskMap tasks={sortedTasks} />
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="h-4"></div> {/* Spacer */}
          </TabsContent>
        </Tabs>
        
        {sortedTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClick={() => handleOpenTaskDetail(task)}
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
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Tasks Found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              No eco tasks match your current filter criteria. Try adjusting your filters or check back later for new tasks.
            </p>
          </div>
        )}
        
        <Separator className="my-12" />
        
        <div className="text-center">
          <h2 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-2">Want to create an eco task?</h2>
          <p className="text-green-600 dark:text-green-400 mb-4">
            Organizations can create custom eco tasks for the community
          </p>
          <Button variant="outline">Register as Organization</Button>
        </div>
      </div>
      
      <TaskDetail
        task={selectedTask}
        open={isDetailOpen}
        onClose={handleCloseTaskDetail}
      />
    </div>
  );
};

export default Tasks;

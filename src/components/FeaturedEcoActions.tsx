
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { EcoActionCard } from '@/components/EcoActionCard';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

// Sample eco actions data
const ecoActions = [
  {
    id: '1',
    title: 'Beach Cleanup Marathon',
    description: 'Join us for a day dedicated to cleaning up our beautiful coastline and protecting marine life.',
    date: 'June 15, 2025',
    location: 'Santa Monica Beach',
    participants: 85,
    impact: 'Remove 500+ lbs of waste',
    reward: 250,
    category: 'cleanup',
    image: 'https://images.unsplash.com/photo-1618477202872-8e7e76c11053?q=80&w=800&auto=format',
    status: 'upcoming' as const,
  },
  {
    id: '2',
    title: 'Community Tree Planting',
    description: 'Help us green our city by planting native trees in local parks and neighborhoods.',
    date: 'May 28, 2025',
    location: 'Greenfield Park',
    participants: 42,
    impact: '100 new trees',
    reward: 300,
    category: 'planting',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format',
    status: 'active' as const,
  },
  {
    id: '3',
    title: 'Plastic-Free Workshop',
    description: 'Learn how to reduce plastic waste in your daily life and make eco-friendly alternatives.',
    date: 'June 3, 2025',
    location: 'Community Center',
    participants: 28,
    impact: 'Educate 30+ households',
    reward: 150,
    category: 'education',
    image: 'https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?q=80&w=800&auto=format',
    status: 'active' as const,
  },
  {
    id: '4',
    title: 'Urban Garden Initiative',
    description: 'Create sustainable urban gardens in unused spaces to promote local food production.',
    date: 'June 10, 2025',
    location: 'Downtown Community Space',
    participants: 35,
    impact: '200 sq ft garden space',
    reward: 280,
    category: 'planting',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=800&auto=format',
    status: 'active' as const,
  },
  {
    id: '5',
    title: 'E-Waste Collection Drive',
    description: 'Safely dispose of electronic waste and ensure proper recycling of valuable materials.',
    date: 'June 22, 2025',
    location: 'City Hall Parking Lot',
    participants: 15,
    impact: 'Recycle 1000+ lbs e-waste',
    reward: 200,
    category: 'recycling',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format',
    status: 'upcoming' as const,
  },
  {
    id: '6',
    title: 'River Conservation Project',
    description: 'Help restore and protect our local watershed through cleanup and monitoring activities.',
    date: 'July 5, 2025',
    location: 'Riverfront Park',
    participants: 52,
    impact: 'Protect 5 miles of riverbank',
    reward: 320,
    category: 'conservation',
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=800&auto=format',
    status: 'upcoming' as const,
  },
];

const categoryFilters = [
  { value: 'all', label: 'All Activities' },
  { value: 'cleanup', label: 'Cleanup' },
  { value: 'planting', label: 'Planting' },
  { value: 'recycling', label: 'Recycling' },
  { value: 'conservation', label: 'Conservation' },
  { value: 'education', label: 'Education' },
];

export const FeaturedEcoActions = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredActions = activeFilter === 'all'
    ? ecoActions
    : ecoActions.filter(action => action.category.toLowerCase() === activeFilter);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-1">Featured Eco Actions</h2>
            <p className="text-muted-foreground">Join community-driven environmental activities</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowFilters(!showFilters)}
              className="border-green-200 dark:border-green-700"
            >
              {showFilters ? <X className="h-4 w-4 mr-1" /> : <Filter className="h-4 w-4 mr-1" />}
              {showFilters ? "Hide Filters" : "Filter"}
            </Button>
            
            <Button variant="secondary" size="sm">View All</Button>
          </div>
        </div>
        
        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <div className="flex flex-wrap gap-2">
              {categoryFilters.map(filter => (
                <Button
                  key={filter.value}
                  variant={activeFilter === filter.value ? "eco" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.value)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto"
        >
          <CarouselContent className="-ml-4">
            {filteredActions.map((action) => (
              <CarouselItem key={action.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <EcoActionCard {...action} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="relative static translate-y-0 left-0" />
            <CarouselNext className="relative static translate-y-0 right-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

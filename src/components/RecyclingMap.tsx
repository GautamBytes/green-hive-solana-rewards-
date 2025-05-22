
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Locate } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { RecyclingCenter } from "@/types/RecyclingCenter";

const RecyclingMap = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recyclingCenters, setRecyclingCenters] = useState<RecyclingCenter[]>([]);
  
  const { toast } = useToast();

  // Mock data for recycling centers
  const mockCenters: RecyclingCenter[] = [
    {
      id: "center-1",
      name: "EcoRecycle Solutions",
      address: "123 Green St, San Francisco, CA 94110",
      distance: 1.2,
      types: ["Plastic", "Paper", "Glass", "Metal"],
      rating: 4.5,
      hours: "Mon-Sat: 8AM-6PM"
    },
    {
      id: "center-2",
      name: "GreenPath Recycling",
      address: "456 Oak Ave, San Francisco, CA 94117",
      distance: 2.4,
      types: ["Plastic", "Electronics", "Batteries"],
      rating: 4.7,
      hours: "Mon-Sun: 9AM-7PM"
    },
    {
      id: "center-3",
      name: "EarthFirst Materials",
      address: "789 Pine St, San Francisco, CA 94118",
      distance: 3.5,
      types: ["Plastic", "Glass", "Compost", "Textiles"],
      rating: 4.2,
      hours: "Mon-Fri: 7AM-5PM"
    },
    {
      id: "center-4",
      name: "Community Reuse Center",
      address: "101 Market St, San Francisco, CA 94103",
      distance: 4.1,
      types: ["Furniture", "Clothing", "Books", "Housewares"],
      rating: 4.8,
      hours: "Tue-Sun: 10AM-8PM"
    }
  ];

  const getUserLocation = () => {
    setIsLoading(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
          
          // In a real implementation, we would fetch actual recycling centers
          // Near the user's location. For the prototype, we'll use mock data
          setRecyclingCenters(mockCenters);
          
          toast({
            title: "Location detected",
            description: "Found 4 recycling centers near you",
            duration: 3000
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          toast({
            title: "Error detecting location",
            description: "Please try again or search by address",
            variant: "destructive",
            duration: 3000
          });
        }
      );
    } else {
      setIsLoading(false);
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a location",
        description: "Enter a city, zip code, or address to find recycling centers",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsLoading(true);
    
    // In a real implementation, we would call a geocoding API
    // and then search for recycling centers. For the prototype,
    // we'll just use the mock data.
    setTimeout(() => {
      setRecyclingCenters(mockCenters);
      setIsLoading(false);
      toast({
        title: "Search complete",
        description: `Found ${mockCenters.length} recycling centers near ${searchQuery}`,
        duration: 3000
      });
    }, 1500);
  };

  // Placeholder for a map - in a real implementation, this would be a Leaflet.js map
  const MapPlaceholder = () => (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 h-64 flex items-center justify-center">
      <div className="text-center">
        <MapPin className="h-10 w-10 text-green-500 mx-auto mb-2" />
        <p className="text-green-800 font-semibold">Map Placeholder</p>
        <p className="text-green-600 text-sm">
          In the actual implementation, this would be an interactive Leaflet.js map 
          showing recycling centers near the user's location
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-green-800">Find Recycling Centers Near You</CardTitle>
          <CardDescription>
            Locate nearby recycling facilities to properly dispose of different materials
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter location (city, zip code, or address)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Searching..." : "Search"}
            </Button>
            <Button 
              variant="outline" 
              onClick={getUserLocation} 
              disabled={isLoading}
            >
              <Locate className="mr-2 h-4 w-4" />
              {isLoading ? "Locating..." : "Near Me"}
            </Button>
          </div>
          
          <MapPlaceholder />
          
          <div className="space-y-4">
            <h3 className="font-semibold text-green-800">Recycling Centers</h3>
            
            {recyclingCenters.length > 0 ? (
              <div className="space-y-3">
                {recyclingCenters.map((center) => (
                  <div 
                    key={center.id} 
                    className="p-4 border border-green-100 rounded-lg bg-green-50"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold text-green-800">{center.name}</h4>
                        <p className="text-sm text-green-600">
                          {center.address}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {center.types.map((type, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-800 font-semibold">{center.distance} miles</div>
                        <div className="text-xs text-green-600">{center.hours}</div>
                        <div className="text-sm mt-1">Rating: {center.rating}/5</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-green-50 rounded-lg border border-green-100">
                <p className="text-green-600">
                  {isLoading 
                    ? "Searching for recycling centers..." 
                    : "Use the search or 'Near Me' button to find recycling centers"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecyclingMap;


import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// This is a placeholder component for the map. In a real implementation,
// you would integrate with a mapping library like Mapbox or Google Maps.
const TaskMap = ({ tasks = [] }) => {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-64 md:h-80 bg-gray-100 dark:bg-green-900/30 rounded-xl overflow-hidden mb-6">
      {/* Map placeholder */}
      <div ref={mapRef} className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l+3fb950(-73.99,40.73),pin-l+3fb950(-73.98,40.75),pin-l+3fb950(-73.96,40.71)/auto/500x300@2x?access_token=placeholder')] bg-cover bg-center">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-green-900/50 animate-pulse">
            <span className="text-gray-500 dark:text-green-300">Loading map...</span>
          </div>
        )}
      </div>
      
      {/* Map overlay with task pins */}
      <div className="absolute inset-0 pointer-events-none">
        {isLoaded && tasks.map((task, index) => (
          <motion.div 
            key={index}
            className="absolute"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ left: `${30 + (index * 15)}%`, top: `${20 + (index % 3) * 25}%` }}
          >
            <div className="relative">
              <MapPin className="h-8 w-8 text-green-600 drop-shadow-md" />
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-xs">+{task.reward}</Badge>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Map controls overlay */}
      <div className="absolute bottom-3 right-3 bg-white/80 dark:bg-green-800/80 backdrop-blur-sm rounded-lg p-2 flex gap-2 shadow-md">
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-green-700 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-green-200"><path d="M12 12V19M12 19H5M12 19H19"></path><path d="M12 12V5M12 5H19M12 5H5"></path></svg>
        </button>
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-green-700 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-green-200"><path d="M12 5V19"></path><path d="M19 12H5"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default TaskMap;

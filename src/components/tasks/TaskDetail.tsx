
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { MapPin, Calendar, Camera, Upload, CreditCard, Clock, Check, Loader, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface TaskDetailProps {
  task: {
    id: string;
    type: string;
    title: string;
    description: string;
    date: string;
    location: string;
    coordinates?: string;
    status: string;
    reward: number;
    imageUrl: string;
    category: string;
  } | null;
  open: boolean;
  onClose: () => void;
}

const TaskDetail = ({ task, open, onClose }: TaskDetailProps) => {
  const [stage, setStage] = useState<'details' | 'camera' | 'preview' | 'processing' | 'success'>('details');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [geolocation, setGeolocation] = useState<{lat: number, lng: number} | null>(null);
  const [timestamp, setTimestamp] = useState<string>('');
  
  const handleStartTask = () => {
    // In a real app, we'd request camera/location permissions first
    setStage('camera');
    setTimestamp(new Date().toLocaleTimeString());
    
    // Simulate getting geolocation data
    navigator.geolocation?.getCurrentPosition(
      (position) => {
        setGeolocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast.error("Could not access location. Please enable location services.");
      }
    );
  };
  
  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhotoUrl(event.target?.result as string);
        setStage('preview');
        // Update timestamp when photo is uploaded
        setTimestamp(new Date().toLocaleTimeString());
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleConfirmUpload = () => {
    setStage('processing');
    
    // Simulate blockchain verification process
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStage('success');
          }, 500);
        }
        
        return newProgress;
      });
    }, 200);
  };
  
  const handleClose = () => {
    // Reset state
    setStage('details');
    setPhotoUrl(null);
    setProgress(0);
    setGeolocation(null);
    setTimestamp('');
    onClose();
  };
  
  const handleGetDirections = () => {
    // In a real app, this would open maps app or provide directions
    window.open(`https://maps.google.com/?q=${task?.location}`, '_blank');
  };
  
  const renderStageContent = () => {
    switch (stage) {
      case 'camera':
        return (
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-green-900/30 rounded-lg p-8 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-green-700">
              <Camera className="h-12 w-12 text-gray-400 dark:text-green-600 mb-3" />
              <p className="text-center text-gray-600 dark:text-green-400">Take a photo or upload one from your device</p>
              <div className="flex gap-3 mt-4">
                <Button variant="outline" onClick={() => toast.info("Camera functionality would open here")}>
                  <Camera className="h-4 w-4 mr-2" /> Take Photo
                </Button>
                <Button variant="secondary">
                  <label className="cursor-pointer flex items-center">
                    <Upload className="h-4 w-4 mr-2" /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUploadPhoto}
                    />
                  </label>
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  {geolocation ? 
                    `${geolocation.lat.toFixed(4)}, ${geolocation.lng.toFixed(4)}` : 
                    "Location data will be captured"
                  }
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{timestamp || new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        );
        
      case 'preview':
        return (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={photoUrl || ''} 
                alt="Task proof" 
                className="w-full h-64 object-cover rounded-lg" 
              />
              {/* Enhanced overlay with more prominent information */}
              <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-black/70 to-transparent p-3">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{timestamp}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">
                      {geolocation ? 
                        `${geolocation.lat.toFixed(5)}, ${geolocation.lng.toFixed(5)}` : 
                        "Location data unavailable"
                      }
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Verification tag */}
              <div className="absolute bottom-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-md flex items-center">
                <Check className="h-3 w-3 mr-1" /> Ready for verification
              </div>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handleConfirmUpload} 
                className="px-8 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" /> Confirm & Upload to Blockchain
              </Button>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              Your photo and location data will be securely verified on the Solana blockchain
            </p>
          </div>
        );
        
      case 'processing':
        return (
          <div className="py-8 space-y-6">
            <div className="flex flex-col items-center justify-center">
              <Loader className="h-12 w-12 text-green-600 animate-spin mb-4" />
              <h3 className="text-xl font-medium text-green-800 dark:text-green-300">On-Chain Verification</h3>
              <p className="text-green-600 dark:text-green-400 text-center mt-2">
                Submitting your eco-task proof to the Solana blockchain...
              </p>
            </div>
            <div className="relative">
              <Progress 
                value={progress} 
                className="h-2 w-full max-w-md mx-auto"
                indicatorColor="bg-gradient-to-r from-green-400 to-green-600" 
              />
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                {progress < 30 ? "Processing image..." : 
                 progress < 60 ? "Verifying location data..." : 
                 progress < 90 ? "Creating blockchain transaction..." :
                 "Finalizing proof..."}
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src={photoUrl || ''} 
                alt="Task proof" 
                className="w-32 h-32 object-cover rounded-md opacity-50 border border-green-200"
              />
            </div>
          </div>
        );
        
      case 'success':
        return (
          <div className="py-8">
            <AnimatePresence>
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
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.8, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop"
                    }}
                    className="absolute inset-0 rounded-full bg-green-400 opacity-30"
                  />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 2,
                      ease: "linear",
                      repeat: Infinity
                    }}
                    className="absolute inset-0 rounded-full border-2 border-green-400 border-t-transparent opacity-30"
                  />
                  <div className="relative rounded-full bg-green-100 p-4 dark:bg-green-900">
                    <Check className="h-16 w-16 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-2">
                  Proof Verified!
                </h3>
                <p className="text-center text-green-600 dark:text-green-400 mb-6">
                  Your eco-action has been verified on the Solana blockchain
                </p>
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 flex gap-4 items-center mb-6 relative overflow-hidden"
                >
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ 
                      duration: 1, 
                      ease: "easeInOut",
                      delay: 0.2,
                      repeat: 3,
                      repeatType: "loop",
                      repeatDelay: 1
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200/50 to-transparent"
                  />
                  <div className="bg-green-500 rounded-full p-3 relative z-10">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-gray-600 dark:text-green-300">You earned</p>
                    <motion.p 
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ 
                        delay: 0.7,
                        duration: 0.6,
                        times: [0, 0.5, 1]
                      }}
                      className="text-2xl font-bold text-green-700 dark:text-green-400"
                    >
                      +{task?.reward} $GREEN
                    </motion.p>
                  </div>
                </motion.div>
                
                <div className="flex justify-center gap-3 mt-3 w-full">
                  <Button variant="outline" onClick={handleClose}>
                    Close
                  </Button>
                  <Button 
                    onClick={() => window.location.href = "/dashboard"}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Award className="h-4 w-4 mr-2" /> View My Impact
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        );
        
      case 'details':
      default:
        return (
          <>
            <img 
              src={task?.imageUrl} 
              alt={task?.title} 
              className="w-full h-56 object-cover rounded-lg mb-4" 
            />
            <div className="flex justify-between mb-4">
              <Badge variant={task?.category === "Recycling" ? "success" : "eco"} className="text-sm">
                {task?.category}
              </Badge>
              <Badge variant="legendary" className="text-sm">
                +{task?.reward} $GREEN
              </Badge>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {task?.description || "No description available"}
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{task?.date}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{task?.location}</span>
                {task?.coordinates && <span className="ml-2 text-xs text-gray-500">({task.coordinates})</span>}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-2">
              <Button variant="outline" onClick={handleGetDirections}>
                Get Directions
              </Button>
              <Button 
                onClick={handleStartTask}
                className="bg-green-600 hover:bg-green-700"
              >
                Start Task
              </Button>
            </div>
          </>
        );
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>
            {stage === 'details' ? task.type : 
             stage === 'camera' ? 'Take a photo to complete this task' :
             stage === 'preview' ? 'Verify your submission' :
             stage === 'processing' ? 'Processing your submission' :
             'Task Complete!'}
          </DialogDescription>
        </DialogHeader>
        
        {renderStageContent()}
        
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

export default TaskDetail;

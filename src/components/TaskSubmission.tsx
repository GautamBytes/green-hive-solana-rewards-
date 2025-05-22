
import { useState, useRef } from "react";
import { Camera, Upload, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface TaskSubmissionProps {
  isConnected: boolean;
}

const TaskSubmission = ({ isConnected }: TaskSubmissionProps) => {
  const [taskType, setTaskType] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [isDetecting, setIsDetecting] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [verificationResult, setVerificationResult] = useState<{verified: boolean, message: string} | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setVerificationResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lng: longitude });
          setLocation(`Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`);
          setIsDetecting(false);
          toast({
            title: "Location detected",
            description: `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`,
            duration: 3000
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsDetecting(false);
          toast({
            title: "Error detecting location",
            description: "Please try again or enter your location manually",
            variant: "destructive",
            duration: 3000
          });
        }
      );
    } else {
      setIsDetecting(false);
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const verifyImage = () => {
    // Mock AI verification
    setIsSubmitting(true);
    
    setTimeout(() => {
      const isVerified = Math.random() > 0.3; // 70% chance of success for demo
      setVerificationResult({
        verified: isVerified,
        message: isVerified 
          ? "Image verification successful! Task contains valid eco-action." 
          : "Verification failed. Please ensure the image clearly shows the eco-action."
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!taskType || !image || !description || !location) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    // Verify image first
    if (!verificationResult) {
      verifyImage();
      return;
    }
    
    if (!verificationResult.verified) {
      toast({
        title: "Cannot submit task",
        description: "Image verification failed. Please try again with a clearer image.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }

    // Mock task submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Task submitted successfully!",
        description: `Your eco-action has been recorded, and $GREEN tokens will be credited once it's processed.`,
        duration: 5000
      });
      
      // Reset form
      setTaskType("");
      setImage(null);
      setDescription("");
      setLocation("");
      setCoords(null);
      setVerificationResult(null);
    }, 2000);
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-green-50 rounded-lg border border-green-200">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">Connect your wallet to submit a task</h2>
        <p className="text-green-600 mb-6 max-w-lg text-center">
          Submit your eco-friendly actions, get them verified by our AI system, and earn $GREEN tokens on Solana.
        </p>
        <Button className="bg-green-600 hover:bg-green-700">Connect Wallet</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-green-200">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-green-800">Submit Eco-Task</CardTitle>
          <CardDescription>
            Upload photo evidence of your environmental action to earn $GREEN tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="task-type">Task Type</Label>
            <Select value={taskType} onValueChange={setTaskType}>
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recycling">Recycling</SelectItem>
                <SelectItem value="cleanup">Beach/Park Cleanup</SelectItem>
                <SelectItem value="tree-planting">Tree Planting</SelectItem>
                <SelectItem value="composting">Composting</SelectItem>
                <SelectItem value="other">Other Eco-Action</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Photo Evidence</Label>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-200 rounded-lg p-6 bg-green-50">
              {image ? (
                <div className="space-y-4 w-full">
                  <img 
                    src={image} 
                    alt="Task evidence" 
                    className="w-full h-48 object-cover rounded-md" 
                  />
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setImage(null)}
                    >
                      Replace
                    </Button>
                    
                    {!verificationResult && (
                      <Button 
                        onClick={verifyImage} 
                        disabled={isSubmitting}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        {isSubmitting ? "Verifying..." : "Verify Image"}
                      </Button>
                    )}
                  </div>
                  
                  {verificationResult && (
                    <div className={`p-3 rounded-md mt-2 ${
                      verificationResult.verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {verificationResult.message}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="mx-auto h-12 w-12 text-green-300" />
                  <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={handleCapture} className="bg-green-600 hover:bg-green-700">
                      Take Photo
                    </Button>
                    <Button variant="outline" onClick={handleCapture}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                    />
                  </div>
                  <p className="text-sm text-green-500 mt-2">
                    Images are analyzed by our AI to verify eco-actions
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              placeholder="Briefly describe your eco-action" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex space-x-2">
              <Input 
                id="location" 
                placeholder="Task location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={detectLocation} 
                disabled={isDetecting}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {isDetecting ? "Detecting..." : "Detect"}
              </Button>
            </div>
            <p className="text-xs text-green-600">
              Your location is used to verify the eco-action and is stored securely on-chain.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-green-50 border-t border-green-100">
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !taskType || !image || !description || !location} 
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Submitting..." : (verificationResult ? "Submit Task" : "Verify & Submit")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskSubmission;

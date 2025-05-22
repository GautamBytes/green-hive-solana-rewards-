
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { BeakerIcon, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestnetToggleProps {
  isTestnet: boolean;
  onToggle: (value: boolean) => void;
}

const TestnetToggle: React.FC<TestnetToggleProps> = ({ isTestnet, onToggle }) => {
  const { toast } = useToast();

  const handleToggle = (checked: boolean) => {
    onToggle(checked);
    
    toast({
      title: checked ? "Switched to Testnet" : "Switched to Mainnet Preview",
      description: checked 
        ? "You can now try experimental features with test $GREEN tokens" 
        : "Some features are limited in preview mode",
      variant: checked ? "default" : "default",
    });
  };

  return (
    <div className="flex items-center gap-2 p-1.5 bg-gray-100 dark:bg-green-900/50 rounded-full">
      <Badge 
        variant={!isTestnet ? "success" : "outline"} 
        className={`px-3 py-1 flex items-center gap-1 ${!isTestnet ? '' : 'bg-transparent text-gray-500 dark:text-gray-400'}`}
      >
        <ShieldCheck className="h-3.5 w-3.5" />
        Mainnet
      </Badge>
      
      <Switch 
        checked={isTestnet} 
        onCheckedChange={handleToggle} 
      />
      
      <Badge 
        variant={isTestnet ? "info" : "outline"} 
        className={`px-3 py-1 flex items-center gap-1 ${isTestnet ? '' : 'bg-transparent text-gray-500 dark:text-gray-400'}`}
      >
        <BeakerIcon className="h-3.5 w-3.5" />
        Testnet
      </Badge>
    </div>
  );
};

export default TestnetToggle;

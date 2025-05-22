
import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Wallet, ChevronDown, MessageSquare, Clock, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

interface WalletOption {
  name: WalletName;
  icon: string;
}

const WalletConnect = () => {
  const { connected, publicKey, select, wallets } = useWallet();
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  
  const walletOptions: WalletOption[] = [
    { name: 'Phantom' as WalletName, icon: "https://phantom.app/apple-touch-icon.png" },
    { name: 'Solflare' as WalletName, icon: "https://solflare.com/favicon-96x96.png" },
    { name: 'Backpack' as WalletName, icon: "https://backpack.app/icon-256.png" },
    { name: 'Brave' as WalletName, icon: "https://brave.com/static-assets/images/brave-logo-sans-text.svg" },
  ];
  
  // Get shortened wallet address
  const shortenedAddress = publicKey ? 
    `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : 
    null;
  
  // Mock tasks for the dropdown
  const mockTasks = [
    { id: 1, title: "Plastic Clean-up @ Central Park", due: "Today" },
    { id: 2, title: "Tree Planting @ Riverside", due: "Tomorrow" },
    { id: 3, title: "Recycling Drive @ Community Center", due: "In 3 days" }
  ];
  
  const handleSelectWallet = (walletName: WalletName) => {
    const wallet = wallets.find(w => w.adapter.name === walletName);
    if (wallet) {
      select(walletName);
      setShowWalletOptions(false);
    }
  };
  
  if (connected) {
    return (
      <div className="flex items-center gap-4">
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 px-4 py-2 rounded-full flex items-center shadow-sm">
          <span className="font-semibold mr-2 text-green-800 dark:text-green-300">$GREEN:</span>
          <span className="text-green-700 dark:text-green-200 font-mono">120.5</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 hover:from-green-600 hover:to-green-700 text-white">
              <Avatar className="h-6 w-6 mr-1">
                <AvatarImage src="https://api.dicebear.com/7.x/thumbs/svg?seed=Mittens&scale=80" />
                <AvatarFallback>GT</AvatarFallback>
              </Avatar>
              {shortenedAddress}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="font-semibold">
              {shortenedAddress}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>My Tasks</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockTasks.map((task) => (
              <DropdownMenuItem key={task.id}>
                <div className="flex items-center justify-between w-full">
                  <span className="truncate mr-2">{task.title}</span>
                  <Badge variant="outline" className="ml-auto">
                    <Clock className="h-3 w-3 mr-1" /> {task.due}
                  </Badge>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal" asChild>
                <a href="/dashboard">Dashboard</a>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button variant="ghost" className="w-full justify-start p-0 h-auto font-normal" asChild>
                <a href="/tasks">View All Tasks</a>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
  
  return (
    <>
      <Dialog open={showWalletOptions} onOpenChange={setShowWalletOptions}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md transition-all duration-300">
            <Wallet className="mr-2 h-5 w-5" />
            Select Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">Connect Your Wallet</DialogTitle>
            <DialogDescription className="text-center">
              Choose a wallet provider to connect with GreenTask
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {walletOptions.map((option) => (
              <Card 
                key={option.name} 
                className="cursor-pointer hover:shadow-md transition-all hover:-translate-y-1"
                onClick={() => handleSelectWallet(option.name)}
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img 
                    src={option.icon} 
                    alt={`${option.name} wallet`} 
                    className="w-16 h-16 object-contain mb-3" 
                  />
                  <h3 className="font-medium">{option.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;

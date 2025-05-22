import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletName } from '@solana/wallet-adapter-base';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Wallet, ChevronDown, MessageSquare, Clock, MapPin, ArrowRight, Shield, Zap, Star } from "lucide-react";
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
  description: string;
  icon: any;
  popular?: boolean;
}

const WalletConnect = () => {
  const { connected, publicKey, select, wallets } = useWallet();
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);

  const walletOptions: WalletOption[] = [
    { 
      name: 'Phantom' as WalletName, 
      description: 'Most popular Solana wallet',
      icon: Wallet,
      popular: true
    },
    { 
      name: 'Solflare' as WalletName, 
      description: 'Secure multi-platform wallet',
      icon: Shield
    },
    { 
      name: 'Backpack' as WalletName, 
      description: 'Built for the next generation',
      icon: Zap
    },
    { 
      name: 'Brave' as WalletName, 
      description: 'Privacy-focused browser wallet',
      icon: Star
    },
  ];

  const shortenedAddress = publicKey ? 
    `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : 
    null;

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
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Connect Your Wallet
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-600 dark:text-gray-400">
              Choose your preferred wallet to start earning $GREEN tokens
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-3 mt-6">
            {walletOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 ${
                      hoveredWallet === option.name 
                        ? 'border-green-400 bg-green-50 dark:bg-green-950' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                    } ${option.popular ? 'ring-2 ring-green-200 dark:ring-green-800' : ''}`}
                    onClick={() => handleSelectWallet(option.name)}
                    onMouseEnter={() => setHoveredWallet(option.name)}
                    onMouseLeave={() => setHoveredWallet(null)}
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          hoveredWallet === option.name 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        } transition-all duration-300`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                              {option.name}
                            </h3>
                            {option.popular && (
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {option.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className={`h-4 w-4 transition-all duration-300 ${
                        hoveredWallet === option.name 
                          ? 'text-green-500 translate-x-1' 
                          : 'text-gray-400'
                      }`} />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-green-800 dark:text-green-200">
                  Secure Connection
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
                  Your connection is encrypted and secure. We never store private keys.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnect;


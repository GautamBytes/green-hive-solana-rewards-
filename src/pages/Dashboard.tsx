
import React, { useEffect } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from "@/components/Navbar";
import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import { ImpactDashboard } from "@/components/ImpactDashboard";
import { FeaturedEcoActions } from "@/components/FeaturedEcoActions";
import NotificationCenter from "@/components/NotificationCenter";
import GamificationSystem from "@/components/GamificationSystem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { connected, publicKey } = useWallet();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (connected) {
      console.log("Wallet connected:", publicKey?.toString());
      toast({
        title: "Wallet Connected",
        description: "You are now connected to the GreenTask ecosystem.",
        variant: "default",
      });
    } else {
      // Redirect to home if not connected
      navigate("/");
    }
  }, [connected, publicKey, navigate, toast]);

  // Early return if not connected - waiting for redirect
  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 dark:bg-green-900/30">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">
            Wallet Connection Required
          </h2>
          <p className="text-green-600 dark:text-green-400 mb-6">
            Redirecting to homepage...
          </p>
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="fixed top-4 right-4 z-50">
        <NotificationCenter />
      </div>
      
      <Navbar isConnected={connected} onConnect={() => {}} />
      
      <main className="flex-1 container mx-auto px-4 py-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-white/50 dark:from-green-900/30 dark:to-green-950/30 backdrop-blur-sm -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 p-6 bg-white/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl shadow-md border border-green-100 dark:border-green-800"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-green-800 dark:text-green-300">Eco Dashboard</h1>
                  <p className="text-muted-foreground">Track your environmental impact and activities</p>
                </div>
                <div className="hidden sm:block">
                  <Badge variant="shimmer" className="px-3 py-1.5">
                    <span className="mr-1">Eco Level:</span> Activist
                  </Badge>
                </div>
              </div>
              
              <Tabs defaultValue="impact" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6 bg-muted/60 backdrop-blur-sm rounded-lg">
                  <TabsTrigger value="impact" className="data-[state=active]:bg-white dark:data-[state=active]:bg-green-800 data-[state=active]:text-green-800 dark:data-[state=active]:text-green-50">
                    Impact Metrics
                  </TabsTrigger>
                  <TabsTrigger value="actions" className="data-[state=active]:bg-white dark:data-[state=active]:bg-green-800 data-[state=active]:text-green-800 dark:data-[state=active]:text-green-50">
                    Featured Actions
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="impact" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <ImpactDashboard />
                </TabsContent>
                
                <TabsContent value="actions" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
                  <FeaturedEcoActions />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
          
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="sticky top-24 mb-6 p-6 bg-white/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl shadow-md border border-green-100 dark:border-green-800 h-[calc(100vh-200px)]"
            >
              <ScrollArea className="h-full pr-4">
                <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-300">Your Progress</h2>
                
                <GamificationSystem />
              </ScrollArea>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

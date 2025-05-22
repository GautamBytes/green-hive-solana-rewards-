
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SolanaContextProvider } from "@/contexts/SolanaContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { UserProfileProvider } from "@/contexts/UserProfileContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ImpactTracker from "./pages/ImpactTracker";
import Tasks from "./pages/Tasks";
import EcoAgents from "./pages/EcoAgents";
import Community from "./pages/Community";

const queryClient = new QueryClient();

const App = () => {
  // Add state for testnet mode
  const [isTestnet, setIsTestnet] = useState(false);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SolanaContextProvider>
          <NotificationProvider>
            <UserProfileProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/impact" element={<ImpactTracker />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/eco-agents" element={<EcoAgents />} />
                    <Route path="/community" element={<Community />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </UserProfileProvider>
          </NotificationProvider>
        </SolanaContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

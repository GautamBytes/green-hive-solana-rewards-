
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Leaf, Sun, Moon, Menu, ChevronRight } from "lucide-react";
import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import WalletConnect from "@/components/wallet/WalletConnect";

interface NavbarProps {
  isConnected: boolean;
  onConnect: () => void;
}

const Navbar = ({ isConnected = false, onConnect = () => {} }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { connected } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-green-900/70 border-b border-green-100 dark:border-green-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center">
              <motion.div 
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
                className="flex items-center"
              >
                <div className="relative">
                  <Leaf className="h-8 w-8 text-green-600 dark:text-green-400 drop-shadow-md" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full pulse-glow"></div>
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text">GreenTask</span>
                <span className="text-xs text-green-600 dark:text-green-300">Eco-Action Rewards</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/tasks" 
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium relative group"
            >
              Tasks
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/dashboard" 
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium relative group"
            >
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/eco-agents" 
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium relative group"
            >
              Eco-Agents
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              to="/community" 
              className="text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 font-medium relative group"
            >
              Community
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full text-gray-700 dark:text-white hover:bg-green-100 dark:hover:bg-green-800"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <WalletConnect />

            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full text-gray-700 dark:text-white hover:bg-green-100 dark:hover:bg-green-800"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-green-900 border-t border-green-100 dark:border-green-800"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                to="/tasks" 
                className="flex items-center justify-between px-4 py-3 hover:bg-green-50 dark:hover:bg-green-800/50 rounded-lg text-gray-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Tasks</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/dashboard" 
                className="flex items-center justify-between px-4 py-3 hover:bg-green-50 dark:hover:bg-green-800/50 rounded-lg text-gray-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Dashboard</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/eco-agents" 
                className="flex items-center justify-between px-4 py-3 hover:bg-green-50 dark:hover:bg-green-800/50 rounded-lg text-gray-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Eco-Agents</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link 
                to="/community" 
                className="flex items-center justify-between px-4 py-3 hover:bg-green-50 dark:hover:bg-green-800/50 rounded-lg text-gray-700 dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Community</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

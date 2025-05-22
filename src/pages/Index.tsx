import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from '@solana/wallet-adapter-react';
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import AchievementsModal from "@/components/AchievementsModal";
import NotificationCenter from "@/components/NotificationCenter";
import { FeatureSection } from "@/components/FeatureSection";
import { FeaturedEcoActions } from "@/components/FeaturedEcoActions";
import { LeafGenerator } from "@/components/LeafGenerator";
import { TechnicalSections } from "@/components/TechnicalSections";
import { Roadmap } from "@/components/Roadmap";
import WaitlistBanner from "@/components/WaitlistBanner";
import TestnetToggle from "@/components/TestnetToggle";
import GovernanceCard from "@/components/GovernanceCard";
import SneakPeekModal from "@/components/SneakPeekModal";
import { Trophy, Award, ArrowRight, CheckCircle2, Activity, CircleDollarSign, Leaf, MessageSquare, Recycle, Users, LayoutDashboard, Lightbulb } from "lucide-react";

const Index = () => {
  const { connected, publicKey } = useWallet();
  const { theme } = useTheme();
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSneakPeek, setShowSneakPeek] = useState(false);
  const [isTestnet, setIsTestnet] = useState(false);
  
  // Legacy state for backward compatibility
  const isConnected = connected;
  
  const handleConnect = () => {
    // This function is kept for backward compatibility
    // The actual wallet connection is now handled by the WalletMultiButton
    console.log("Connect button clicked, but wallet connection is handled by adapter");
  };

  useEffect(() => {
    if (connected) {
      console.log("Wallet connected:", publicKey?.toString());
    }
  }, [connected, publicKey]);

  // Handle smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target && target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  const handleShowSneakPeek = () => {
    setShowSneakPeek(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Waitlist Banner */}
      <WaitlistBanner />
      
      {/* Environmental animation effect */}
      <LeafGenerator />
      
      <div className="fixed top-4 right-4 z-50">
        <NotificationCenter />
      </div>
      
      <div className="fixed top-20 right-4 z-40">
        <TestnetToggle isTestnet={isTestnet} onToggle={setIsTestnet} />
      </div>
      
      <Navbar isConnected={isConnected} onConnect={handleConnect} />
      
      <HeroSection />
      
      {/* Features Section with added Governance Card */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-500 dark:from-green-400 dark:to-green-300">
                Empowering Features
              </span>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how GreenTask helps you make a real environmental impact while earning rewards for your efforts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Original Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-green-900/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-green-100 dark:border-green-800"
            >
              <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-300">Eco Tasks</h3>
              <p className="text-muted-foreground text-sm">Complete environmental tasks and get rewarded with $GREEN tokens for your positive impact.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-green-900/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-green-100 dark:border-green-800"
            >
              <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-amber-500 to-amber-600">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-300">Rewards & Badges</h3>
              <p className="text-muted-foreground text-sm">Earn exclusive badges and climb the leaderboard as you complete more eco-friendly actions.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-green-900/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-green-100 dark:border-green-800"
            >
              <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-300">Community Actions</h3>
              <p className="text-muted-foreground text-sm">Join eco-warriors in your area for collaborative environmental projects and initiatives.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3 * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-green-900/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-green-100 dark:border-green-800"
            >
              <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600">
                <LayoutDashboard className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-300">Impact Dashboard</h3>
              <p className="text-muted-foreground text-sm">Track your environmental contributions and visualize your positive impact on the planet.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4 * 0.2, duration: 0.5 }}
              className="bg-white dark:bg-green-900/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-green-100 dark:border-green-800"
            >
              <div className="w-12 h-12 mb-4 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-500 to-cyan-600">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-300">Eco Education</h3>
              <p className="text-muted-foreground text-sm">Learn sustainable practices and environmental tips through interactive content and challenges.</p>
            </motion.div>

            {/* New Governance Card - Added Here */}
            <GovernanceCard onShowSneakPeek={handleShowSneakPeek} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <Button 
              variant="eco" 
              size="lg"
              onClick={() => {}}
              className="group"
            >
              Learn More About Features
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Technical Sections with Animations */}
      <TechnicalSections />
      
      {/* Roadmap Section - Added Here */}
      <Roadmap />
      
      {connected && (
        <>
          {/* Quick Access Dashboard for Connected Users */}
          <section className="py-16 bg-green-50/70 dark:bg-green-900/20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 p-6 bg-white/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl shadow-lg border border-green-100 dark:border-green-800"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-green-800 dark:text-green-100">Welcome back, Eco-Hero!</h2>
                    <p className="text-green-600 dark:text-green-300">Your environmental journey continues...</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => setShowAchievements(true)}
                      variant="legendary"
                      size="sm"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Achievements
                    </Button>
                    <Button variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-800/40">
                      <Award className="mr-2 h-4 w-4" />
                      Rank #126
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <Link to="/dashboard" className="group">
                    <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-800/30 dark:to-green-700/30 p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover:-translate-y-1 duration-300">
                      <Activity className="h-8 w-8 mx-auto mb-2 text-green-600 dark:text-green-400" />
                      <h3 className="font-medium text-green-800 dark:text-green-300 mb-1">Dashboard</h3>
                      <p className="text-xs text-muted-foreground">View your eco stats</p>
                      <ArrowRight className="h-4 w-4 mx-auto mt-2 opacity-0 group-hover:opacity-100 text-green-600 dark:text-green-400 transition-all" />
                    </div>
                  </Link>
                  
                  <Link to="/tasks" className="group">
                    <div className="bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-800/30 dark:to-amber-700/30 p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover:-translate-y-1 duration-300">
                      <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-amber-600 dark:text-amber-400" />
                      <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Tasks</h3>
                      <p className="text-xs text-muted-foreground">Complete eco actions</p>
                      <ArrowRight className="h-4 w-4 mx-auto mt-2 opacity-0 group-hover:opacity-100 text-amber-600 dark:text-amber-400 transition-all" />
                    </div>
                  </Link>
                  
                  <Link to="/impact" className="group">
                    <div className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-800/30 dark:to-blue-700/30 p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover:-translate-y-1 duration-300">
                      <Leaf className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-1">Impact</h3>
                      <p className="text-xs text-muted-foreground">Track your contribution</p>
                      <ArrowRight className="h-4 w-4 mx-auto mt-2 opacity-0 group-hover:opacity-100 text-blue-600 dark:text-blue-400 transition-all" />
                    </div>
                  </Link>
                  
                  <Link to="/eco-agents" className="group">
                    <div className="bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-800/30 dark:to-purple-700/30 p-4 rounded-xl shadow-sm hover:shadow-md transition-all text-center hover:-translate-y-1 duration-300">
                      <CircleDollarSign className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                      <h3 className="font-medium text-purple-800 dark:text-purple-300 mb-1">$GREEN Token</h3>
                      <p className="text-xs text-muted-foreground">Manage your rewards</p>
                      <ArrowRight className="h-4 w-4 mx-auto mt-2 opacity-0 group-hover:opacity-100 text-purple-600 dark:text-purple-400 transition-all" />
                    </div>
                  </Link>
                </div>
              </motion.div>
              
              {/* Featured Eco Actions */}
              <FeaturedEcoActions />
            </div>
          </section>
        </>
      )}
      
      <footer className="bg-gradient-to-r from-green-800 to-green-900 dark:from-green-900 dark:to-green-950 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-2xl mb-4">GreenTask</h3>
              <p className="text-green-100 text-sm mb-6">Eco-Action Rewards on Solana</p>
              <div className="flex space-x-4">
                {['Twitter', 'Discord', 'Telegram'].map((social, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="text-green-300 hover:text-white transition-colors hover:-translate-y-1 inline-block duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Platform</h4>
              <ul className="space-y-3 text-sm">
                {['How It Works', 'Available Tasks', 'Rewards', 'Partners'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-green-200 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Resources</h4>
              <ul className="space-y-3 text-sm">
                {['FAQ', 'Documentation', 'API', 'Privacy Policy'].map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-green-200 hover:text-white transition-colors hover:translate-x-1 inline-block duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Subscribe</h4>
              <p className="text-sm text-green-200 mb-3">Get updates on new eco-tasks</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-green-700/80 text-white rounded-l-md focus:outline-none text-sm w-full focus:ring-2 focus:ring-green-400"
                />
                <Button className="bg-green-500 hover:bg-green-400 rounded-l-none text-white text-sm">
                  Submit
                </Button>
              </div>
              
              <div className="mt-6">
                <p className="text-xs text-green-300">Stay connected with our community</p>
                <div className="flex gap-3 mt-2">
                  {[
                    { icon: "https://cdn-icons-png.flaticon.com/512/3955/3955024.png", url: "#" },
                    { icon: "https://cdn-icons-png.flaticon.com/512/3670/3670151.png", url: "#" },
                    { icon: "https://cdn-icons-png.flaticon.com/512/3670/3670070.png", url: "#" },
                  ].map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      className="w-8 h-8 rounded-full bg-green-700/50 hover:bg-green-600/50 flex items-center justify-center transition-all hover:-translate-y-1 duration-300"
                    >
                      <img src={social.icon} alt="social" className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-12 pt-6 text-center text-sm text-green-300">
            <p>© 2025 GreenTask: Eco-Action Rewards on Solana. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Achievements Modal */}
      <AchievementsModal
        open={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
      
      {/* Sneak Peek Modal - Added Here */}
      <SneakPeekModal
        open={showSneakPeek}
        onClose={() => setShowSneakPeek(false)}
      />
    </div>
  );
};

export default Index;


import { Button } from "@/components/ui/button";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ArrowRight, Leaf, Globe, Trees, Recycle, CheckCircle, Award, Trophy, Star } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const HeroSection = () => {
  const { connected } = useWallet();

  return (
    <>
      {/* Hero Section with gradient overlay */}
      <div className="relative bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-green-900 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 w-1/2 h-1/2 bg-green-200/30 dark:bg-green-700/20 rounded-full blur-3xl"></div>
          <div className="absolute -right-1/4 bottom-0 w-1/2 h-1/2 bg-yellow-100/30 dark:bg-green-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side content */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="space-y-8"
            >
              <motion.div 
                variants={fadeInUp} 
                custom={0}
                className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-800/40 rounded-full text-green-800 dark:text-green-300 font-medium text-sm"
              >
                <Leaf className="h-4 w-4 mr-2" />
                <span>Sustainable Actions, Tokenized Rewards</span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp} 
                custom={1}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-900 dark:text-green-50 leading-tight"
              >
                Green<span className="text-green-600">Task</span>: Earn While <br className="hidden md:block" />
                <span className="text-green-500 relative inline-block">
                  Saving The Planet
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></span>
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp} 
                custom={2}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl"
              >
                Complete eco-friendly tasks, verify with photos, and earn $GREEN tokens on Solana. 
                Join the movement to incentivize environmental action through blockchain rewards.
              </motion.p>
              
              <motion.div 
                variants={fadeInUp} 
                custom={3}
                className="flex flex-col sm:flex-row gap-4"
              >
                {!connected && (
                  <WalletMultiButton className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-base flex items-center justify-center" />
                )}
                <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-800/40 px-8 py-3 rounded-lg font-semibold text-base">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              
              <motion.div 
                variants={fadeInUp} 
                custom={4}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8"
              >
                <div className="bg-white/80 dark:bg-green-900/60 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-green-100 dark:border-green-800 transform hover:scale-105 transition-all">
                  <div className="rounded-full bg-green-100 dark:bg-green-800 p-2 inline-block mb-2">
                    <Recycle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">Verify Actions</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Submit photos of your eco-actions</p>
                </div>
                <div className="bg-white/80 dark:bg-green-900/60 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-green-100 dark:border-green-800 transform hover:scale-105 transition-all">
                  <div className="rounded-full bg-green-100 dark:bg-green-800 p-2 inline-block mb-2">
                    <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">Earn Tokens</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Get $GREEN for completed tasks</p>
                </div>
                <div className="bg-white/80 dark:bg-green-900/60 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-green-100 dark:border-green-800 transform hover:scale-105 transition-all">
                  <div className="rounded-full bg-green-100 dark:bg-green-800 p-2 inline-block mb-2">
                    <Trees className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-green-900 dark:text-green-300">Make Impact</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Track your environmental contribution</p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right side image/visualization */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -left-4 -top-4 right-20 bottom-20 bg-gradient-to-tr from-green-200 via-green-300 to-green-100 dark:from-green-700 dark:via-green-600 dark:to-green-800 rounded-2xl transform rotate-3 z-0"></div>
              <div className="relative z-10 bg-white/90 dark:bg-green-900/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-green-100 dark:border-green-800">
                <img 
                  src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=3270&auto=format&fit=crop"
                  alt="Eco rewards visualization" 
                  className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
                />
                <div className="mt-4 p-4 bg-green-50/80 dark:bg-green-800/40 backdrop-blur-sm rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-green-900 dark:text-green-300">Your Impact</h3>
                    <span className="text-sm bg-gradient-to-r from-green-600 to-green-500 text-white px-2 py-1 rounded-full">+120 $GREEN</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Trees Planted</span>
                      <span className="text-green-700 dark:text-green-300">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Plastic Recycled</span>
                      <span className="text-green-700 dark:text-green-300">58 kg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">CO₂ Saved</span>
                      <span className="text-green-700 dark:text-green-300">240 kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50 dark:from-green-900 dark:to-green-950">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 font-medium text-sm mb-4">
              Process
            </span>
            <h2 className="text-4xl font-bold text-green-900 dark:text-green-50 mb-6">How GreenTask Works</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Our platform makes it easy to earn rewards while making a positive impact on the environment.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <motion.div 
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: step * 0.1 }}
                className="relative"
              >
                <div className="bg-white/80 dark:bg-green-900/60 backdrop-blur-sm rounded-xl p-6 border border-green-100 dark:border-green-800 shadow-md h-full flex flex-col">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step}
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-300 mt-6 mb-3">
                    {step === 1 ? "Choose a Green Task" : step === 2 ? "Complete & Verify" : "Earn $GREEN Tokens"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    {step === 1 
                      ? "Browse available eco-friendly tasks in your area, from tree planting to plastic recycling and more."
                      : step === 2 
                        ? "Complete the task and submit photo verification through our mobile-friendly platform."
                        : "Once verified, receive $GREEN tokens directly to your Solana wallet that you can trade or use."
                    }
                  </p>
                  <div className="mt-4 flex justify-center">
                    {step === 1 
                      ? <CheckCircle className="h-12 w-12 text-green-500 dark:text-green-400" /> 
                      : step === 2 
                        ? <Leaf className="h-12 w-12 text-green-500 dark:text-green-400" /> 
                        : <Award className="h-12 w-12 text-green-500 dark:text-green-400" />
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tasks Section */}
      <section id="tasks" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-green-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16">
          <div className="w-64 h-64 bg-green-200/50 dark:bg-green-800/30 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16">
          <div className="w-64 h-64 bg-yellow-100/50 dark:bg-green-700/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 font-medium text-sm mb-4">
              Opportunities
            </span>
            <h2 className="text-4xl font-bold text-green-900 dark:text-green-50 mb-6">Available Eco-Tasks</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Make a difference with these verified environmental tasks and earn rewards.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Plant a Tree", 
                reward: 50, 
                difficulty: "Medium",
                time: "1-2 hours",
                icon: Trees
              },
              { 
                title: "Beach Cleanup", 
                reward: 30, 
                difficulty: "Easy",
                time: "2-3 hours",
                icon: Recycle
              },
              { 
                title: "Home Composting", 
                reward: 25, 
                difficulty: "Easy",
                time: "Ongoing",
                icon: Leaf
              },
              { 
                title: "Community Garden", 
                reward: 40, 
                difficulty: "Medium",
                time: "3-4 hours",
                icon: Globe
              },
              { 
                title: "Plastic Collection", 
                reward: 35, 
                difficulty: "Easy",
                time: "1-2 hours",
                icon: Recycle
              },
              { 
                title: "Solar Panel Setup", 
                reward: 120, 
                difficulty: "Hard",
                time: "1-2 days",
                icon: Star
              }
            ].map((task, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-green-50 dark:from-green-900 dark:to-green-800 rounded-xl overflow-hidden shadow-lg border border-green-100 dark:border-green-700"
              >
                <div className="h-3 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full">
                      <task.icon className="h-6 w-6 text-green-600 dark:text-green-300" />
                    </div>
                    <span className="bg-gradient-to-r from-green-600 to-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      +{task.reward} $GREEN
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-50 mb-2">{task.title}</h3>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-600 dark:text-gray-300">Difficulty: {task.difficulty}</span>
                    <span className="text-gray-600 dark:text-gray-300">Time: {task.time}</span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    View Details
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section id="rewards" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50 dark:from-green-900 dark:to-green-950">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 font-medium text-sm mb-4">
              Benefits
            </span>
            <h2 className="text-4xl font-bold text-green-900 dark:text-green-50 mb-6">$GREEN Token Rewards</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Earn valuable tokens for your environmental contributions with real utility.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-300 to-green-100 dark:from-green-700 dark:to-green-600 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white dark:bg-green-900 rounded-xl overflow-hidden shadow-lg p-6 border border-green-100 dark:border-green-700">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <Leaf className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-green-900 dark:text-green-50">$GREEN Token</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">On Solana Blockchain</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">$0.42</p>
                      <p className="text-sm text-green-700 dark:text-green-300">+12% this week</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { label: "Market Cap", value: "$2.4M" },
                      { label: "Total Supply", value: "10M $GREEN" },
                      { label: "Circulating Supply", value: "3.2M $GREEN" },
                      { label: "Daily Volume", value: "$125K" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-green-100 dark:border-green-800">
                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                        <span className="font-medium text-green-800 dark:text-green-200">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-100">What can you do with $GREEN?</h3>
              
              {[
                { 
                  title: "Exclusive Eco-Products", 
                  description: "Redeem tokens for sustainable products in our marketplace.",
                  icon: Trophy
                },
                { 
                  title: "Staking Rewards", 
                  description: "Stake your $GREEN tokens to earn passive income and governance rights.",
                  icon: Award
                },
                { 
                  title: "Trade on DEXs", 
                  description: "Easily swap $GREEN on Solana decentralized exchanges.",
                  icon: Globe
                },
                { 
                  title: "Carbon Offset Credits", 
                  description: "Convert tokens to verifiable carbon offset credits.",
                  icon: Leaf
                },
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex bg-white/80 dark:bg-green-900/60 backdrop-blur-sm rounded-lg p-4 border border-green-100 dark:border-green-800 shadow-sm"
                >
                  <div className="mr-4 bg-green-100 dark:bg-green-800/60 rounded-full p-2 h-min">
                    <item.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-green-900 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-green-100/50 dark:bg-green-800/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto max-w-7xl relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 font-medium text-sm mb-4">
              Our Mission
            </span>
            <h2 className="text-4xl font-bold text-green-900 dark:text-green-50 mb-6">About GreenTask</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              We're building a sustainable future by connecting eco-conscious individuals with tokenized environmental actions.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-white dark:from-green-800 dark:to-green-900 rounded-2xl transform -rotate-2"></div>
                <div className="relative bg-white/90 dark:bg-green-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-green-100 dark:border-green-700 p-6">
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-100 mb-4">Our Vision</h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      GreenTask was founded with a simple yet powerful vision: to create a world where environmental action is incentivized, transparent, and accessible to everyone.
                    </p>
                    
                    <p className="text-gray-700 dark:text-gray-300">
                      By combining blockchain technology with environmental activism, we're building a platform that rewards sustainable actions with real value, creating a positive feedback loop for planetary health.
                    </p>
                    
                    <div className="pt-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop" 
                          alt="CEO" 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-green-900 dark:text-green-50">Emma Rodriguez</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Founder & CEO</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-white/80 dark:bg-green-900/60 backdrop-blur-sm rounded-xl border border-green-100 dark:border-green-800 shadow-md overflow-hidden">
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-100">Impact Statistics</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Trees Planted", value: "12,500+" },
                      { label: "Plastic Recycled", value: "5.2 tons" },
                      { label: "CO₂ Saved", value: "450 tons" },
                      { label: "Active Users", value: "15,000+" }
                    ].map((stat, index) => (
                      <div key={index} className="bg-green-50 dark:bg-green-800/40 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">{stat.value}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 dark:bg-green-900/60 backdrop-blur-sm rounded-xl border border-green-100 dark:border-green-800 shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-100 mb-4">Partners & Supporters</h3>
                  
                  <div className="flex flex-wrap justify-center gap-6">
                    {["Solana Foundation", "EcoPlanet", "GreenFuture", "ClimateDAO"].map((partner, index) => (
                      <div key={index} className="px-4 py-2 bg-green-50 dark:bg-green-800/40 rounded-lg text-center">
                        <p className="font-medium text-green-700 dark:text-green-300">{partner}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl font-semibold text-lg">
                Join Our Community
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

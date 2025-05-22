import React from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import Navbar from "@/components/Navbar";
import { useTheme } from "@/contexts/ThemeContext";
import NotificationCenter from "@/components/NotificationCenter";
import { motion } from "framer-motion";
import ImpactChart from "@/components/ImpactChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Share2, Calendar, Badge, Download, Users } from "lucide-react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart, Cell } from "recharts";

// Sample environmental impact data
const weeklyData = [
  { day: "Mon", co2Saved: 2.1, trees: 0.5, waste: 1.2 },
  { day: "Tue", co2Saved: 1.8, trees: 0, waste: 0.8 },
  { day: "Wed", co2Saved: 3.2, trees: 1, waste: 1.5 },
  { day: "Thu", co2Saved: 2.4, trees: 0, waste: 2.0 },
  { day: "Fri", co2Saved: 2.9, trees: 0.5, waste: 1.4 },
  { day: "Sat", co2Saved: 4.1, trees: 2, waste: 2.5 },
  { day: "Sun", co2Saved: 3.5, trees: 1, waste: 1.9 },
];

const monthlyData = [
  { month: "Jan", co2Saved: 14, trees: 3, waste: 8 },
  { month: "Feb", co2Saved: 18, trees: 4, waste: 10 },
  { month: "Mar", co2Saved: 22, trees: 6, waste: 15 },
  { month: "Apr", co2Saved: 25, trees: 5, waste: 12 },
  { month: "May", co2Saved: 32, trees: 8, waste: 18 },
];

const actions = [
  { name: "Tree Planting", value: 42, color: "#22c55e" },
  { name: "Beach Cleanup", value: 28, color: "#3b82f6" },
  { name: "Recycling", value: 65, color: "#f59e0b" },
  { name: "Water Conservation", value: 15, color: "#06b6d4" },
  { name: "Energy Saving", value: 22, color: "#8b5cf6" },
];

const communityData = [
  { month: "Jan", users: 120, actions: 380 },
  { month: "Feb", users: 145, actions: 420 },
  { month: "Mar", users: 162, actions: 510 },
  { month: "Apr", users: 178, actions: 590 },
  { month: "May", users: 205, actions: 680 },
];

interface StatProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  color: string;
}

const Stat: React.FC<StatProps> = ({ title, value, unit, icon, color }) => (
  <div className="flex items-center gap-4 p-4 bg-white dark:bg-green-900/30 rounded-xl shadow-sm border border-green-100 dark:border-green-800">
    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <div className="flex items-baseline">
        <p className="text-2xl font-bold text-green-800 dark:text-green-300">{value}</p>
        {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
      </div>
    </div>
  </div>
);

const ImpactTracker = () => {
  const { connected } = useWallet();
  const { theme } = useTheme();

  // Redirect to home if not connected
  if (!connected) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="fixed top-4 right-4 z-50">
        <NotificationCenter />
      </div>
      
      <Navbar isConnected={connected} onConnect={() => {}} />
      
      <main className="flex-1 container mx-auto px-4 py-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-white/50 dark:from-green-900/30 dark:to-green-950/30 backdrop-blur-sm -z-10"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-green-800 dark:text-green-300">Impact Tracker</h1>
              <p className="text-muted-foreground">Monitor your environmental contributions and progress</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-1" /> Select Date Range
              </Button>
              <Button variant="soft" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export Report
              </Button>
              <Button variant="eco" size="sm">
                <Share2 className="h-4 w-4 mr-1" /> Share Impact
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Stat 
              title="CO2 Saved" 
              value="120" 
              unit="kg" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>} 
              color="bg-gradient-to-br from-green-500 to-green-600" 
            />
            
            <Stat 
              title="Trees Planted" 
              value="12" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M17 14c.9-.9 1.7-1.3 3-1.7-3 0-6-3-6-6C9.2 8.9 8.3 9.3 7 10c-2.3 1.3-3 2.9-3 6 0 3.1 2.9 6 6 6 3.1 0 6-2.9 6-6 0-1-.4-2.1-1-3z"></path><path d="M11.5 18.5c1-1 2.2-1.5 3.5-1.5"></path><path d="M14.5 11.5c-3-3-6-3-9 0"></path></svg>}
              color="bg-gradient-to-br from-emerald-500 to-emerald-600" 
            />
            
            <Stat 
              title="Waste Collected" 
              value="28" 
              unit="lbs" 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>}
              color="bg-gradient-to-br from-amber-500 to-amber-600"  
            />
            
            <Stat 
              title="Tasks Completed" 
              value="18" 
              icon={<Badge className="h-6 w-6 text-white" />}
              color="bg-gradient-to-br from-blue-500 to-blue-600" 
            />
          </div>
        </motion.div>
        
        <Tabs defaultValue="weekly" className="w-full mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-300">Impact Over Time</h2>
            <TabsList className="bg-muted/60">
              <TabsTrigger value="weekly" className="text-sm">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-sm">Monthly</TabsTrigger>
            </TabsList>
          </div>
          
          <Card className="border-green-100 dark:border-green-800">
            <TabsContent value="weekly" className="mt-0">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg">This Week's Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#143321' : '#fff', 
                          borderColor: theme === 'dark' ? '#166534' : '#dcfce7',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="monotone" dataKey="co2Saved" name="CO2 Saved (kg)" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="trees" name="Trees (equivalent)" stroke="#84cc16" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="waste" name="Waste (kg)" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="monthly" className="mt-0">
              <CardHeader className="pb-0">
                <CardTitle className="text-lg">Monthly Progression</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#143321' : '#fff', 
                          borderColor: theme === 'dark' ? '#166534' : '#dcfce7',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="monotone" dataKey="co2Saved" name="CO2 Saved (kg)" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="trees" name="Trees (equivalent)" stroke="#84cc16" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="waste" name="Waste (kg)" stroke="#f59e0b" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="border-green-100 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-lg">Activity Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={actions} layout="vertical" margin={{ top: 20, right: 20, left: 60, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={true} vertical={false} />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#143321' : '#fff', 
                          borderColor: theme === 'dark' ? '#166534' : '#dcfce7',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="value" background={{ fill: theme === 'dark' ? '#1a3a29' : '#f0fcf5' }}>
                        {actions.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border-green-100 dark:border-green-800">
              <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle className="text-lg">Community Growth</CardTitle>
                <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={communityData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#143321' : '#fff', 
                          borderColor: theme === 'dark' ? '#166534' : '#dcfce7',
                          borderRadius: '8px',
                        }}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line yAxisId="left" type="monotone" dataKey="users" name="Active Users" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line yAxisId="right" type="monotone" dataKey="actions" name="Total Actions" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="border-green-100 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-lg">Year-to-Date Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <ImpactChart />
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default ImpactTracker;

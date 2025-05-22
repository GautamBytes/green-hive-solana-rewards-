
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TaskData } from "@/types/TaskData";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import ImpactChart from "./ImpactChart";

interface DashboardProps {
  isConnected: boolean;
}

const Dashboard = ({ isConnected }: DashboardProps) => {
  const { connected } = useWallet();
  
  // Mock data
  const mockTasks: TaskData[] = [
    {
      id: "task-1",
      type: "Recycling",
      date: "2025-05-15",
      location: "San Francisco, CA",
      status: "verified",
      reward: 15,
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop"
    },
    {
      id: "task-2",
      type: "Tree Planting",
      date: "2025-05-10",
      location: "Portland, OR",
      status: "pending",
      reward: 25,
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop"
    },
    {
      id: "task-3",
      type: "Beach Cleanup",
      date: "2025-05-05",
      location: "Miami, FL",
      status: "verified",
      reward: 20,
      imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop"
    }
  ];

  if (!connected && !isConnected) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-700">
        <h2 className="text-2xl font-semibold text-green-800 dark:text-green-300 mb-6">Connect your wallet to view your dashboard</h2>
        <p className="text-green-600 dark:text-green-400 mb-6 max-w-lg text-center">
          Track your eco-impact, manage your tasks, and earn $GREEN tokens by completing verified environmental actions.
        </p>
        <WalletMultiButton className="bg-green-600 hover:bg-green-700 text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dark:bg-green-900/20 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="dark:text-green-300">Total Earnings</CardTitle>
            <CardDescription className="dark:text-green-400">$GREEN tokens earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">120.5</div>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-green-900/20 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="dark:text-green-300">Tasks Completed</CardTitle>
            <CardDescription className="dark:text-green-400">Verified eco-actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">7</div>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-green-900/20 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardTitle className="dark:text-green-300">Impact Level</CardTitle>
            <CardDescription className="dark:text-green-400">Environmental contributor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600 dark:text-green-400 mb-2">Earth Guardian</div>
            <Progress value={65} className="h-2 bg-green-100 dark:bg-green-800" />
            <div className="text-xs text-right mt-1 text-green-700 dark:text-green-400">Level 3 (65/100)</div>
          </CardContent>
        </Card>
      </div>
      
      <ImpactChart />
      
      <Card className="dark:bg-green-900/20 dark:border-green-800">
        <CardHeader>
          <CardTitle className="dark:text-green-300">Recent Tasks</CardTitle>
          <CardDescription className="dark:text-green-400">Your latest eco-contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-3 border border-green-100 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/40">
                <div 
                  className="w-16 h-16 rounded-md bg-cover bg-center" 
                  style={{ backgroundImage: `url(${task.imageUrl})` }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 dark:text-green-300">{task.type}</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">{task.date} · {task.location}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                    task.status === 'verified' ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                  }`}>
                    {task.status === 'verified' ? 'Verified' : 'Pending'}
                  </span>
                  <div className="font-bold text-green-700 dark:text-green-300 mt-1">+{task.reward} $GREEN</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

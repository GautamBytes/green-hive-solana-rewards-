
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ImpactOverview = () => {
  // Mock data
  const impactData = {
    treesPlanted: 12,
    plasticRecycled: 36.5, // in kg
    co2Saved: 420, // in kg
    waterSaved: 1240, // in liters
    achievements: [
      { name: "First Tree", description: "Planted your first tree", level: "bronze" },
      { name: "Plastic Warrior", description: "Recycled 25kg+ of plastic", level: "silver" },
      { name: "Community Leader", description: "Participated in 5+ group activities", level: "gold" },
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">My Environmental Impact</h2>
        <p className="text-green-600 dark:text-green-400">
          See the positive change you've made through your eco-actions
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-green-100 dark:border-green-800 dark:bg-green-900/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Trees Planted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-300">{impactData.treesPlanted}</div>
            <p className="text-xs text-green-600 dark:text-green-400">≈ 260 kg CO₂ absorbed yearly</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-800 dark:bg-green-900/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Plastic Recycled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-300">{impactData.plasticRecycled} kg</div>
            <p className="text-xs text-green-600 dark:text-green-400">≈ 73 kg CO₂ emissions saved</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-800 dark:bg-green-900/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">CO₂ Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-300">{impactData.co2Saved} kg</div>
            <p className="text-xs text-green-600 dark:text-green-400">≈ 2,100 km of driving avoided</p>
          </CardContent>
        </Card>
        
        <Card className="border-green-100 dark:border-green-800 dark:bg-green-900/20">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">Water Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-300">{impactData.waterSaved} L</div>
            <p className="text-xs text-green-600 dark:text-green-400">≈ 34 days of personal usage</p>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-4">My Achievements</h3>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {impactData.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-40"
            >
              <div className={`aspect-square rounded-lg flex items-center justify-center mb-2 relative overflow-hidden ${
                achievement.level === 'bronze' ? 'bg-amber-100 dark:bg-amber-900/30' : 
                achievement.level === 'silver' ? 'bg-gray-100 dark:bg-gray-700/30' : 
                'bg-amber-50 dark:bg-amber-800/30'
              }`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  achievement.level === 'bronze' ? 'bg-amber-200 dark:bg-amber-800/50' : 
                  achievement.level === 'silver' ? 'bg-gray-200 dark:bg-gray-600/50' : 
                  'bg-amber-300 dark:bg-amber-700/50'
                }`}>
                  {achievement.level === 'bronze' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-700 dark:text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {achievement.level === 'silver' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z" clipRule="evenodd" />
                      <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
                    </svg>
                  )}
                  {achievement.level === 'gold' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500 dark:text-amber-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant={
                    achievement.level === 'bronze' ? 'outline' : 
                    achievement.level === 'silver' ? 'secondary' : 
                    'legendary'
                  } className="text-xs">
                    {achievement.level}
                  </Badge>
                </div>
              </div>
              <h4 className="text-sm font-medium text-green-800 dark:text-green-300">{achievement.name}</h4>
              <p className="text-xs text-green-600 dark:text-green-400">{achievement.description}</p>
            </motion.div>
          ))}
          
          {/* Locked achievement */}
          <div className="flex-shrink-0 w-40 opacity-60">
            <div className="aspect-square rounded-lg flex items-center justify-center mb-2 bg-gray-100 dark:bg-gray-800/30 relative overflow-hidden">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700/50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="text-xs">
                  locked
                </Badge>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Waste Reducer</h4>
            <p className="text-xs text-gray-400 dark:text-gray-500">Complete 5 more recycling tasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactOverview;

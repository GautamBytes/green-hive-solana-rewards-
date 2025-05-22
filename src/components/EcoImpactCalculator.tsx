
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trees, Leaf, Recycle, Globe } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = ['#22c55e', '#10b981', '#059669', '#047857'];

const EcoImpactCalculator = () => {
  const [treesPlanted, setTreesPlanted] = useState(5);
  const [wasteRecycled, setWasteRecycled] = useState(25);
  const [compostUsed, setCompostUsed] = useState(10);
  const [dietImpact, setDietImpact] = useState("reducedMeat");
  
  const calculateCO2Savings = () => {
    // Annual CO2 savings calculations (simplified estimates)
    const treeSavings = treesPlanted * 21.8; // kg CO2 per year per tree
    
    const recyclingSavings = wasteRecycled * 2.5; // kg CO2 per kg recycled
    
    const compostSavings = compostUsed * 0.5; // kg CO2 per kg compost used
    
    const dietSavings = {
      "vegan": 1100,
      "vegetarian": 800,
      "reducedMeat": 300,
      "standard": 0
    }[dietImpact];
    
    return {
      trees: treeSavings,
      recycling: recyclingSavings,
      compost: compostSavings,
      diet: dietSavings,
      total: treeSavings + recyclingSavings + compostSavings + dietSavings
    };
  };
  
  const co2Savings = calculateCO2Savings();
  
  const chartData = [
    { name: 'Trees', value: co2Savings.trees },
    { name: 'Recycling', value: co2Savings.recycling },
    { name: 'Composting', value: co2Savings.compost },
    { name: 'Diet', value: co2Savings.diet },
  ];
  
  const dietOptions = [
    { id: "vegan", label: "Vegan Diet", description: "Plant-based diet with no animal products" },
    { id: "vegetarian", label: "Vegetarian Diet", description: "Plant-based with dairy and eggs, no meat" },
    { id: "reducedMeat", label: "Reduced Meat", description: "Meat 1-3 times per week" },
    { id: "standard", label: "Standard Diet", description: "Regular omnivore diet" }
  ];

  const getEarnedTokens = () => {
    // Simple calculation based on CO2 savings
    return Math.round(co2Savings.total / 10);
  };

  return (
    <Card className="border-green-200 dark:border-green-800 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-green-800 dark:text-green-100">
          Your Eco-Impact Calculator
        </CardTitle>
        <CardDescription className="text-green-700 dark:text-green-300">
          See how your green actions translate into environmental impact and $GREEN rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <Tabs defaultValue="inputs" className="w-full">
          <TabsList className="mb-6 bg-green-100/80 dark:bg-green-900/50">
            <TabsTrigger value="inputs" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Your Actions
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Impact Results
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inputs" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center">
                    <Trees className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                    Trees Planted
                  </Label>
                  <span className="font-medium text-green-800 dark:text-green-100">{treesPlanted}</span>
                </div>
                <Slider 
                  min={0} 
                  max={50} 
                  step={1} 
                  value={[treesPlanted]} 
                  onValueChange={(val) => setTreesPlanted(val[0])} 
                />
                <p className="text-xs text-green-600 dark:text-green-400">
                  Each tree absorbs approximately 21.8 kg of CO2 per year
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center">
                    <Recycle className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                    Waste Recycled (kg)
                  </Label>
                  <span className="font-medium text-green-800 dark:text-green-100">{wasteRecycled}</span>
                </div>
                <Slider 
                  min={0} 
                  max={100} 
                  step={5} 
                  value={[wasteRecycled]} 
                  onValueChange={(val) => setWasteRecycled(val[0])} 
                />
                <p className="text-xs text-green-600 dark:text-green-400">
                  Recycling saves approximately 2.5 kg of CO2 per kg of waste
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="flex items-center">
                    <Leaf className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                    Compost Used (kg)
                  </Label>
                  <span className="font-medium text-green-800 dark:text-green-100">{compostUsed}</span>
                </div>
                <Slider 
                  min={0} 
                  max={50} 
                  step={1} 
                  value={[compostUsed]} 
                  onValueChange={(val) => setCompostUsed(val[0])} 
                />
                <p className="text-xs text-green-600 dark:text-green-400">
                  Using compost reduces CO2 emissions from chemical fertilizers
                </p>
              </div>
              
              <div className="space-y-2 pt-2">
                <Label className="flex items-center mb-2">
                  <Globe className="mr-2 h-5 w-5 text-green-600 dark:text-green-400" />
                  Your Diet Type
                </Label>
                <RadioGroup value={dietImpact} onValueChange={setDietImpact} className="space-y-2">
                  {dietOptions.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                      <div className="grid gap-1">
                        <Label htmlFor={option.id} className="font-medium">
                          {option.label}
                        </Label>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-100 mb-4">
                  CO₂ Savings Breakdown
                </h3>
                
                <div className="space-y-4">
                  {chartData.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300 flex items-center">
                          <div className="w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          {item.name}
                        </span>
                        <span className="font-medium text-green-800 dark:text-green-100">
                          {item.value.toFixed(1)} kg CO₂
                        </span>
                      </div>
                      <div className="w-full bg-green-100 dark:bg-green-800/40 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.value / co2Savings.total) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-green-50 dark:bg-green-800/20 rounded-lg border border-green-100 dark:border-green-800">
                  <div className="flex justify-between items-center">
                    <p className="text-green-700 dark:text-green-300">Total Annual CO₂ Saved:</p>
                    <p className="text-xl font-bold text-green-800 dark:text-green-100">
                      {co2Savings.total.toFixed(1)} kg
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-green-700 dark:text-green-300">Equivalent to:</p>
                    <p className="text-sm text-green-800 dark:text-green-100">
                      {(co2Savings.total / 271).toFixed(1)} round-trip flights (300km)
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-100 mb-4 self-start">
                  Your Impact Visualization
                </h3>
                
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        animationBegin={200}
                        animationDuration={1200}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value.toFixed(1)} kg CO₂`} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 p-4 bg-green-600 dark:bg-green-700 rounded-lg text-center w-full">
                  <p className="text-white text-sm">Based on your eco-actions, you could earn:</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {getEarnedTokens()} $GREEN
                  </p>
                  <p className="text-green-100 text-xs mt-1">
                    Complete these actions to claim your rewards
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EcoImpactCalculator;

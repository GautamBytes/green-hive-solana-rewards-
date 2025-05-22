
import React from "react";
import { motion } from "framer-motion";
import { LeafyGreen, Recycle, Award, Users, LayoutDashboard, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  iconBg: string;
}

const FeatureCard = ({ icon, title, description, delay, iconBg }: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.2, duration: 0.5 }}
    className="bg-white dark:bg-green-900/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-green-100 dark:border-green-800"
  >
    <div className={`w-12 h-12 mb-4 rounded-lg flex items-center justify-center ${iconBg}`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-300">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </motion.div>
);

export const FeatureSection = () => {
  const { toast } = useToast();

  const handleLearnMore = () => {
    toast({
      title: "Feature Guide",
      description: "Check your notifications for a detailed guide on how to use all features!",
    });
  };

  const features = [
    {
      icon: <Recycle className="h-6 w-6 text-white" />,
      title: "Eco Tasks",
      description: "Complete environmental tasks and get rewarded with $GREEN tokens for your positive impact.",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Rewards & Badges",
      description: "Earn exclusive badges and climb the leaderboard as you complete more eco-friendly actions.",
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Community Actions",
      description: "Join eco-warriors in your area for collaborative environmental projects and initiatives.",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      icon: <LayoutDashboard className="h-6 w-6 text-white" />,
      title: "Impact Dashboard",
      description: "Track your environmental contributions and visualize your positive impact on the planet.",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-white" />,
      title: "Eco Education",
      description: "Learn sustainable practices and environmental tips through interactive content and challenges.",
      iconBg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    },
    {
      icon: <LeafyGreen className="h-6 w-6 text-white" />,
      title: "Green Marketplace",
      description: "Use your earned tokens to purchase eco-friendly products or donate to environmental causes.",
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
  ];

  return (
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
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
              iconBg={feature.iconBg}
            />
          ))}
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
            onClick={handleLearnMore}
            className="group"
          >
            Learn More About Features
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

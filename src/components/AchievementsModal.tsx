
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Award,
  Trophy,
  Star,
  Trees,
  Globe,
  Recycle,
  Heart,
} from "lucide-react";

const achievements = [
  {
    id: "first-task",
    name: "Green Beginner",
    description: "Complete your first eco-task",
    icon: Leaf,
    color: "bg-green-500",
    unlocked: true,
    xp: 50,
  },
  {
    id: "tree-planter",
    name: "Tree Hugger",
    description: "Plant 5 trees",
    icon: Trees,
    color: "bg-emerald-600",
    unlocked: true,
    xp: 100,
  },
  {
    id: "plastic-warrior",
    name: "Plastic Warrior",
    description: "Collect 10kg of plastic waste",
    icon: Recycle,
    color: "bg-blue-500",
    unlocked: true,
    xp: 150,
  },
  {
    id: "community-guide",
    name: "Community Guide",
    description: "Invite 3 friends to join GreenTask",
    icon: Heart,
    color: "bg-pink-500",
    unlocked: false,
    xp: 200,
  },
  {
    id: "master-composter",
    name: "Master Composter",
    description: "Maintain a compost setup for 30 days",
    icon: Globe,
    color: "bg-amber-600",
    unlocked: false,
    xp: 250,
  },
  {
    id: "eco-influencer",
    name: "Eco-Influencer",
    description: "Complete 50 eco-tasks",
    icon: Star,
    color: "bg-purple-600",
    unlocked: false,
    xp: 500,
  },
  {
    id: "carbon-neutral",
    name: "Carbon Champion",
    description: "Offset 1 ton of carbon emissions",
    icon: Trophy,
    color: "bg-indigo-600",
    unlocked: false,
    xp: 1000,
  },
  {
    id: "eco-expert",
    name: "Eco Expert",
    description: "Earn all other achievements",
    icon: Award,
    color: "bg-yellow-500",
    unlocked: false,
    xp: 2000,
  },
];

interface AchievementsModalProps {
  open: boolean;
  onClose: () => void;
}

const AchievementsModal = ({ open, onClose }: AchievementsModalProps) => {
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(
    null
  );

  const totalXP = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, achievement) => sum + achievement.xp, 0);

  const totalPossibleXP = achievements.reduce(
    (sum, achievement) => sum + achievement.xp,
    0
  );

  const progressPercent = Math.round((totalXP / totalPossibleXP) * 100);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-green-50 dark:from-green-900 dark:to-green-950 border border-green-100 dark:border-green-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800 dark:text-green-100">
            Your Green Achievements
          </DialogTitle>
          <DialogDescription className="text-green-700 dark:text-green-300">
            Track your environmental impact journey with these achievements
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300">
                Your Impact Level
              </p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-green-800 dark:text-green-100">
                  {totalXP} XP
                </p>
                <Badge
                  className={`${
                    progressPercent < 30
                      ? "bg-green-500"
                      : progressPercent < 60
                      ? "bg-green-600"
                      : "bg-green-700"
                  }`}
                >
                  {progressPercent < 30
                    ? "Seedling"
                    : progressPercent < 60
                    ? "Grower"
                    : "Eco Champion"}
                </Badge>
              </div>
            </div>
            <div className="w-32 h-2 bg-green-100 dark:bg-green-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedAchievement(achievement.id)}
                className={`relative cursor-pointer rounded-lg p-4 flex flex-col items-center text-center ${
                  achievement.unlocked
                    ? "bg-white dark:bg-green-800/50"
                    : "bg-gray-100 dark:bg-green-900/30 opacity-60"
                } border ${
                  achievement.unlocked
                    ? "border-green-200 dark:border-green-700"
                    : "border-gray-200 dark:border-green-900"
                } hover:shadow-md transition-all`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.unlocked
                      ? achievement.color
                      : "bg-gray-300 dark:bg-gray-700"
                  } mb-2`}
                >
                  <achievement.icon
                    className={
                      achievement.unlocked
                        ? "h-6 w-6 text-white"
                        : "h-6 w-6 text-gray-500 dark:text-gray-400"
                    }
                  />
                </div>
                <h4
                  className={`font-semibold ${
                    achievement.unlocked
                      ? "text-green-800 dark:text-green-100"
                      : "text-gray-500 dark:text-gray-400"
                  } text-sm`}
                >
                  {achievement.name}
                </h4>
                <p
                  className={`text-xs mt-1 ${
                    achievement.unlocked
                      ? "text-green-600 dark:text-green-300"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {achievement.description}
                </p>
                <Badge
                  variant={achievement.unlocked ? "default" : "outline"}
                  className={`mt-2 ${
                    achievement.unlocked
                      ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                      : ""
                  }`}
                >
                  {achievement.xp} XP
                </Badge>
                {!achievement.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-black/20 rounded-lg">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      Locked
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-300 dark:hover:bg-green-800/40"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AchievementsModal;

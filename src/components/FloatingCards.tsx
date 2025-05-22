
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Trophy, Star } from "lucide-react";

export const FloatingCards = () => {
  const cards = [
    {
      title: "Solana Integration",
      description: "Fast, secure & eco-friendly blockchain transactions",
      icon: <Star className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "$GREEN Token",
      description: "Earn rewards for verified environmental actions",
      icon: <Trophy className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Impact Tracking",
      description: "Visualize your environmental contributions",
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
    },
  ];

  return (
    <div className="relative h-[500px] w-full">
      {/* 3D space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-2xl overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white dark:bg-green-300"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Floating cards */}
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className="absolute w-64 sm:w-72"
          style={{
            left: `calc(${25 + i * 25}% - 8rem)`,
            top: i % 2 === 0 ? "20%" : "50%",
          }}
          initial={{ y: 0 }}
          animate={{
            y: i % 2 === 0 ? [0, -20, 0] : [0, 20, 0],
            rotateZ: i % 2 === 0 ? [-2, 2, -2] : [2, -2, 2],
          }}
          transition={{
            duration: 5 + i,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Card className="backdrop-blur-md bg-white/60 dark:bg-green-900/60 border-green-100 dark:border-green-700 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600" />
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-green-100/60 dark:bg-green-800/60">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  {card.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {card.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

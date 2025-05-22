
import React from "react";
import { motion } from "framer-motion";

interface AnimatedDividerProps {
  variant?: "leaves" | "waves" | "particles";
}

export const AnimatedDivider = ({ variant = "leaves" }: AnimatedDividerProps) => {
  const renderDivider = () => {
    switch (variant) {
      case "leaves":
        return (
          <div className="relative h-24 md:h-32 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-8 h-8 md:w-12 md:h-12"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-20%`,
                  background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2322c580' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 3v12'/%3E%3Cpath d='M18 9a3 3 0 0 0-3-3H7'/%3E%3Cpath d='M18 21a3 3 0 0 1-3-3H7'/%3E%3Cpath d='M18 15a3 3 0 0 0-3-3H7'/%3E%3C/svg%3E") center/contain no-repeat`
                }}
                initial={{ y: -20, rotate: 0, opacity: 0 }}
                animate={{
                  y: ["0%", "120%"],
                  rotate: [0, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              />
            ))}
            <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-green-50 to-transparent dark:from-green-950 dark:to-transparent" />
          </div>
        );
      case "waves":
        return (
          <div className="relative h-24 overflow-hidden">
            <svg 
              viewBox="0 0 1200 120" 
              preserveAspectRatio="none" 
              className="absolute w-full h-full"
            >
              <motion.path 
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                fill="#22c580"
                fillOpacity="0.15"
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: [0, -10, 0],
                  opacity: 0.8
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
              <motion.path 
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                fill="#22c580"
                fillOpacity="0.1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: [0, -5, 0],
                  opacity: 0.6
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </svg>
          </div>
        );
      case "particles":
        return (
          <div className="relative h-24 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-green-400 dark:bg-green-500"
                style={{
                  width: `${Math.random() * 12 + 6}px`,
                  height: `${Math.random() * 12 + 6}px`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                initial={{ 
                  y: Math.random() * 100,
                  scale: 0
                }}
                animate={{ 
                  y: [null, -50],
                  scale: [0, 1, 0],
                }}
                transition={{ 
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>
        );
      default:
        return <div className="h-16" />;
    }
  };

  return renderDivider();
};

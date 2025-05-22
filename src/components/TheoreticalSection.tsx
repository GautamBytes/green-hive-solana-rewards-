
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Layers, Brain, Globe, Infinity, Sparkles } from "lucide-react";

interface TheoreticalSectionProps {
  title: string;
  description: string;
  sections: {
    title: string;
    content: string;
    icon: "layers" | "brain" | "globe" | "infinity" | "sparkles";
  }[];
}

export const TheoreticalSection = ({
  title,
  description,
  sections,
}: TheoreticalSectionProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "layers":
        return <Layers className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case "brain":
        return <Brain className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case "globe":
        return <Globe className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case "infinity":
        return <Infinity className="h-8 w-8 text-green-600 dark:text-green-400" />;
      case "sparkles":
        return <Sparkles className="h-8 w-8 text-green-600 dark:text-green-400" />;
      default:
        return <Layers className="h-8 w-8 text-green-600 dark:text-green-400" />;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50/80 to-white/90 dark:from-green-950/80 dark:to-green-900/90 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge
            variant="shimmer"
            className="mb-4 px-4 py-2 text-sm font-medium"
          >
            Deep Dive
          </Badge>
          <h2 className="text-4xl font-bold text-green-800 dark:text-green-100 mb-6">
            {title}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 dark:bg-green-900/40 backdrop-blur-sm rounded-xl p-8 border border-green-100 dark:border-green-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-green-100/70 dark:bg-green-800/40 rounded-lg p-3">
                  {getIcon(section.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

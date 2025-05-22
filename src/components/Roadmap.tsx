
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LockIcon, Rocket, Vote, Users, CircleDollarSign } from "lucide-react";

interface RoadmapItemProps {
  quarter: string;
  title: string;
  description: string;
  locked?: boolean;
  icon: React.ReactNode;
}

const RoadmapItem = ({ quarter, title, description, locked = false, icon }: RoadmapItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className={`relative ${locked ? 'opacity-80' : ''}`}
  >
    <div className="flex items-start gap-4">
      <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${locked ? 'bg-gray-200 dark:bg-gray-800' : 'bg-green-100 dark:bg-green-800'}`}>
        {icon}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={locked ? "outline" : "success"} className="text-xs">
            {quarter}
          </Badge>
          
          {locked && (
            <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs">
              <LockIcon className="h-3 w-3 mr-1" /> Coming Soon
            </Badge>
          )}
        </div>
        
        <h3 className={`text-lg font-semibold mb-1 ${locked ? 'text-gray-500 dark:text-gray-400' : 'text-green-800 dark:text-green-300'}`}>
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

export const Roadmap = () => {
  return (
    <section className="py-16 bg-green-50/70 dark:bg-green-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-4">GreenTask Roadmap</h2>
          <p className="text-green-600 dark:text-green-400 max-w-2xl mx-auto">
            Our journey to build a sustainable future with blockchain technology
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 dark:bg-green-800 transform -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0">
            {/* Current milestones */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                <RoadmapItem
                  quarter="Q1 '25"
                  title="Platform Launch"
                  description="Public launch of the GreenTask platform with core features and $GREEN token"
                  icon={<Rocket className="h-6 w-6 text-green-600 dark:text-green-400" />}
                />
              </div>
              
              <div className="hidden md:block h-4 w-4 bg-green-500 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
              
              <div className="md:w-1/2 md:pl-12">
                <div className="md:mt-24">
                  <RoadmapItem
                    quarter="Q2 '25"
                    title="Mobile App Beta"
                    description="Release of our mobile application for easier task verification on the go"
                    icon={<Users className="h-6 w-6 text-green-600 dark:text-green-400" />}
                  />
                </div>
              </div>
            </div>

            {/* Future milestones */}
            <div className="md:flex md:items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
                <div className="md:mt-24">
                  <RoadmapItem
                    quarter="Q3 '25"
                    title="AI Eco-Agent Marketplace"
                    description="Launch of AI-powered eco-agent marketplace to optimize environmental impact"
                    locked={true}
                    icon={<Rocket className="h-6 w-6 text-gray-500" />}
                  />
                </div>
              </div>
              
              <div className="hidden md:block h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
              
              <div className="md:w-1/2 md:pl-12">
                <RoadmapItem
                  quarter="Q4 '25"
                  title="Community Task Bounties & Sponsorships"
                  description="Enable community-driven task creation and corporate sponsorships for eco-actions"
                  locked={true}
                  icon={<CircleDollarSign className="h-6 w-6 text-gray-500" />}
                />
              </div>
            </div>

            <div className="md:flex md:items-center">
              <div className="md:w-1/2 md:pr-12 md:text-right">
                <div className="md:mt-24">
                  <RoadmapItem
                    quarter="Q1 '26"
                    title="$GREEN DAO Governance Portal"
                    description="Vote on new eco-initiatives using your $GREEN tokens"
                    locked={true}
                    icon={<Vote className="h-6 w-6 text-gray-500" />}
                  />
                </div>
              </div>
              
              <div className="hidden md:block h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
              
              <div className="md:w-1/2 md:pl-12">
                {/* Empty space for potential future milestone */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

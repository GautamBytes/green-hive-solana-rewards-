
import React from "react";
import { TheoreticalSection } from "./TheoreticalSection";
import { AnimatedDivider } from "./AnimatedDivider";
import { FloatingCards } from "./FloatingCards";
import { motion } from "framer-motion";

export const TechnicalSections = () => {
  const blockchainSection = {
    title: "The Technology Behind GreenTask",
    description:
      "Learn how our platform leverages Solana blockchain technology to create transparent, verifiable environmental impact.",
    sections: [
      {
        title: "Solana Blockchain Integration",
        content:
          "GreenTask utilizes Solana's high-performance blockchain to process transactions with minimal energy consumption. With transaction finality in under 400 milliseconds and costs of less than $0.001 per transaction, Solana provides the perfect foundation for our eco-friendly platform. Its proof-of-stake consensus mechanism consumes 99.99% less energy than proof-of-work blockchains, aligning perfectly with our environmental mission.",
        icon: "layers" as const,
      },
      {
        title: "Smart Contract Architecture",
        content:
          "Our platform employs Solana Programs (smart contracts) written in Rust for maximum efficiency and security. These programs automatically verify completed eco-tasks, manage token distribution, and maintain immutable records of environmental contributions. The architecture includes specialized modules for task verification, token distribution, governance, and impact measurement, all interacting seamlessly to create a trustless ecosystem.",
        icon: "brain" as const,
      },
      {
        title: "Decentralized Verification System",
        content:
          "Environmental actions are verified through a decentralized oracle network and community validation. When users submit proof of completed tasks, our multi-layered verification system uses machine learning for initial screening, followed by community validation through a proof-of-stake voting mechanism. This ensures all rewarded actions have genuine environmental impact while preventing fraudulent claims.",
        icon: "infinity" as const,
      },
      {
        title: "Tokenomic Model",
        content:
          "$GREEN tokens function as both utility and governance tokens within our ecosystem. The deflationary token model includes automatic burning mechanisms tied to real-world carbon reduction metrics. Token holders can participate in governance decisions, stake for passive income, purchase eco-products, or convert to verifiable carbon offset credits, creating multiple value paths for environmentally conscious users.",
        icon: "globe" as const,
      },
    ],
  };

  const impactSection = {
    title: "Environmental Impact Quantification",
    description:
      "Our scientific approach to measuring and verifying environmental contributions creates real-world impact.",
    sections: [
      {
        title: "Carbon Reduction Metrics",
        content:
          "GreenTask employs sophisticated carbon accounting methodologies aligned with the Greenhouse Gas Protocol. Each eco-action is assigned a verified carbon reduction value based on peer-reviewed scientific research. These metrics are continuously updated through partnerships with environmental research institutions to ensure accuracy. The platform tracks both direct carbon reduction (e.g., tree planting) and avoided emissions (e.g., recycling initiatives).",
        icon: "brain" as const,
      },
      {
        title: "Biodiversity Impact Assessment",
        content:
          "Beyond carbon, we measure biodiversity impact through habitat restoration metrics, species protection indices, and ecosystem health indicators. Tasks like beach cleanups and conservation efforts are evaluated for their contribution to biodiversity using the STAR metric (Species Threat Abatement and Restoration). This holistic approach ensures we're addressing multiple facets of environmental protection.",
        icon: "globe" as const,
      },
      {
        title: "Waste Reduction Calculation",
        content:
          "Our platform quantifies waste reduction through comprehensive lifecycle analysis of materials recovered through cleanup and recycling tasks. We track plastic, e-waste, glass, metal, and other materials, calculating both the immediate environmental benefit and the long-term impact of proper disposal or recycling. This data feeds into our community waste reduction dashboards and individual impact profiles.",
        icon: "layers" as const,
      },
      {
        title: "Water Conservation Tracking",
        content:
          "Water-focused eco-actions are measured through our water conservation framework, which calculates gallons saved, protected, or cleaned through various tasks. The system accounts for both direct water conservation (e.g., beach cleanups) and indirect savings (e.g., promoting water-efficient practices). Each verified action contributes to user and community water conservation metrics visible on the impact dashboard.",
        icon: "infinity" as const,
      },
    ],
  };

  return (
    <>
      <AnimatedDivider variant="leaves" />
      <TheoreticalSection {...blockchainSection} />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50/70 dark:bg-green-900/20">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-green-800 dark:text-green-100 mb-6">
              Seamless Technology Integration
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              GreenTask brings together blockchain, environmental science, and 
              community engagement into one unified platform.
            </p>
          </motion.div>
          
          <FloatingCards />
        </div>
      </div>
      
      <AnimatedDivider variant="waves" />
      <TheoreticalSection {...impactSection} />
      <AnimatedDivider variant="particles" />
    </>
  );
};

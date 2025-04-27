import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 hover:shadow-raised hover:border-primary-100 transition-all duration-300"
    >
      <div className="mb-4 p-3 bg-primary-50 rounded-lg inline-block">
        {icon}
      </div>
      <h3 className="text-xl font-heading font-semibold text-primary-900 mb-3">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </motion.div>
  );
};
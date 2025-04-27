import React from 'react';
import { motion } from 'framer-motion';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  step: number;
  align: 'left' | 'right';
}

export const StepCard: React.FC<StepCardProps> = ({ 
  icon, 
  title, 
  description, 
  color, 
  step, 
  align 
}) => {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: align === 'left' ? -30 : 30 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`relative ${align === 'left' ? 'md:ml-8' : 'md:mr-8'}`}
    >
      {/* Step Number for mobile */}
      <div className="md:hidden absolute -left-4 top-4 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
        {step}
      </div>
      
      {/* Connection Dot for desktop */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-4 border-primary-200 z-20"
        style={{ 
          [align === 'left' ? 'right' : 'left']: '-35px',
        }}
      >
        <span className="absolute inset-0 flex items-center justify-center font-bold text-primary-700">
          {step}
        </span>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-100 ml-4 md:ml-0">
        <div className={`mb-4 p-3 ${color} rounded-lg inline-block`}>
          {icon}
        </div>
        <h3 className="text-xl font-heading font-semibold text-primary-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
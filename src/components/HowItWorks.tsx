import React from 'react';
import { motion } from 'framer-motion';
import { UserRoundPlus, UserRoundSearch, MessageCircle, Calendar } from 'lucide-react';
import { StepCard } from './ui/StepCard';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <UserRoundPlus className="w-8 h-8 text-white" />,
      title: 'Create Your Profile',
      description: 'Sign up and build your profile highlighting your interests, goals, and academic background.',
      color: 'bg-primary-600',
    },
    {
      icon: <UserRoundSearch className="w-8 h-8 text-white" />,
      title: 'Find Your Mentor',
      description: 'Browse alumni profiles based on industry, expertise, and interests to find your ideal mentor.',
      color: 'bg-secondary-500',
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: 'Connect and Engage',
      description: 'Join discussion groups, forums, and livestreams to engage with the community.',
      color: 'bg-navy-600',
    },
    {
      icon: <Calendar className="w-8 h-8 text-white" />,
      title: 'Schedule Sessions',
      description: 'Book 1-on-1 mentoring sessions with alumni for personalized guidance and advice.',
      color: 'bg-primary-600',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
            How AlumUnity Works
          </h2>
          <p className="text-lg text-gray-600">
            Getting started with AlumUnity is simple. Follow these steps to connect with alumni 
            and make the most of your university network.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute left-1/2 top-24 bottom-24 w-0.5 bg-gray-200 -translate-x-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                color={step.color}
                step={index + 1}
                align={index % 2 === 0 ? 'right' : 'left'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { motion } from 'framer-motion';
import { Video, Users, MessageSquare, CalendarClock, Folder } from 'lucide-react';
import { FeatureCard } from './ui/FeatureCard';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <CalendarClock className="w-8 h-8 text-primary-600" />,
      title: '1-to-1 Live Sessions',
      description: 'Schedule personalized mentoring sessions with alumni for career guidance, resume reviews, and interview prep.',
    },
    {
      icon: <Video className="w-8 h-8 text-primary-600" />,
      title: 'Alumni Livestreams',
      description: 'Join industry-specific livestreams hosted by experienced alumni to gain insights and expand your knowledge.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: 'Discussion Groups',
      description: 'Connect with peers and alumni in specialized groups based on career interests, majors, and industries.',
    },
    {
      icon: <Folder className="w-8 h-8 text-primary-600" />,
      title: 'Opportunities Board',
      description: 'Access exclusive job postings, internships, and networking events shared directly by alumni.',
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary-600" />,
      title: 'Dedicated Forums',
      description: 'Engage in structured discussions with alumni and peers about career paths and professional development.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
            Connect, Learn, and Grow Together
          </h2>
          <p className="text-lg text-gray-600">
            AlumUnity provides powerful features to facilitate meaningful connections 
            between students and alumni, creating a thriving community for knowledge sharing.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
import React from 'react';
import { GraduationCap, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'For Students', href: '#for-students' },
        { name: 'For Alumni', href: '#for-alumni' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Press', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Community Guidelines', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ],
    },
  ];
  
  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, href: '#' },
    { icon: <Twitter className="w-5 h-5" />, href: '#' },
    { icon: <Instagram className="w-5 h-5" />, href: '#' },
    { icon: <Facebook className="w-5 h-5" />, href: '#' },
  ];

  return (
    <footer className="bg-primary-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
              <span className="text-xl font-heading font-bold">
                AlumUnity
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Bridging the gap between students and alumni to create 
              a supportive community for career development and networking.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="text-white hover:text-primary-200 transition-colors p-2 bg-primary-800 rounded-full"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-primary-800 pt-8 mt-8 text-center md:text-left md:flex md:items-center md:justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} AlumUnity. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm mx-3">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm mx-3">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm mx-3">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
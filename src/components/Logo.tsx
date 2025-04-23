import React from 'react';
import { Users } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-2">
        <Users className="h-6 w-6 text-white" />
      </div>
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        AlumUnity
      </h1>
    </div>
  );
};

export default Logo;
import React from 'react';
import { Instagram } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="px-4 py-2 flex items-center justify-center">
        <Instagram className="w-8 h-8" />
      </div>
    </div>
  );
};
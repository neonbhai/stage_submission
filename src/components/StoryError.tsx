import React from 'react';
import { AlertCircle } from 'lucide-react';

export const StoryError: React.FC = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
      <AlertCircle className="w-12 h-12 mb-4 text-white/80" />
      <p className="text-sm font-medium text-white/80 mb-2">Story unavailable</p>
      <p className="text-xs text-white/60">The story could not be loaded.</p>
    </div>
  );
};
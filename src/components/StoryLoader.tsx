import React from 'react';

export const StoryLoader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};
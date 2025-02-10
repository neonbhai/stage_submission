import React from 'react';
import { ImagePlus } from 'lucide-react';

export const CreatePage: React.FC = () => {
  return (
    <div className="p-4 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
      <ImagePlus size={48} className="text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Create new post</h2>
      <p className="text-gray-500 text-center mb-4">Share photos and videos with your followers</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium">
        Select from device
      </button>
    </div>
  );
};
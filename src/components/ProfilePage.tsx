import React from 'react';
import { Settings, Grid, Bookmark } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="pb-16">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">sarah_designs</h2>
          <button aria-label="Settings">
            <Settings size={24} />
          </button>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden mr-8">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Sarah Johnson"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-1 items-center justify-around">
            <div className="text-center">
              <div className="font-semibold">3</div>
              <div className="text-sm text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">1.2k</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">892</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-semibold">Sarah Johnson</h3>
          <p className="text-sm">Digital designer & illustrator ✨</p>
          <p className="text-sm text-blue-500">www.sarahdesigns.com</p>
        </div>
        
        <button className="w-full py-1.5 bg-gray-100 rounded-lg font-medium">
          Edit Profile
        </button>
      </div>
      
      <div className="flex border-b">
        <button className="flex-1 py-3 border-b-2 border-black">
          <Grid size={24} className="mx-auto" />
        </button>
        <button className="flex-1 py-3">
          <Bookmark size={24} className="mx-auto text-gray-400" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-0.5">
        {[1, 2, 3].map((post) => (
          <div key={post} className="aspect-square bg-gray-100" />
        ))}
      </div>
    </div>
  );
};
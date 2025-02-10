import React from 'react';

export const ActivityPage: React.FC = () => {
  return (
    <div className="p-4 pb-16">
      <h2 className="text-xl font-semibold mb-4">Activity</h2>
      <div className="space-y-4">
        <p className="text-gray-500 text-center mt-8">No new activity</p>
      </div>
    </div>
  );
};
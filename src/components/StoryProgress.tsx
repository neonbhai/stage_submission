import React from 'react';
import { Story } from '../types/story';

interface StoryProgressProps {
  stories: Story[];
  currentIndex: number;
  progress: number;
}

export const StoryProgress: React.FC<StoryProgressProps> = ({
  stories,
  currentIndex,
  progress,
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
      {stories.map((story, idx) => (
        <div
          key={story.id}
          className="h-0.5 bg-gray-600 flex-1 overflow-hidden"
        >
          <div
            className="h-full bg-white transition-all duration-100"
            style={{
              width: `${
                idx === currentIndex
                  ? progress
                  : idx < currentIndex
                  ? "100"
                  : "0"
              }%`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
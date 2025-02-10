import React from 'react';
import { User } from '../types/story';

interface StoryThumbnailProps {
  user: User;
  hasActiveStory: boolean;
  viewed: boolean;
  onClick: () => void;
}

export const StoryThumbnail: React.FC<StoryThumbnailProps> = ({
  user,
  hasActiveStory,
  viewed,
  onClick,
}) => {
  const imageClasses = "w-full h-full rounded-full object-cover aspect-square";
  const isYourStory = user.username === 'sarah_designs';

  return (
    <div className="flex flex-col items-center gap-1" onClick={onClick}>
      <div className="relative w-16 aspect-square">
        <div
          className={`absolute inset-0 rounded-full ${
            !viewed
              ? "bg-gradient-to-tr from-yellow-400 to-pink-500 p-[2px]"
              : "ring-2 ring-gray-300 ring-offset-2"
          }`}
        >
          <div
            className={
              !viewed ? "bg-white rounded-full p-[2px]" : undefined
            }
          >
            <img
              src={user.profilePicture}
              alt={isYourStory ? "Your Story" : user.username}
              className={imageClasses}
            />
          </div>
        </div>
      </div>
      <span className="text-xs truncate w-16">
        {isYourStory ? "Your Story" : user.username}
      </span>
    </div>
  );
};
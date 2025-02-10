import React, { useState, useCallback } from 'react';
import { X, MoreHorizontal } from 'lucide-react';
import { User } from '../types/story';
import { StoryModal } from './StoryModal';
import { getTimeAgo } from '../utils/time';

interface StoryHeaderProps {
  user: User;
  timestamp: string;
  onClose: () => void;
}

export const StoryHeader: React.FC<StoryHeaderProps> = ({ user, timestamp, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className="absolute top-4 left-0 right-0 z-10 flex items-center px-4 mt-2">
        <div className="flex items-center transition-transform duration-300 ease-in-out">
          <img
            src={user.profilePicture}
            alt={`${user.username}'s profile`}
            className="w-8 h-8 rounded-full transition-opacity duration-300"
          />
          <div className="ml-2 flex items-center">
            <span className="text-white font-semibold transition-opacity duration-300">
              {user.username}
            </span>
            <time className="text-white/60 text-sm ml-2" dateTime={timestamp}>
              • {getTimeAgo(timestamp)}
            </time>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button 
            onClick={handleOpenModal}
            className="text-white transition-opacity duration-300 hover:opacity-80"
            aria-label="More options"
          >
            <MoreHorizontal size={24} />
          </button>
          <button 
            onClick={onClose} 
            className="text-white transition-opacity duration-300 hover:opacity-80"
            aria-label="Close story"
          >
            <X size={24} />
          </button>
        </div>
      </div>
      <StoryModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
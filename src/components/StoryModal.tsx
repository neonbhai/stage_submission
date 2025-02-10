import React from 'react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-gray-100 rounded-t-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4">
          <button 
            className="w-full py-2 text-red-500 font-medium text-md"
            onClick={onClose}
          >
            Report this account
          </button>
        </div>
      </div>
    </div>
  );
};
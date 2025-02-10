import React from 'react';
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';

interface BottomNavigationBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const BottomNavigationBar: React.FC<BottomNavigationBarProps> = ({ currentPage, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate('home')}
            className={`p-2 ${currentPage === 'home' ? 'text-black' : 'text-gray-500'}`}
            aria-label="Home"
          >
            <Home size={24} />
          </button>
          <button
            onClick={() => onNavigate('explore')}
            className={`p-2 ${currentPage === 'explore' ? 'text-black' : 'text-gray-500'}`}
            aria-label="Explore"
          >
            <Search size={24} />
          </button>
          <button
            onClick={() => onNavigate('create')}
            className={`p-2 ${currentPage === 'create' ? 'text-black' : 'text-gray-500'}`}
            aria-label="Create"
          >
            <PlusSquare size={24} />
          </button>
          <button
            onClick={() => onNavigate('activity')}
            className={`p-2 ${currentPage === 'activity' ? 'text-black' : 'text-gray-500'}`}
            aria-label="Activity"
          >
            <Heart size={24} />
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`p-2 ${currentPage === 'profile' ? 'text-black' : 'text-gray-500'}`}
            aria-label="Profile"
          >
            <User size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};
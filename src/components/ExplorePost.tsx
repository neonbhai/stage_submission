import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Play } from 'lucide-react';
import { ExplorePost as ExplorePostType } from '../types/explore';

interface ExplorePostProps {
  post: ExplorePostType;
}

export const ExplorePost: React.FC<ExplorePostProps> = ({ post }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const aspectRatioClass = post.aspectRatio === 'vertical' ? 'row-span-2' : '';

  return (
    <div className={`relative group ${aspectRatioClass}`}>
      {post.type === 'video' ? (
        <>
          <video
            ref={videoRef}
            src={post.url}
            poster={post.thumbnail}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            onClick={handleVideoClick}
          />
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={48} className="text-white opacity-80" fill="white" />
            </div>
          )}
        </>
      ) : (
        <img
          src={post.url}
          alt="Explore post"
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4 text-white">
        <div className="flex items-center">
          <Heart size={20} className="fill-white" />
          <span className="ml-1 text-sm font-semibold">{post.likes}</span>
        </div>
        <div className="flex items-center">
          <MessageCircle size={20} className="fill-white" />
          <span className="ml-1 text-sm font-semibold">{post.comments}</span>
        </div>
      </div>
    </div>
  );
};
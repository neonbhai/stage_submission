import React, { useState, useCallback, useRef } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post as PostType } from '../types/post';
import { getTimeAgo } from '../utils/time';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const doubleClickTimer = useRef<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleLike = useCallback(() => {
    if (!isLiked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
    setIsLiked(prev => !prev);
  }, [isLiked]);

  const handleDoubleClick = useCallback(() => {
    if (!isLiked) {
      handleLike();
    }
  }, [isLiked, handleLike]);

  const handleImageClick = useCallback(() => {
    if (doubleClickTimer.current === null) {
      doubleClickTimer.current = window.setTimeout(() => {
        doubleClickTimer.current = null;
      }, 300);
    } else {
      clearTimeout(doubleClickTimer.current);
      doubleClickTimer.current = null;
      handleDoubleClick();
    }
  }, [handleDoubleClick]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleLike();
    }
  }, [handleLike]);

  const handleSave = useCallback(() => {
    setIsSaved(prev => !prev);
  }, []);

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1610337673044-720471f83677?w=1080&q=80';
  }, []);

  return (
    <article className="bg-white border-b border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <img
            src={post.user.profilePicture}
            alt={`${post.user.username}'s profile`}
            className="w-8 h-8 rounded-full object-cover"
            onError={handleImageError}
          />
          <span className="font-semibold">{post.user.username}</span>
        </div>
        <button 
          className="text-gray-600"
          aria-label="More options"
        >
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div 
        className="relative aspect-square"
        onClick={handleImageClick}
        onKeyPress={handleKeyPress}
        tabIndex={0}
        role="button"
        aria-label={`${post.user.username}'s post. Double click to like`}
      >
        <img
          ref={imageRef}
          src={post.images[0]}
          alt={post.caption}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart
              size={96}
              className="text-white animate-like-heart"
              fill="currentColor"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              className={`transition-colors ${isLiked ? 'text-red-500' : 'text-gray-900'}`}
              onClick={handleLike}
              aria-label={isLiked ? 'Unlike post' : 'Like post'}
              aria-pressed={isLiked}
            >
              <Heart 
                size={24} 
                fill={isLiked ? 'currentColor' : 'none'}
                className={isLiked ? 'animate-like-button' : ''}
              />
            </button>
            <button 
              className="text-gray-900"
              aria-label="Comment on post"
            >
              <MessageCircle size={24} />
            </button>
            <button 
              className="text-gray-900"
              aria-label="Share post"
            >
              <Send size={24} />
            </button>
          </div>
          <button
            className="transition-colors text-gray-900"
            onClick={handleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save post'}
            aria-pressed={isSaved}
          >
            <Bookmark size={24} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Likes */}
        <div className="font-semibold mb-1">{post.likes.toLocaleString()} likes</div>

        {/* Caption */}
        <div className="mb-1">
          <span className="font-semibold mr-2">{post.user.username}</span>
          {post.caption}
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <button 
            className="text-gray-500 mb-1"
            aria-label={`View all ${post.comments.length} comments`}
          >
            View all {post.comments.length} comments
          </button>
        )}
        {post.comments.slice(0, 2).map((comment) => (
          <div key={comment.id} className="mb-1">
            <span className="font-semibold mr-2">{comment.username}</span>
            {comment.text}
          </div>
        ))}

        {/* Timestamp */}
        <time className="text-gray-500 text-xs uppercase" dateTime={post.timestamp}>
          {getTimeAgo(post.timestamp)}
        </time>
      </div>
    </article>
  );
};
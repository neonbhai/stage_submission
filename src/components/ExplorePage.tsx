import React, { useState, useMemo } from 'react';
import { SearchBar } from './SearchBar';
import { ExplorePost } from './ExplorePost';
import exploreData from '../data/explore.json';
import type { ExplorePost as ExplorePostType } from '../types/explore';

export const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return exploreData.posts;
    const query = searchQuery.toLowerCase();
    return exploreData.posts.filter(post => 
      post.id.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="pb-16">
      <div className="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </div>
      <div className="grid grid-cols-3 auto-rows-fr gap-0.5">
        {filteredPosts.map((post: ExplorePostType) => (
          <ExplorePost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
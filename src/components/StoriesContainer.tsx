import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import { StoriesList } from './StoriesList';
import { StoryViewer } from './StoryViewer';
import { StoryGroup } from '../types/story';

interface StoriesContainerProps {
  initialStoryGroups: StoryGroup[];
}

export const StoriesContainer: React.FC<StoriesContainerProps> = ({ initialStoryGroups }) => {
  const [storyGroups, setStoryGroups] = useState(initialStoryGroups);
  const [activeStory, setActiveStory] = useState<{
    groupIndex: number;
    storyIndex: number;
  } | null>(null);

  const handleStoryClick = (groupIndex: number, storyIndex: number) => {
    setActiveStory({ groupIndex, storyIndex });
  };

  const handleStoryViewed = (groupIndex: number, storyIndex: number) => {
    setStoryGroups(prevGroups => {
      const newGroups = [...prevGroups];
      const group = { ...newGroups[groupIndex] };
      const stories = [...group.stories];
      stories[storyIndex] = { ...stories[storyIndex], viewed: true };
      group.stories = stories;
      newGroups[groupIndex] = group;
      return newGroups;
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-4 py-2 flex items-center justify-center">
          <Instagram className="w-8 h-8" />
        </div>
      </div>
      <StoriesList
        storyGroups={storyGroups}
        onStoryClick={handleStoryClick}
      />
      {activeStory && (
        <StoryViewer
          storyGroups={storyGroups}
          initialGroupIndex={activeStory.groupIndex}
          initialStoryIndex={activeStory.storyIndex}
          onClose={() => setActiveStory(null)}
          onStoryViewed={handleStoryViewed}
        />
      )}
    </div>
  );
};
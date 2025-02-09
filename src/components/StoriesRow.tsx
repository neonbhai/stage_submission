import React, { useState } from 'react';
import { StoriesList } from './StoriesList';
import { StoryViewer } from './StoryViewer';
import { StoryGroup } from '../types/story';

interface StoriesRowProps {
  initialStoryGroups: StoryGroup[];
}

export const StoriesRow: React.FC<StoriesRowProps> = ({ initialStoryGroups }) => {
  const [activeStory, setActiveStory] = useState<{
    groupIndex: number;
    storyIndex: number;
  } | null>(null);
  const [storyGroups, setStoryGroups] = useState(initialStoryGroups);

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
    <>
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
    </>
  );
};
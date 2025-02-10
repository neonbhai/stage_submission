import React from 'react';
import { StoryThumbnail } from './StoryThumbnail';
import { StoryGroup } from '../types/story';

interface StoriesListProps {
  storyGroups: StoryGroup[];
  onStoryClick: (groupIndex: number, storyIndex: number) => void;
}

export const StoriesList: React.FC<StoriesListProps> = ({ storyGroups, onStoryClick }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex space-x-4 p-4">
        {storyGroups.map((group, groupIndex) => (
          <StoryThumbnail
            key={group.userId}
            user={group.stories[0].user}
            hasActiveStory={group.stories.some(story => !story.viewed)}
            viewed={group.stories.every(story => story.viewed)}
            onClick={() => onStoryClick(groupIndex, 0)}
          />
        ))}
      </div>
    </div>
  );
};
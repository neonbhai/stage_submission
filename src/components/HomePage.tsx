import React from 'react';
import { Logo } from './Logo';
import { StoriesRow } from './StoriesRow';
import { PostsList } from './PostsList';
import { StoryGroup } from '../types/story';
import { Post } from '../types/post';

interface HomePageProps {
  storyGroups: StoryGroup[];
  posts: Post[];
}

export const HomePage: React.FC<HomePageProps> = ({ storyGroups, posts }) => {
  return (
    <>
      <Logo />
      <StoriesRow initialStoryGroups={storyGroups} />
      <PostsList posts={posts} />
    </>
  );
};
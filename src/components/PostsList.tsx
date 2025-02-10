import React from 'react';
import { Post as PostType } from '../types/post';
import { Post } from './Post';

interface PostsListProps {
  posts: PostType[];
}

export const PostsList: React.FC<PostsListProps> = ({ posts }) => {
  return (
    <div className="flex flex-col pb-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
export interface ExplorePost {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  likes: number;
  comments: number;
  aspectRatio?: 'square' | 'vertical';
}

export interface ExploreData {
  posts: ExplorePost[];
}
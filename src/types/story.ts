export interface User {
  id: string;
  username: string;
  profilePicture: string;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  timestamp: string;
  viewed: boolean;
}

export interface StoryGroup {
  userId: string;
  stories: Story[];
}
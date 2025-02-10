export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: {
    id: string;
    username: string;
    profilePicture: string;
  };
  images: string[];
  caption: string;
  likes: number;
  timestamp: string;
  comments: Comment[];
}
export interface PropsData {
  _id: string;
  user: {
    _id: string;
    username: string;
  };
  content: string;
  likes: number;
  replies: string[]
  createdAt: string;
} 
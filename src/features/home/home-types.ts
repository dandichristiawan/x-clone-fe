export interface PropsData {
  _id: string;
  user: {
    _id: string;
    username: string;
    fullname: string;
  };
  content: string;
  likes: number;
  replies: string[];
  createdAt: string;
}

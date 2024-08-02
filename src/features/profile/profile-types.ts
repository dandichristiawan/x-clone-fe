export interface PropsData {
  userId: string;
  username: string;
  email: string;
  fullname: string;
  createdAt: string;
  followers: number;
  following: number;
  posts: number;
  likes: number;
}

export interface Likes {
  _id: string;
  user: {
    _id: string;
    fullname: string;
    username: string;
  };
  content: string;
  likes: number;
  replies: Replies[];
  createdAt: string;
}

export interface Posts {
  _id: string;
  content: string;
  likes: number;
  replies: Replies[];
  createdAt: string;
}

interface Replies {
  _id: string;
  user: {
    _id: string;
    username: string;
    fullname: string;
  };
  reply: string;
  createdAt: string;
}

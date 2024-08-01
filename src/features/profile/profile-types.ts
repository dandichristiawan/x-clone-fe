export interface PropsData {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  createdAt: string
  followers: number
  following: number
  posts: number
  likes: number
}

export interface Posts {
  _id: string;
  content: string
  likes: number
  replies: Replies[]
  createdAt: string
}

interface Replies {
  _id: string
  user: {
    _id: string
    username: string
    fullname: string
  }
  reply: string
  createdAt: string
}
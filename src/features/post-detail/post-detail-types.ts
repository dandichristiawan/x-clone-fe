export interface PropsData {
    _id: string
    user: {
        _id: string
        username: string
    }
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
    }
    reply: string
}
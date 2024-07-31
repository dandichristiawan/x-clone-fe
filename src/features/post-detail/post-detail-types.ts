export interface PropsData {
    _id: string
    user: {
        _id: string
        username: string
        fullname: string
    }
    content: string
    likes: number
    replies: string[]
    createdAt: string
}

export interface Replies {
    _id: string
    user: {
        _id: string
        username: string
        fullname: string
    }
    reply: string
    createdAt: string
}
export interface PostRequest {
    fileId: string,
    title: string,
    body: string,
    tags?: Array<string>
}

export interface PostResponse {
    fileId: string,
    title: string,
    body: string,
    tags?: Array<string>,
    createdAt: Date,
    userId: string,
    preferences: {
        likes: number,
        dislikes: number
    }
}

export interface PostMeta {
    _id: string,
    fileId: string,
    title: string,
    body: string,
    user: { userId: string, name: string },
    tags?: Array<string>,
    createdAt: Date,
    userId: string,
    updatedAt: Date,
}
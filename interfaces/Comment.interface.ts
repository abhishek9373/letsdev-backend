export interface commentPipeline{
    _id: string,
    text: string,
    user: { _id: string, name: string },
    createdAt: Date,
    likes: number,
    dislikes: number
}

export interface commentsWithInteractions extends commentPipeline{
    interaction : { isliked: boolean, isdisliked: boolean }
}
export interface Post {
    _id: string,
    tags: Array<string>,
    title: string,
    body: string,
    createdAt: Date,
    user: { _id: string, name: string },
    file: { _id: string }
}

export interface PostWithImages {
    _id: string,
    tags: Array<string>,
    title: string,
    body: string,
    createdAt: Date,
    user: { _id: string, name: string },
    image: [{ url: string }]
}


export interface PostWithPreferences {
        _id: string,
        tags: Array<string>,
        title: string,
        body: string,
        createdAt: Date,
        user: { _id: string, name: string },
        image: [{ url: string }]
        preferences: { likes: number, dislikes: number, shares: number }
}

export interface FinalPosts {
    _id: string,
    tags: Array<string>,
    title: string,
    body: string,
    createdAt: Date,
    user: { _id: string, name: string },
    image: [{ url: string }]
    preferences: { likes: number, dislikes: number, shares: number },
    interaction: { isliked: boolean, isdisliked: boolean }
}

export interface Post_Interaction_Matrix {
    likes: number,
    dislikes: number,
    shares: number
}
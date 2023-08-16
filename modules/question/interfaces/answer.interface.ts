export interface Answer {
    _id: string
    description: string,
    code?: string,
    createdAt: string,
    votes: number,
    user: User    
}

interface User{
    name: string,
    userId: string,
    stars: number,
    profileViews: number
}
export interface QustionInterface{
    userId: string,
    _id: string,
    title: string,
    description: string;
    output: string;
    code: string;
    user: User;
    createdAt: Date;
}

interface User{
    name :string;
    _id: string,
    stars: number,
    profileViews: number
}
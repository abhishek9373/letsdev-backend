export default interface UserI {
    name?: string,
    isVerified: boolean,
    email: string,
    password: string,
    gender?: string,
    branch?:string,
    createdAt: Date,
    updatedAt: Date,
    _id: string,
    sessionId?: string
}

export interface User{
    name: string,
    _id: string
}
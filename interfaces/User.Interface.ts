export default interface UserI {
    name?: string,
    isVerified: boolean,
    email: string,
    password: string,
    gender?: number,
    branch?:string,
    createdAt: Date,
    updatedAt: Date,
    _id: string,
    sessionId?: string
}
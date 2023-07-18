export default interface UserI {
    name?: string,
    email: string,
    password: string,
    gender?: number,
    branch?:string,
    createdAt: Date,
    updatedAt: Date,
    _id: string,
    sessionId?: string
}
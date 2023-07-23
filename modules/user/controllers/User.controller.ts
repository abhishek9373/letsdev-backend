import { Session, User } from "../../../models";
import UserService from "../services/User.service";
import UserI from "../../../interfaces/User.Interface";
import { NoRecordFoundError } from "../../../lib/errors";
import { Response, NextFunction } from "express";
import { Request } from "express";

export default class userController extends UserService {
    constructor({ model = User }: { model: any }) { super({ model }) }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: any = req.user._id;
            const newInfo: updateUser = req.body;
            const user: UserI = await User.findById(userId).lean();
            if(!user){
                return next(new NoRecordFoundError("user not found"));
            }
            const updatedUser: UserI = await User.findByIdAndUpdate(userId, newInfo, { new: true }).lean();
            res.status(200).json({ data: true });
        } catch (error) {
            throw (error);
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: any = req.user._id;
            const user: UserI = await User.findById(userId, { createdAt: 0, updatedAt: 0, password: 0 }).lean();
            if(!user){
                return next(new NoRecordFoundError("user not found"));
            }
            res.status(200).json({ ...user });
        } catch (error) {
            throw (error);
        }
    }
// verify user for evry reload or page changed
    async verify(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({ data: true });
        } catch (error) {
            throw (error);
        }
    }

    async logOut(req: Request, res: Response, next: NextFunction) {
        try {
            const userId: any = req.user._id;
            await Session.findByIdAndDelete(userId);
            res.status(401).json({ data: true });
        } catch (error) {
            throw (error);
        }
    }
}


interface updateUser{
    name: string,
    gender: number,
    branch: string
}
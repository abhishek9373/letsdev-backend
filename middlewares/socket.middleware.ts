import { ExtendedError } from "socket.io/dist/namespace";
import { UnauthenticatedError } from "../lib/errors";
import { readFileSync } from 'fs'
import jwt from 'jsonwebtoken'
import UserI from "../interfaces/User.Interface";
import { User } from "../models";

const publicKey = readFileSync(__dirname + "/" + "pubjwt_key.pem", "utf8");
export class SocketMiddlewares {

    async authenticate(socket: any, next: (err?: ExtendedError | undefined) => void) {
        try {
            const token: any = socket.handshake.query?.token;
            // implement token authentication
            if (!token) {
                return next(new UnauthenticatedError("credentials required"));
            }
            // decrypt token
            try {
                const tokenPayload: any = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
                if (!tokenPayload) {
                    return next(new UnauthenticatedError("invalid credetials"));
                }
                const user: UserI = await User.findById(tokenPayload.userId, { profileViews: 0, stars: 0, createdAt: 0, updatedAt: 0, password: 0 }).lean();
                socket.user = user;
                next();
            } catch (error: any) {
                throw (error);
            }
        } catch (error: any) {
            throw (error);
        }
    }
}
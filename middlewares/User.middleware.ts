import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { User, Session } from '../models/index';
import { NextFunction } from 'express';
const { UnauthenticatedError, BadRequestParameterError } = require('../lib/errors');
const publicKey = readFileSync(__dirname + "/" + "pub_key.pem", "utf8");

class UserMiddleware {
	/**
	 * Middleware to check if user is admin
	 * @param req
	 * @param res
	 * @param next
	 * @returns {Promise<void>}
	 */
	authenticate:any = async (req: any, res: Response, next: NextFunction) => {
		try {
			let token: string = req.headers['authorization'];
			if (!token) {
				return next(new UnauthenticatedError("user not authorised"));
			}
			token = token.substring(7);
			const user: any = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
			const userDetails = await User.findById(user.userId, { _v: 0 }).lean();
			if (userDetails) {
				req.user = userDetails;
				const session = await Session.findOne({ userId: userDetails._id })
				if (session) {
					// check if session expired or not
					const expiryDate = new Date(session.expiresAt);
					const currentDate = new Date();
					if (currentDate > expiryDate) {
						return next(new UnauthenticatedError("session expired retry after login"));
					}
					req.isLoggedIn = true;
					return next();
				}
				return next(new UnauthenticatedError("session not found retry after login login"));
			}
			else {
				return next(new UnauthenticatedError("Token is not valid"));
			}
		} catch (err) {
			return next(new BadRequestParameterError("invalid or empty authtoken recived required not null"))
		}
	};

	/**
	 * Middleware to check if user is admin
	 * @param req
	 * @param res
	 * @param next
	 * @returns {Promise<void>}
	 */
	// const isAdmin = async (req, res, next) => {
	//     try {
	//         if (req.user.isAdmin !== true) {
	// 			return next(new UnauthorisedError(MESSAGE.NOT_ADMIN));
	// 		}
	// 		next()
	//     } catch (error) {
	//         next(error);
	//     }
	// }

}

export default UserMiddleware;



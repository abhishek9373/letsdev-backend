const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const { User, Session } = require('../models');
const { UnauthorisedError, UnauthenticatedError, NoRecordFoundError, BadRequestParameterError } = require('../lib/errors');
const publicKey = readFileSync(__dirname + "/" + "pub_key.pem", "utf8");

/**
 * Middleware to check if user is admin
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
	const authenticate = async (req, res, next) => {
		try{
			if(req.method == "GET"){
				let token = req.headers['authorization'];
				if(req.baseUrl == "/flat"){
					if(!token){
						req.isLoggedIn = false;
						return next();
					}
				}
			}
			let token = req.headers['authorization'];
			if(!token){
				return next(new UnauthenticatedError("authtoken require"))
			}
			token = token.substring(7);
			const user = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
			const userDetails = await User.findById(user.userId, { _v : 0 }).lean();
			if(userDetails){
				req.user = userDetails;
				const session = await Session.findOne({ userId : userDetails._id })
				if(session){
					// check if session expired or not
					const expiryDate = new Date(session.expiresAt);
					const currentDate = new Date();
					if(currentDate > expiryDate){
						return next(new UnauthenticatedError("session expired retry after login"));
					}
					req.isLoggedIn = true;
					return next();
				}
				return next(new UnauthenticatedError("session not found retry after login login"));
			}
			else{
				return next(new UnauthenticatedError("Token is not valid"));
			}
		}catch(err){
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

module.exports = {
	authenticate,
};

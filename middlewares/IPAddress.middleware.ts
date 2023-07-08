import { Response, NextFunction } from "express";
export const IPAddressMiddleware = async (req: any, res: Response, next:NextFunction) => {
	try {
		req.IPAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		req.userAgent = req.headers['user-agent'];
		next();
	}
	catch (err) {
		next(err);
	}
}

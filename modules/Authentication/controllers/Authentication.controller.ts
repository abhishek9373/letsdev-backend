import { Request, Response, NextFunction } from 'express';
import { DuplicateRecordFoundError, BadRequestParameterError } from "../../../lib/errors";
import AuthenticationService from "../services/Authentication.service";
const authenticationService = new AuthenticationService();

export class AuthenticationController {
  async login(req: any, res: Response, next: NextFunction) {
    try {
      const { deviceId, firebaseToken, deviceModel, deviceOS, appVersion } = req.body;
      const userId = req.user._id;
      const response = await authenticationService.login({
        deviceId,
        firebaseToken,
        deviceModel,
        deviceOS,
        appVersion,
        IPAddress: req.IPAddress,
        userAgent: req.headers["user-agent"],
        userId
      });
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Controller to link Google account
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async newUser(req: any, res: Response, next: NextFunction) {
    try {
      // const { phone } = req.body;
      // const { IPAddress, userAgent } = req;
      // // check for existing account 
      // const user = await User.findOne({ mobile: phone });
      // if (user) {
      //   const { deviceId, firebaseToken, deviceModel, deviceOS, appVersion } = req.body;
      //   const response = await authenticationService.login({ deviceId, firebaseToken, deviceModel, deviceOS, appVersion, IPAddress, userAgent, userId: user._id });
      //   res.status(201).json({ data: response });
      // } else {
      //   const currentUser = await User.create({ mobile: phone });
      //   if (currentUser) {
      //     const { deviceId, firebaseToken, deviceModel, deviceOS, appVersion } = req.body;
      //     const user = await authenticationService.login({ deviceId, firebaseToken, deviceModel, deviceOS, appVersion, IPAddress, userAgent, userId: currentUser._id });
      //     res.status(201).json({ data: user });
      //   } else {
      //     next(new BadRequestParameterError("Something Went Wrong"));
      //   }
      // }
    } catch (err) {
      next(new DuplicateRecordFoundError("User already present with that number"));
    }
  }
}

export default AuthenticationController;

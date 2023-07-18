import { Response, NextFunction } from 'express';
import { BadRequestParameterError, DuplicateRecordFoundError } from "../../../lib/errors";
import UserI from '../../../interfaces/User.Interface';
import { User } from '../../../models';
import AuthenticationService from "../services/Authentication.service";
const authenticationService = new AuthenticationService();


export class AuthenticationController {
  async login(req: any, res: Response, next: NextFunction) {
    try {
      const { deviceId, deviceOS, appVersion, email, password } = req.body;
      // check if user present or not
      let user: UserI | null = await User.findOne({ email }).lean();
      if(!user){
        // verify email and create new user
        // const isEmailOk: Boolean = await authenticationService.verfyEmail(email);
        // if(!isEmailOk){ return res.status(200).json({ message: "email does not exist" }) }
        const encryptPassword: string = await authenticationService.encryptPassword(password);
        const user: any = await User.create({ email, password: encryptPassword });
        const response: string = await authenticationService.login({
          IPAddress: req.IPAddress,
          userAgent: req.headers["user-agent"],
          userId: user._id
        });
        return res.status(400).json({data: response});
      }
      // verfy users password
      const isPasswordOk: boolean = await authenticationService.verifyPassword(password, user.password);
      if(!isPasswordOk){ return next(new BadRequestParameterError("invalid password")) }
      const response: string = await authenticationService.login({
        IPAddress: req.IPAddress,
        userAgent: req.headers["user-agent"],
        userId: user._id
      });
      return res.status(200).json({data: response});
    } catch (error) {
      next(error);
    }
  }
}

export default AuthenticationController;

import { Response, NextFunction } from 'express';
import { BadRequestParameterError } from "../../../lib/errors";
import UserI from '../../../interfaces/User.Interface';
import { User } from '../../../models';
import AuthenticationService from "../services/Authentication.service";
import { EmailSession } from '../../../models';

const authenticationService = new AuthenticationService();


export class AuthenticationController {
  async login(req: any, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      // check if user present or not
      let user: UserI | null = await User.findOne({ email }).lean();
      if(!user){
        // verify email and create new user

        // check if email is verified or not
        await authenticationService.createSessionAndSendEmail(email);

        const encryptPassword: string = await authenticationService.encryptPassword(password);
        const user: any = await User.create({ email, password: encryptPassword });
        const response: string = await authenticationService.login({
          IPAddress: req.IPAddress,
          userAgent: req.headers["user-agent"],
          userId: user._id
        });
        return res.status(200).json({data: response});
      }
      // check if user is verified
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

  async verifyEmail(req: any, res: Response, next: NextFunction) {
    try {
      const { sessionId } = req.params;
      const session = await EmailSession.findById(sessionId).lean();
      if(!session){
        res.setHeader('Content-Type', 'text/html');
        const html = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Letsdev | verify Email</title><style>.root{display: flex;justify-content: center;}.center{display: flex;flex-direction: column;justify-content: center;align-items: center;}.main-container{margin-top:18rem;background-color: #123182;width: 70vw;padding: 4rem;}.heading{font-family: Inter;font-weight: bold;font-size: 2rem;color: white;}</style></head><body><div class='root'><div class='main-container'><div class='center'><p class='heading' style='margin-bottom: 7rem;'>Verification link has expired </p><a href='https://devbuilder.tech/auth/verifyemail' style='text-decoration:none' class='heading'><button>Go to dashboard</button></a></div></div></div></body></html>"
        return res.end(html);
      }
      // session found 
      const email = session.email;
      await User.updateOne({ email }, { isVerified: true });
      await EmailSession.deleteOne({ _id: sessionId });
      res.setHeader('Content-Type', 'text/html');
      const html = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Letsdev | verify Email</title><style>.root{display: flex;justify-content: center;}.center{display: flex;flex-direction: column;justify-content: center;align-items: center;}.main-container{margin-top:18rem;background-color: #123182;width: 70vw;padding: 4rem;}.heading{font-family: Inter;font-weight: bold;font-size: 2rem;color: white;}</style></head><body><div class='root'><div class='main-container'><div class='center'><p class='heading' style='margin-bottom: 7rem;'>email verified successfully! you can leave these page</p><a href='https://devbuilder.tech/auth' style='text-decoration:none' class='heading'><button>Go to dashboard</button></a></div></div></div></body></html>"
      return res.end(html);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthenticationController;


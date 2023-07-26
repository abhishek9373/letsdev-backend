import TokenService from './Token.service';
import { NoRecordFoundError } from '../../../lib/errors';
import { EmailSession, User } from '../../../models';
import { Sessions } from '../../../interfaces/Sessions';
import { jsonwebtoken } from "../../../lib/authentication";
import { EmailService } from '../../../Email.service';

const emailService = new EmailService({ model: User});
const JsonWebToken = new jsonwebtoken();
const tokenService = new TokenService();

class AuthenticationService {
  /**
   * Service to log in a user
   * @param {object} req - http request object
   * @returns {Promise<Object>}
   */
  async login({
    IPAddress,
    userAgent,
    userId,
  }: Sessions): Promise<any> {
    try {
      const currentUserDetails = await User.findById(userId);
      currentUserDetails.userId = currentUserDetails._id;
      const tokenData: Sessions = {
        userId: currentUserDetails._id,
        IPAddress,
        userAgent
      };
      const accessToken: string = await tokenService.issueToken(tokenData);
      return {accessToken}
    } catch (error) {
      throw new NoRecordFoundError("User Not Found");
    }
  }

  /**
  * Service to log in a user
  * @param {object} email - http request object
  * @returns {Promise<Object>}
  */
  async createSessionAndSendEmail(email: string): Promise<any> {
    try {
      // create session
      const session = new EmailSession({
        email: email
      })
      const sessionResponse = await session.save();
      const verifyUrl = `https://devbuilder.tech/services/auth/verifyemail/${sessionResponse._id}`;
      // send email with verify link
      await emailService.sendEmail(email, verifyUrl);

    } catch (error: any) {
      throw(error);
    }
  }

  async verifyPassword(password: string, hash: string):Promise<boolean>{
    const originalPass: boolean = await JsonWebToken.decryptPassword(password, hash);
    return originalPass;
  }

  async encryptPassword(password: string):Promise<string>{
    const newPass: any = await JsonWebToken.encryptPassword(password);
    return newPass;
  }
}

export default AuthenticationService;

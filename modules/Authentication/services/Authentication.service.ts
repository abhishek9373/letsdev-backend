import TokenService from './Token.service';
import { NoRecordFoundError } from '../../../lib/errors';
import { User } from '../../../models';
import { Sessions } from '../../../interfaces/Sessions';
import axios from 'axios';
import { jsonwebtoken } from "../../../lib/authentication";

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
  async verfyEmail(email: String): Promise<any> {
    try {
      const apiKey = 'test_350002eb441ea26bf27cc05433b69fb6c4f8983a672e9ec907d71947c02cae30';
      const response = await axios.get(`https://api.kickbox.com/v2/verify?email=${email}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });

      const { result, reason } = response.data;

      if (result === 'deliverable') {
        return true;
      } else {
        false;
      }
    } catch (error: any) {
      console.error('Error verifying email:', error.message);
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

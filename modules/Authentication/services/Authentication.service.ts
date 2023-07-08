import TokenService from './Token.service';
import { NoRecordFoundError } from '../../../lib/errors';

const tokenService = new TokenService();

class AuthenticationService {
  /**
   * Service to log in a user
   * @param {object} req - http request object
   * @returns {Promise<Object>}
   */
  async login({
    deviceId,
    firebaseToken,
    deviceModel,
    deviceOS,
    appVersion,
    IPAddress,
    userAgent,
    userId,
  }: {
    deviceId: string;
    firebaseToken: string;
    deviceModel: string;
    deviceOS: string;
    appVersion: string;
    IPAddress: string;
    userAgent: string;
    userId: string;
    // Promis<{user:any, accessToken:any}>
  }): Promise<any> {  
    try {
      // const currentUserDetails = await User.findById(userId);
      // currentUserDetails.includeSensitiveInfo = true;
      // currentUserDetails.userId = currentUserDetails._id;
      // const tokenData = {
      //   userId: currentUserDetails._id,
      //   IPAddress,
      //   userAgent,
      //   deviceId,
      //   firebaseToken,
      //   deviceModel,
      //   deviceOS,
      //   appVersion: "1.0.0",
      // };
      // const accessToken: any = await tokenService.issueToken(tokenData);
      return {
        // user: currentUserDetails,
        // accessToken,
      };
    } catch (error) {
      throw new NoRecordFoundError("User Not Found");
    }
  }
}

export default AuthenticationService;

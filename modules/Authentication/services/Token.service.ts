import { Sessions } from "../../../interfaces/Sessions";
import { jsonwebtoken } from "../../../lib/authentication";
import { Session } from "../../../models";
// import { Session, Flat, User } from "../../../models";
import { ExpiriesUtil } from "../../../utils";
// import NotificationService from "../../user/services/Notification.service";

// const notificationService = new NotificationService({ model: User });
const JsonWebToken = new jsonwebtoken();

class Token {
  /**
   *
   * @param userId {objectId} --userId
   * @param userAgent {string} --userAgent
   * @param IpAddress {string} --ip address
   * @param {String} deviceId
   * @param {String} firebaseToken
   * @param {String} deviceOS
   * @param {String} deviceModel
   * @param {Boolean} storeSession
   */
  async issueToken({
    userId,
    userAgent,
    IPAddress,
  }: Sessions): Promise<string> {
    try {
      // code to check whether session for user is already present or not
      let tokenDoc;
      const session = await Session.findOne({ userId }).lean();
      if (session) {
        // update session for same device
        tokenDoc = await Session.findOneAndUpdate(
          { userId },
          {
            userId: userId,
            userAgent: userAgent,
            ip: IPAddress,
            expiresAt: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toDateString(),
          }
        );
      } else {
        const sessions = await Session.find({ userId }).lean();
        if (sessions[0]) {
          tokenDoc = await this.createSession({
            userId: userId,
            userAgent: userAgent,
            ip: IPAddress,
          });
        } else {
          tokenDoc = await this.createSession({
            userId: userId,
            userAgent: userAgent,
            ip: IPAddress
          });
        }
      }
      // create a jwt accessToken with given access token payload
      const accessToken:string = await JsonWebToken.sign({
        payload: { userId, sessionId: tokenDoc._id },
        exp: ExpiriesUtil.ACCESS_TOKEN_EXPIRY,
      });
      return accessToken;
    } catch (error) {
      throw(error)
    }
  }

  async createSession({
    userId,
    userAgent,
    ip,
  }: {
    userId: string;
    userAgent: string;
    ip: string;
  }) {
    try {
      const session = await Session.create({
        userId,
        userAgent,
        ip,
      });
      return session;
    } catch (error) {
      throw error;
    }
  }
}

export default Token;

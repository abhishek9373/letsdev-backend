import { jsonwebtoken } from "../../../lib/authentication";
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
    deviceId,
    firebaseToken,
    deviceOS,
    deviceModel,
    appVersion,
    //  storeSession = false,
    //  expiry
  }: {
    userId: string;
    userAgent: string;
    IPAddress: string;
    deviceId: string;
    firebaseToken: string;
    deviceOS: string;
    deviceModel: string;
    appVersion: string;
    // storeSession?: boolean;
    // expiry?: number;
  }) {
    // try {
    //   const expiresAt = new Date(
    //     Date.now() + ExpiriesUtil.REFRESH_TOKEN_EXPIRY
    //   ).toDateString();

    //   // code to check whether session for user is already present or not
    //   let tokenDoc;
    //   const session = await Session.findOne({ userId, deviceId }).lean();
    //   if (session) {
    //     // update session for same device
    //     tokenDoc = await Session.findOneAndUpdate(
    //       { userId, deviceId },
    //       {
    //         userId: userId,
    //         userAgent: userAgent,
    //         ip: IPAddress,
    //         deviceId,
    //         firebaseToken,
    //         deviceOS,
    //         deviceModel,
    //         appVersion,
    //         expiresAt: new Date(
    //           Date.now() + 7 * 24 * 60 * 60 * 1000
    //         ).toDateString(),
    //       }
    //     );
    //   } else {
    //     const sessions = await Session.find({ userId }).lean();
    //     if (sessions[0]) {
    //       // send notification
    //       // generate notification for old user new login detected
    //       const notificationContent = {
    //         title: "New login detected",
    //         body: `new device login found from device : ${IPAddress}`,
    //         icon:
    //           "https://cdn.dribbble.com/users/648781/screenshots/3201466/house-hub.png",
    //       };
    //       await notificationService.sendNotification({
    //         userId: userId,
    //         content: notificationContent,
    //       });
    //       tokenDoc = await this.createSession({
    //         userId: userId,
    //         userAgent: userAgent,
    //         ip: IPAddress,
    //         deviceId,
    //         firebaseToken,
    //         deviceOS,
    //         deviceModel,
    //         appVersion,
    //       });
    //     } else {
    //       tokenDoc = await this.createSession({
    //         userId: userId,
    //         userAgent: userAgent,
    //         ip: IPAddress,
    //         deviceId,
    //         firebaseToken,
    //         deviceOS,
    //         deviceModel,
    //         appVersion,
    //       });
    //     }
    //   }
    //   // create a jwt accessToken with given access token payload
    //   const accessToken = await JsonWebToken.sign({
    //     payload: { userId, sessionId: tokenDoc._id },
    //     exp: ExpiriesUtil.ACCESS_TOKEN_EXPIRY,
    //   });
    //   return accessToken;
    // } catch (error) {
    //   return error;
    // }
  }

  async createSession({
    userId,
    userAgent,
    ip,
    deviceId,
    firebaseToken,
    deviceOS,
    deviceModel,
    appVersion,
  }: {
    userId: string;
    userAgent: string;
    ip: string;
    deviceId: string;
    firebaseToken: string;
    deviceOS: string;
    deviceModel: string;
    appVersion: string;
  }) {
    // try {
    //   const session = await Session.create({
    //     userId,
    //     userAgent,
    //     ip,
    //     deviceId,
    //     firebaseToken,
    //     deviceOS,
    //     deviceModel,
    //     appVersion,
    //   });
    //   return session;
    // } catch (error) {
    //   throw error;
    // }
  }
}

export default Token;

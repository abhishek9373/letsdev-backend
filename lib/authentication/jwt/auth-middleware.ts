import admin from "firebase-admin";
import serviceAccount from "../../config/admin-private-key.json";
import { BadRequestParameterError, UnauthorisedError } from "../../errors";
// import {config} from "../../config/index";
// import { databaseURL } from "../../config/index";
import Redis from "../../../modules/Authentication/services/Redis.service";
import { TooManyRequestsError } from "../../errors/index";
import axios from 'axios';

const redis = new Redis();

admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  // databaseURL: databaseURL,
});

class Registration {
  async otpAndSessionRegistry(req: any, res: any, next: any) {
    try {
      const { phone, deviceInfo, country } = req.body;
      // check whether session is present or not in redis
      const session = await redis.find({ phone });
      if (session) {
        // if session is already present
        return next(new TooManyRequestsError("OTP already sent"));
      }
      // otherwise send OTP to the user and create a new session
      const OTPResponse = await axios.post('http://144.24.116.99:8080/auth/otp', { phone: phone.toString(), countryCode: country }, {
        headers: {
          "x-api-key": "16feeb8cbb49230b"
        }
      });
      if (OTPResponse.data.success === false) {
        return next(new BadRequestParameterError("WhatsApp account is not present for the given number"));
      }
      if (OTPResponse.status === 200 && OTPResponse.data.success === true) {
        const OTP = OTPResponse.data.otp;
        deviceInfo.otp = OTP;
        // now we have all data to create a session, create Redis session for the user
        const sessionResponse = await redis.save({ phone: phone.toString(), deviceInfo, country });
        if (!sessionResponse.data) {
          return next(new Error());
        }
        res.status(200).json({ data: true });
      }
    } catch (err:any) {
      if (err.errno === -4078) {
        return next(new BadRequestParameterError("OTP server busy, try later"));
      }
      throw err;
    }
  }

  async verifyOTP(req: any, res: any, next: any) {
    try {
      const { otp, phone, deviceInfo } = req.body;
      // check user session in Redis
      const session = await redis.find({ phone });

      if (!session) {
        return next(new UnauthorisedError("Invalid or Expired OTP"));
      }
      // check if device IDs are similar for session deviceInfo and request deviceInfo
      if (session.deviceId === deviceInfo.deviceId && session.otp === otp.toString()) {
        // now user is authenticated, create session and token for user
        next();
      }
      return new UnauthorisedError("Invalid OTP");
    } catch (err) {
      throw err;
    }
  }
}

export { Registration, admin };

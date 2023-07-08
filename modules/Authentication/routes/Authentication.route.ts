import { Router } from 'express';
import AuthenticationController from '../controllers/Authentication.controller';
import { ValidatorMiddleware } from "../../../middlewares";
import { deviceInfoValidator, OTPResquestValidator } from '../validators/deviceValidator';
import { Registration } from '../../../lib/authentication/jwt/auth-middleware';
import { Request, Response, NextFunction } from 'express';

const router: Router = Router();
const registration: Registration = new Registration();
const authenticationController: AuthenticationController = new AuthenticationController();

router.use("*",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      next();
    } catch (error) {
      next(error);
    }
  }
);

/**
 * API to register user into the system
 */
router.post('/register',
  ValidatorMiddleware(deviceInfoValidator),
  registration.otpAndSessionRegistry
);

router.post('/verify',
  ValidatorMiddleware(OTPResquestValidator),
  registration.verifyOTP,
  authenticationController.newUser
);

export default router;

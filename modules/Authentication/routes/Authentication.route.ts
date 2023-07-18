import { Router } from 'express';
import AuthenticationController from '../controllers/Authentication.controller';
import { Request, Response, NextFunction } from 'express';
import { ValidatorMiddleware } from '../../../middlewares';
import { sessionValidator } from '../validators/Authentication.validator';
const router: Router = Router();
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

router.post('/login', ValidatorMiddleware(sessionValidator), authenticationController.login);

export default router;

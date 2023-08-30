import { Router, Request, Response, NextFunction } from 'express';
import ChatController2 from '../controllers/Chat2.controller';
import { ValidatorMiddleware } from '../../../middlewares';
import { list } from '../validators/Chat.validator';

const chatController = new ChatController2();
const router: Router = Router();

// Middleware to diagnose requests for debugging
router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

router.route('/')
    .get(ValidatorMiddleware(list), chatController.getChats)

export default router;

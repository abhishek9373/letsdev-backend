import { Router, Request, Response, NextFunction } from 'express';
import { ValidatorMiddleware } from '../../../middlewares';
import { create, list } from '../validators/question.validator';
import QuestionController from '../controllers/question.controller';

const router: Router = Router();
const questionController = new QuestionController();

// Middleware to diagnose requests for debugging
router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

// Routes
router.route('/')
    .post(ValidatorMiddleware(create), questionController.create)
    .get(ValidatorMiddleware(list), questionController.list)

export default router;

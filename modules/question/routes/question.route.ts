import { Router, Request, Response, NextFunction } from 'express';
import { ValidatorMiddleware } from '../../../middlewares';
import { create, createAnswer, get, list } from '../validators/question.validator';
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

router.route('/:questionId')
    .get(ValidatorMiddleware(get), questionController.get)

router.route('/:questionId/answer')
    .post(ValidatorMiddleware(createAnswer), questionController.createAnswer)

export default router;

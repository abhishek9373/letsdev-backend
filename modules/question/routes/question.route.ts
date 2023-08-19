import { Router, Request, Response, NextFunction } from 'express';
import { ValidatorMiddleware } from '../../../middlewares';
import { create, createAnswer, get, list, listAnswers, vote, voteAnswer } from '../validators/question.validator';
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
    .get(ValidatorMiddleware(listAnswers), questionController.listAnswers)
    .post(ValidatorMiddleware(createAnswer), questionController.createAnswer)

router.route('/:questionId/upvote')
    .patch(ValidatorMiddleware(vote), questionController.upVote)

router.route('/:questionId/downvote')
    .patch(ValidatorMiddleware(vote), questionController.downVote)

router.route('/:questionId/answer/:answerId/upvote')
    .patch(ValidatorMiddleware(voteAnswer), questionController.upVoteAnswer)

router.route('/:questionId/answer/:answerId/downvote')
    .patch(ValidatorMiddleware(voteAnswer), questionController.downVoteAnswer)

export default router;

import { NextFunction, Request, Response } from "express";
import { Answer, Question, User, UserAnswerInteraction, UserQuestionInteraction } from "../../../models";
import QuestionService from "../services/question.service";
import { QustionInterface } from "../interfaces/question.interface";
import { Answer as AnswerI, FinalAnswerI } from "../interfaces/answer.interface";

const questionService = new QuestionService();

class QuestionController {
  /**
   * List all samples.
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @param {Object} next The response object.
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id;
      const { title, output, description, code } = req.body;
      const question = new Question({
        title, output, description, code, userId
      })
      await question.save();
      res.status(201).json({ data: true });
    } catch (error) {
      next(error);
    }
  }

  /**
  * List all samples.
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const page: any = req.query.page;
      const questions: Array<QustionInterface> = await questionService.list(page);
      res.status(200).json({ data: questions });
    } catch (error) {
      next(error);
    }
  }

  /**
  * List all samples.
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const questionId: string = req.params.questionId;
      const userId: string = req.user._id;
      const question: Array<QustionInterface> = await questionService.get(questionId, userId);
      // get questionUserInteractions
      const tmpQ: any = await UserQuestionInteraction.findOne({ userId, questionId }).lean();
      const tmpFQ: any = { ...question[0], preferences: 0 };
      if (!tmpQ) {
        tmpFQ.preferences = 0;
      }
      if (tmpQ) {
        if (tmpQ.type == 1) {
          tmpFQ.preferences = 1;
        } else {
          tmpFQ.preferences = 2;
        }
      }

      // get bootstrap answers
      const answers: Array<AnswerI> = await questionService.listAnswers(userId, 0, questionId);
      // get userAnswerInteraction
      const finalAnswers: Promise<FinalAnswerI>[] = answers.map(async (ans: AnswerI) => {
        const tmpA: any = await UserAnswerInteraction.findOne({ userId, answerId: ans._id }).lean();
        const tmpFA: FinalAnswerI = { ...ans, preferences: 0 };
        if (!tmpA) {
          tmpFA.preferences = 0;
        }
        if (tmpA) {
          if (tmpA.type == 1) {
            tmpFA.preferences = 1;
          } else {
            tmpFA.preferences = 2;
          }
        }
        return tmpFA;
      })
      const finalAnswersResolved: FinalAnswerI[] = await Promise.all(finalAnswers);
      // increament question view count by one
      await questionService.incViewCount(questionId);
      res.status(200).json({ data: { answers: finalAnswersResolved, question: [{ ...tmpFQ }] } });
    } catch (error) {
      next(error);
    }
  }

  /**
  * create answer for question
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async createAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const description: string = req.body.description;
      const code: string = req.body.code;
      const questionId: string = req.params.questionId;
      const userId: string = req.user._id;
      const answer = new Answer({
        questionId,
        userId,
        ...req.body
      });
      await answer.save();
      res.status(201).json({ data: true });
    } catch (error) {
      next(error);
    }
  }

  /**
  * create answer for question
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async listAnswers(req: Request, res: Response, next: NextFunction) {
    try {
      const page: any = req.query.page;
      const userId: string = req.user._id;
      const questionId: string = req.params.questionId;

      const answerList: Array<AnswerI> = await questionService.listAnswers(userId, page, questionId);
      res.status(200).json({ data: answerList });
    } catch (error) {
      next(error);
    }
  }

  /**
  * create answer for question
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async upVote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.user._id;
      const questionId: string = req.params.questionId;
      await UserQuestionInteraction.findOneAndUpdate({ userId, questionId }, { userId, questionId, type: 1 }, { upsert: true });
      await Question.updateOne({ _id: questionId }, { $inc: { votes: 1 } });
      res.status(200).json({ data: true });
    } catch (error) {
      next(error);
    }
  }

  /**
  * create answer for question
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async downVote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.user._id;
      const questionId: string = req.params.questionId;
      await UserQuestionInteraction.findOneAndUpdate({ userId, questionId }, { userId, questionId, type: 2 }, { upsert: true });
      await Question.updateOne({ _id: questionId }, { $inc: { votes: -1 } });
      res.status(200).json({ data: true });
    } catch (error) {
      next(error);
    }
  }

  /**
  * create answer for question
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async downVoteAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.user._id;
      const answerId: string = req.params.answerId;
      await UserAnswerInteraction.findOneAndUpdate({ userId, answerId }, { userId, answerId, type: 2 }, { upsert: true });
      await Answer.updateOne({ _id: answerId }, { $inc: { votes: -1 } });
      res.status(200).json({ data: true });
    } catch (error) {
      next(error);
    }
  }

  /**
  * create answer for question
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async upVoteAnswer(req: Request, res: Response, next: NextFunction) {
    try {
      const userId: string = req.user._id;
      const answerId: string = req.params.answerId;
      await UserAnswerInteraction.findOneAndUpdate({ userId, answerId }, { userId, answerId, type: 1 }, { upsert: true });
      await Answer.updateOne({ _id: answerId }, { $inc: { votes: 1 } });
      res.status(200).json({ data: true });
    } catch (error) {
      next(error);
    }
  }
}

export default QuestionController;

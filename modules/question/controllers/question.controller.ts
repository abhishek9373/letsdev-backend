import { NextFunction, Request, Response } from "express";
import { Answer, Question } from "../../../models";
import QuestionService from "../services/question.service";
import { QustionInterface } from "../interfaces/question.interface";

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
      res.status(200).json({ data: question});
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
          description,
          code
        });
        await answer.save();
        res.status(201).json({ data: true });
      } catch (error) {
        next(error);
      }
    }
}

export default QuestionController;

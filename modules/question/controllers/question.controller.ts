import { NextFunction, Request, Response } from "express";

class QuestionController {
  /**
   * List all samples.
   *
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @param {Object} next The response object.
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
 
    } catch (error) {
      next(error);
    }
  }
}

export default QuestionController;

import { Answer, Question } from "../../../models";
import { Answer as AnswerI } from "../interfaces/answer.interface";
import { QustionInterface } from "../interfaces/question.interface";
import { ObjectId } from "mongodb";

class QuestionService {

  /**
   * Service to get image URL
   * @param {Object} files
   * @returns {Promise<unknown>}
   */
  async list(page: number | 0) {
    try {
      const pipeline: any = [];

      // populate user
      pipeline.push({
        $lookup: {
          from: 'users',
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      });
      // Unwind the array produced by the $lookup stage
      pipeline.push({
        $unwind: {
          path: `$user`,
          preserveNullAndEmptyArrays: true,
        },
      });

      // project only required fields
      pipeline.push({
        $project: { "title": 1, "output": 1, "code": 1, "createdAt": 1, "description": 1, 'user.name': 1, "user._id": 1, "user.stars": 1, "user.profileViews": 1 }
      })

      pipeline.push({
        $sort: { createdAt: -1 }
      })
      pipeline.push({
        $skip: page * 10,
      })
      pipeline.push({
        $limit: 10
      })
      const questions: Array<QustionInterface> = await Question.aggregate(pipeline);
      return questions;
    } catch (error) {
      throw error;
    }
  }

  /**
 * Service to get image URL
 * @param {Object} files
 * @returns {Promise<unknown>}
 */
  async get(questionId: string, userId: string) {
    try {
      const pipeline: any = [];
      // get question using questionId
      pipeline.push({
        $match: {
          _id: new ObjectId(`${questionId}`),
        }
      })
      // populate user
      pipeline.push({
        $lookup: {
          from: 'users',
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      });
      // Unwind the array produced by the $lookup stage
      pipeline.push({
        $unwind: {
          path: `$user`,
          preserveNullAndEmptyArrays: true,
        },
      });

      // project only required fields
      pipeline.push({
        $project: { "title": 1, "output": 1, "code": 1, "createdAt": 1, "description": 1, "votes": 1, "views": 1, "answers": 1, 'user.name': 1, "user._id": 1 }
      })

      pipeline.push({
        $limit: 1
      })
      const questions: Array<QustionInterface> = await Question.aggregate(pipeline);
      return questions;
    } catch (error) {
      throw error;
    }
  }

/**
 * Service to get answers for given questions
 * @param {Object} files
 * @returns {Promise<unknown>}
 */
  async listAnswers(userId: string, page: number, questionId: string) {
    try {
      const pipeline: any = [];
      // get question using questionId
      pipeline.push({
        $match: {
          questionId: new ObjectId(`${questionId}`),
        }
      })
      // populate user
      pipeline.push({
        $lookup: {
          from: 'users',
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      });
      // Unwind the array produced by the $lookup stage
      pipeline.push({
        $unwind: {
          path: `$user`,
          preserveNullAndEmptyArrays: true,
        },
      });

      // project only required fields
      pipeline.push({
        $project: { "description": 1, "code": { $ifNull: ["$code", null] }, "createdAt": 1, "votes": 1, 'user.name': 1, "user._id": 1, "user.stars": 1, "user.profileViews": 1, }
      })

      pipeline.push({
        $sort: { createdAt: -1 }
      })

      pipeline.push({
        $skip: page * 10
      })

      pipeline.push({
        $limit: 10
      })

      const answers: Array<AnswerI> = await Answer.aggregate(pipeline);
      return answers;
    } catch (error) {
      throw error;
    }
  }

  // service to increase veiwcount of question by one
  async incAnsCount(questionId: string): Promise<boolean>{
    try{
      await Question.updateOne({ _id: questionId }, { $inc: { views: 1 } });
      return true;
    }catch(error: any){
      throw(error.message);
    }
  }

}

export default QuestionService;

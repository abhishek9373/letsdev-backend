import { Question } from "../../../models";
import { QustionInterface } from "../interfaces/question.interface";

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
        $project: { "title": 1, "output": 1, "code": 1, "createdAt": 1, "description": 1, 'user.name': 1, "user._id": 1 }
      })

      pipeline.push({
        $sort: { createdAt: -1 }
      })
      pipeline.push({
        $skip : page*10,
      })
      pipeline.push({
        $limit : 10
      })
      const questions: Array<QustionInterface> = await Question.aggregate(pipeline);
      return questions;
    } catch (error) {
      throw error;
    }
  }
}

export default QuestionService;

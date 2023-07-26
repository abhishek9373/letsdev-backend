import { PostListQuery } from "../../../interfaces/Common.interface";
import { PostMeta, PostResponse } from "../../../interfaces/Post.interface";
import nconf from "../../../lib/config";
import { Post, PostPreference, schemas } from "../../../models";
import FileService from "../../file/services/File.service";

const fileService = new FileService();
const limit = nconf.get('pagination');
class PostService {

  /**
   * Service to get image URL
   * @param {Object} files
   * @returns {Promise<unknown>}
   */
  async list({ userId, page }: { userId: string, page: number }) {
    try {
      const query: PostListQuery = { limit: limit || 10, page: page || 0, skip: page * 10 }

      // Pipeline array for listing
      const pipeline: any = [];

      // add stages for pipeline

      // populate required fileds
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

      // populate file

      pipeline.push({
        $lookup: {
          from: 'files',
          localField: "fileId",
          foreignField: "_id",
          as: "file",
        },
      });
      // Unwind the array produced by the $lookup stage
      pipeline.push({
        $unwind: {
          path: `$file`,
          preserveNullAndEmptyArrays: true,
        },
      });

      // implementation pending add populate field for userProfilePhoto

      // get new posts first
      pipeline.push({ $sort: { createdAt: -1 } });

      // add pagination
      pipeline.push({ $skip: query.skip });
      pipeline.push({ $limit: 10 });
      // omit unwanted fileds from doc
      pipeline.push({ $project: { updatedAt: 0 } })

      // get posts for current pipeline
      const posts: any = await Post.aggregate(pipeline);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async filter(posts: Array<any>) {
    try {
      const excludedFields: Array<string> = ["updatedAt", "userId"];

    } catch (error) {
      throw (error);
    }
  }

  async getImageUrls(posts: Array<any>) {
    try {
      const newPosts = await Promise.all(posts.map(async (post) => {
        post.image = await fileService.getImageUrl({ files: [{ fileId: post.file._id }] });
        return post;
      }))

      return newPosts;

    } catch (error) {
      throw (error);
    }
  }

  async getPostPreferences(posts: Array<any>) {
    try {
      const newPosts = await Promise.all(posts.map(async (post) => {
        post.preferences = await this.preferences(post._id);
        return post;
      }))
      return newPosts;

    } catch (error) {
      throw (error);
    }
  }

  async preferences(postId: string) {
    try {
      const response = await PostPreference.findOne({ postId }, { postId: 0 }).lean();
      return response;

    } catch (error) {
      throw (error);
    }
  }

}

export default PostService;




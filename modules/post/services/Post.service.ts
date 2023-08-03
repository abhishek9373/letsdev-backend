import { commentPipeline, commentsWithInteractions } from "../../../interfaces/Comment.interface";
import { PostListQuery } from "../../../interfaces/Common.interface";
import nconf from "../../../lib/config";
import { Post, PostComment, PostPreference, UserCommentInteraction, UserPostInteraction, schemas } from "../../../models";
import FileService from "../../file/services/File.service";
import { FinalPosts, Post as PostInterface, PostWithImages, PostWithPreferences, Post_Interaction_Matrix } from "../interfaces/Post.interface";
import { ObjectId } from "mongodb";

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

      // project only required fields
      pipeline.push({
        $project: { "tags": 1, "title": 1, "body": 1, "createdAt": 1, 'user.name': 1, "user._id": 1, "file._id": 1 }
      })

      // implementation pending add populate field for userProfilePhoto

      // get new posts first
      pipeline.push({ $sort: { createdAt: -1 } });

      // add pagination
      pipeline.push({ $skip: query.skip });
      pipeline.push({ $limit: 10 });

      // get posts for current pipeline
      const posts: any = await Post.aggregate(pipeline);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async getImageUrls(posts: Array<any>) {
    try {
      const newPosts: Array<PostWithImages> = await Promise.all(posts.map(async (post) => {
        post.image = await fileService.getImageUrl({ files: [{ fileId: post.file._id }] });
        // remove file from posts
        delete post.file;
        return post;
      }))

      return newPosts;

    } catch (error) {
      throw (error);
    }
  }

  async getPostPreferences(posts: Array<any>) {
    try {
      const newPosts: Array<PostWithPreferences> = await Promise.all(posts.map(async (post) => {
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
      const response: Post_Interaction_Matrix = await PostPreference.findOne({ postId }, { postId: 0, _id: 0 }).lean();
      return response;
    } catch (error) {
      throw (error);
    }
  }

  async like({ postId, userId }: { postId: string, userId: string }) {
    try {
      await UserPostInteraction.findOneAndUpdate({ postId, userId, type: "like" }, { postId, userId, type: "like" }, { upsert: true }).lean();
      await PostPreference.findOneAndUpdate({ postId }, { $inc: { likes: 1 } }).lean();
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async dislike({ postId, userId }: { postId: string, userId: string }) {
    try {
      await UserPostInteraction.findOneAndUpdate({ postId, userId, type: "dislike" }, { postId, userId, type: "dislike" }, { upsert: true }).lean();
      await PostPreference.findOneAndUpdate({ postId }, { $inc: { dislikes: 1 } }).lean();
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async rmLike({ postId, userId }: { postId: string, userId: string }) {
    try {
      await UserPostInteraction.deleteOne({ postId, userId, type: "like" });
      await PostPreference.findOneAndUpdate({ postId }, { $inc: { likes: -1 } }).lean();
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async rmDislike({ postId, userId }: { postId: string, userId: string }) {
    try {
      await UserPostInteraction.deleteOne({ postId, userId, type: "dislike" });
      await PostPreference.findOneAndUpdate({ postId }, { $inc: { dislikes: -1 } });
      return true;
    } catch (error) {
      throw (error);
    }
  }

  // same functions for post comments
  async likeComment({ commentId, userId }: { commentId: string, userId: string }) {
    try {
      await UserCommentInteraction.findOneAndUpdate({ commentId, userId, type: "like" }, { commentId, userId, type: "like" }, { upsert: true }).lean();
      await PostComment.findOneAndUpdate({ _id: commentId }, { $inc: { likes: 1 } }).lean();
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async dislikeComment({ commentId, userId }: { commentId: string, userId: string }) {
    try {
      await UserCommentInteraction.findOneAndUpdate({ commentId, userId, type: "dislike" }, { commentId, userId, type: "dislike" }, { upsert: true }).lean();
      await PostComment.findOneAndUpdate({ _id: commentId }, { $inc: { dislikes: 1 } }).lean();
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async rmCommentLike({ commentId, userId }: { commentId: string, userId: string }) {
    try {
      await UserCommentInteraction.deleteOne({ commentId, userId, type: "like" });
      await PostComment.findOneAndUpdate({ _id: commentId }, { $inc: { likes: -1 } }).lean();
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async rmCommentDislike({ commentId, userId }: { commentId: string, userId: string }) {
    try {
      await UserCommentInteraction.deleteOne({ commentId, userId, type: "dislike" });
      await PostComment.findOneAndUpdate({ commentId }, { $inc: { dislikes: -1 } });
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async userPostInteraction(postsWithPreferences: Array<any>, userId: string) {
    try {
      const postsWithUserInteractions: Array<FinalPosts> = await Promise.all(postsWithPreferences.map(async (post) => {
        const userInteraction: InteractionMatrix = { isliked: false, isdisliked: false };
        userInteraction.isliked = await UserPostInteraction.findOne({ postId: post._id, userId, type: "like" }, { postId: 0, _id: 0, userId: 0 }).lean() ? true : false;
        userInteraction.isdisliked = await UserPostInteraction.findOne({ postId: post._id, userId, type: "dislike" }, { postId: 0, _id: 0, userId: 0 }).lean() ? true : false;
        post.interaction = userInteraction;
        return post;
      }))
      return postsWithUserInteractions;
    } catch (error) {
      throw (error);
    }
}

  /**
   * Service to get image URL
   * @param {Object} files
   * @returns {Promise<unknown>}
   */
  async get({ postId }: { postId: string }) {
    try {

      // Pipeline array for listing
      const pipeline: any = [];

      // add stages for pipeline
      // match postId
      pipeline.push({
        $match: { _id: new ObjectId(postId) }
      })

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

      // project only required fields
      pipeline.push({
        $project: { "tags": 1, "title": 1, "body": 1, "createdAt": 1, 'user.name': 1, "user._id": 1, "file._id": 1 }
      })

      // get posts for current pipeline
      const posts: Array<PostInterface> = await Post.aggregate(pipeline);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  /**
  * Service to get image URL
  * @param {Object} files
  * @returns {Promise<unknown>}
  */
  async listComments(postId: string, page = 0) {
    try {

      // Pipeline array for listing
      const pipeline: any = [];

      // add stages for pipeline
      // match postId
      pipeline.push({
        $match: { postId: new ObjectId(postId) }
      })

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

      // project only required fields
      pipeline.push({
        $project: { "text": 1, "likes": 1, "dislikes": 1, "createdAt": 1, 'user.name': 1, "user._id": 1 }
      })
      // pagination code
      pipeline.push({ $skip: page * 30 });
      pipeline.push({ $sort: { createdAt: -1 } });
      pipeline.push({ $limit: 30 });

      // get posts for current pipeline
      const posts: Array<commentPipeline> = await PostComment.aggregate(pipeline);
      return posts;
    } catch (error) {
      throw error;
    }
  }

  /**
  * Service to get image URL
  * @param {Object} files
  * @returns {Promise<unknown>}
  */
  async commentInteraction(comments: Array<any>, userId: string): Promise<Array<commentsWithInteractions>> {
    try {
      const newComments: Array<commentsWithInteractions> = await Promise.all(comments.map( async (comment: any)=>{
        const interaction = { isliked: false, isdisliked: false };
        interaction.isliked = await UserCommentInteraction.findOne({ commentId: new ObjectId(comment._id), userId, type : "like" }, { _id: 1 }).lean() ? true : false;
        interaction.isdisliked = await UserCommentInteraction.findOne({ commentId: new ObjectId(comment._id), userId, type : "dislike" }, { _id: 1 }).lean() ? true : false;
        comment.interaction = interaction;
        return comment;
      }));
      return newComments;
    } catch (error) {
      throw error;
    }
  }
}

export default PostService;


interface InteractionMatrix {
  isliked: boolean,
  isdisliked: boolean
}

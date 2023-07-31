import { PostListQuery } from "../../../interfaces/Common.interface";
import { PostMeta, PostResponse } from "../../../interfaces/Post.interface";
import nconf from "../../../lib/config";
import { Post, PostPreference, UserPostInteraction, schemas } from "../../../models";
import FileService from "../../file/services/File.service";
import { Post as PostInterface, PostWithImages, PostWithPreferences, Post_Interaction_Matrix } from "../interfaces/Post.interface";

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

  async filter(posts: Array<any>) {
    try {
      const excludedFieldsAtRoot: Array<string> = ["updatedAt", "userId", "fileId", "file"];
      const excludedFieldsAtUser: Array<string> = ["_id", "email", "password", "createdAt", "updatedAt", "idVerified", "branch", "gender"]
      // {
      //   _id: 64c39185e913a1e4b5c7ba61,
      //   tags: [ '#HouseOfDragon' ],
      //   title: 'See this Image',
      //   body: 'dragons',
      //   fileId: 64c39181e913a1e4b5c7ba28,
      //   userId: 64b57942daced940d084a9ea,
      //   createdAt: 2023-07-28T09:59:33.057Z,
      //   user: {
      //     _id: 64b57942daced940d084a9ea,
      //     email: 'abhishekgund500@gmail.com',
      //     password: '$2b$10$XW/b3gz1wo2m9ZeRum6l1ujSJhlTHlh4zxcIxMz7nyT93eNcnjVJy',
      //     createdAt: 2023-07-17T17:24:18.534Z,
      //     updatedAt: 2023-07-27T13:09:48.794Z,
      //     name: 'Abhishek',
      //     isVerified: true,
      //     branch: 'Computer',
      //     gender: 'Male'
      //   },
      //   file: {
      //     _id: 64c39181e913a1e4b5c7ba28,
      //     key: '28701c99-feca-4f9f-8a00-cc0f501f7c48',
      //     order: 0,
      //     extension: 'png',
      //     module: 'post',
      //     userId: 64b57942daced940d084a9ea,
      //     createdAt: 2023-07-28T09:59:29.745Z,
      //     updatedAt: 2023-07-28T09:59:29.745Z
      //   },
      //   image: [ [Object] ],
      //   preferences: { _id: 64c39185e913a1e4b5c7ba63, likes: 0, dislikes: 0, shares: 0 }
      // }

    } catch (error) {
      throw (error);
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

  async like({postId, userId}: {postId: string, userId: string}) {
    try {
      await UserPostInteraction.findOneAndUpdate({ postId, userId, type: "like" }, { postId, userId, type: "like" }, { upsert: true }).lean();
      await PostPreference.findOneAndUpdate({ postId }, { $inc: { likes: 1 } }).lean();
      return true; 
    } catch (error) {
      throw (error);
    }
  }

  async dislike({postId, userId}: {postId: string, userId: string}) {
    try {
      await UserPostInteraction.findOneAndUpdate({ postId, userId, type: "dislike" }, { postId, userId, type: "dislike" }, { upsert: true }).lean();
      await PostPreference.findOneAndUpdate({ postId }, { $inc: { dislikes: 1 } }).lean();
      return true; 
    } catch (error) {
      throw (error);
    }
  }

  async rmLike({postId, userId}: {postId: string, userId: string}) {
    try {
      await UserPostInteraction.deleteOne({ postId, userId, type: "like" });
      await PostPreference.findOneAndUpdate({ postId }, { $inc: { likes: -1 } }).lean();
      return true;
    } catch (error) {
      throw (error);
    }
  }

  async rmDislike({postId, userId}: {postId: string, userId: string}) {
    try {
      await UserPostInteraction.deleteOne({ postId, userId, type: "dislike" });
      await PostPreference.findOneAndUpdate({ postId }, { $inc: { dislikes: -1 } });
      return true; 
    } catch (error) {
      throw (error);
    }
  }

  async userPostInteraction(postsWithPreferences: Array<any>, userId: string) {
    try {
      const postsWithUserInteractions = await Promise.all(postsWithPreferences.map(async (post)=>{
        const userInteraction: InteractionMatrix = { isliked: false, isdisliked: false };
        userInteraction.isliked = await UserPostInteraction.findOne({ postId: post._id, userId, type: "like" }, { postId: 0, _id: 0, userId: 0 }).lean() ? true : false;
        userInteraction.isdisliked = await UserPostInteraction.findOne({ postId: post._id, userId, type: "dislike" }, { postId: 0, _id: 0, userId: 0 }).lean() ? true : false;
        post.interaction = userInteraction;
        return post;
      }))
      return postsWithPreferences;
    } catch (error) {
      throw (error);
    }
  }

    /**
   * Service to get image URL
   * @param {Object} files
   * @returns {Promise<unknown>}
   */
    async get({ postId }: { postId: string, userId: string}) {
      try {
  
        // Pipeline array for listing
        const pipeline: any = [];
  
        // add stages for pipeline
        
        // match postId
        pipeline.push({
          $match: { _id: postId }
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
}

export default PostService;


interface InteractionMatrix{
  isliked: boolean,
  isdisliked: boolean
}

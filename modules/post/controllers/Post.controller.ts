import { NextFunction, Request, Response } from "express";
import { PostMeta, PostRequest } from "../../../interfaces/Post.interface";
import { Post, PostPreference } from "../../../models";
import PostService from "../services/Post.service";

const postService = new PostService();

class PostController {
  /**
   * List all samples.
   *
   * @param {Object} req The request object.
   * @param {Object} res The response object.
   * @param {Object} next The response object.
   */
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id;
      const post: PostRequest = req.body;
      const newPost: any = new Post({
        ...post, userId
      })
      const response = await newPost.save();

      // create default preferences for post
      const preferences = new PostPreference({
        postId: response._id
      })
      await preferences.save();

      return res.status(201).json({ data: true });
    } catch (error) {
      next(error);
    }
  }

  /**
  * List all samples.
  *
  * @param {Object} req The request object.
  * @param {Object} res The response object.
  * @param {Object} next The response object.
  */
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      // tmp get posts
      const userId = req.user._id;
      const page: any = req.query.page || 10;
      const posts: any = await postService.list({ userId, page });
      if(posts.length <= 0){
        return res.json({ data: [] });
      }
      // get imageUrls for post images
      const postsWithImages: Array<any> = await postService.getImageUrls(posts);
      const finalPosts: Array<any> = await postService.getPostPreferences(postsWithImages);
      // remove unwanted info from post
      delete finalPosts[0].file;
      // const filteredPosts: any = await postService.filter(posts);
      return res.json({ data: finalPosts });
    } catch (error) {
      next(error);
    }
  }
}

export default PostController;

import { NextFunction, Request, Response } from "express";
import { PostRequest } from "../../../interfaces/Post.interface";
import { Post, PostPreference } from "../../../models";
import PostService from "../services/Post.service";
import { FinalPosts, Post as PostInterface, PostWithImages, PostWithPreferences } from "../interfaces/Post.interface";
import { NoRecordFoundError } from "../../../lib/errors";

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
      if (posts.length <= 0) {
        return res.json({ data: [] });
      }
      // get imageUrls for post images
      const postsWithImages: Array<PostWithImages> = await postService.getImageUrls(posts);
      const postsWithPreferences: Array<PostWithPreferences> = await postService.getPostPreferences(postsWithImages);
      // get userPostInteraction Matrix
      const finalPosts: Array<FinalPosts> = await postService.userPostInteraction(postsWithPreferences, userId);
      return res.json({ data: finalPosts });
    } catch (error) {
      next(error);
    }
  }

  async like(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id;
      const postId: any = req.params.postId;
      await postService.like({ postId, userId });
      return res.status(204).json({ data: true });
    } catch (error) {
      throw (error);
    }
  }

  async dislike(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id;
      const postId: any = req.params.postId;
      await postService.dislike({ postId, userId });
      return res.status(204).json({ data: true });
    } catch (error) {
      throw (error);
    }
  }

  async rmLike(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id;
      const postId: any = req.params.postId;
      await postService.rmLike({ postId, userId });
      return res.status(204).json({ data: true });
    } catch (error) {
      throw (error);
    }
  }

  async rmDislike(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id;
      const postId: any = req.params.postId;
      await postService.rmDislike({ postId, userId });
      return res.status(204).json({ data: true });
    } catch (error) {
      throw (error);
    }
  }

  // get post
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user._id;
      const postId: any = req.params.postId;
      const posts: Array<PostInterface> = await postService.get({postId, userId});
      if(posts.length < 1){
        throw(new NoRecordFoundError("Post not found"));
      }

      // get imageUrls for post images
      const postsWithImages: Array<any> = await postService.getImageUrls(posts);
      const postsWithPreferences: Array<any> = await postService.getPostPreferences(postsWithImages);
      // get userPostInteraction Matrix
      const finalPosts: Array<any> = await postService.userPostInteraction(postsWithPreferences, userId);
      res.status(200).json({ data: finalPosts[0] })
    } catch (error) {
      throw (error);
    }
  }
}

export default PostController;

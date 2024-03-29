import { Router, Request, Response, NextFunction } from 'express';
import PostController from '../controllers/Post.controller';
import { ValidatorMiddleware } from '../../../middlewares';
import { create, createComment, likeDislike, likeDislikeComments, list, listComments } from '../validators/Post.validator';

const router: Router = Router();
const postController = new PostController();

// Middleware to diagnose requests for debugging
router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

// Routes
router.route('/')
    .post(ValidatorMiddleware(create), postController.create)
    .get(ValidatorMiddleware(list), postController.list)

// get post byId
router.route('/:postId')
    .get(ValidatorMiddleware(likeDislike), postController.get)

// route for like post
router.route('/:postId/like')
    .patch(ValidatorMiddleware(likeDislike), postController.like)
    .delete(ValidatorMiddleware(likeDislike), postController.rmLike)

// route for dislikePosts
router.route('/:postId/dislike')
    .patch(ValidatorMiddleware(likeDislike), postController.dislike)
    .delete(ValidatorMiddleware(likeDislike), postController.rmDislike)

// route for like post
router.route('/comment/:commentId/like')
    .patch(ValidatorMiddleware(likeDislikeComments), postController.likeComment)
    .delete(ValidatorMiddleware(likeDislikeComments), postController.rmCommentLike)

// route for dislikePosts
router.route('/comment/:commentId/dislike')
    .patch(ValidatorMiddleware(likeDislikeComments), postController.dislikeComment)
    .delete(ValidatorMiddleware(likeDislikeComments), postController.rmCommentDislike)

router.route('/:postId/comments')
    .get(ValidatorMiddleware(listComments), postController.listComments)
    .post(ValidatorMiddleware(createComment), postController.createComment)

export default router;

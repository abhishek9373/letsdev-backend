import { Router, Request, Response, NextFunction } from 'express';
import PostController from '../controllers/Post.controller';
import { ValidatorMiddleware } from '../../../middlewares';
import { create, list } from '../validators/Post.validator';

const router: Router = Router();
const postController = new PostController();

// Middleware to diagnose requests for debugging
router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

// Routes
router.post('/', ValidatorMiddleware(create), postController.create)
    .get('/', ValidatorMiddleware(list), postController.list)

export default router;

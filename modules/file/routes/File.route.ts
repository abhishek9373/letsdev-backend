import { Router, Request, Response, NextFunction } from 'express';
import FileController from '../controllers/File.controller';

const router: Router = Router();
const fileController: FileController = new FileController();

// Middleware to diagnose requests for debugging
router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

// Routes
router.post('/', fileController.getSignedURL);

export default router;

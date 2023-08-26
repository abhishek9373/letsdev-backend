import { Router, Request, Response, NextFunction } from 'express';
const router: Router = Router();

// Middleware to diagnose requests for debugging
router.use("*", (req: Request, res: Response, next: NextFunction) => {
  next();
});

// Routes
// router.post('/', fileController.getSignedURL);

export default router;

import { Router } from "express";
import { updateUser } from '../validators/User.validator'
import { ValidatorMiddleware } from "../../../middlewares";
import UserController from "../controllers/User.controller";
import { User } from '../../../models/index'

const userController = new UserController({model: User})
const router: Router = Router();


router.patch('/', 
	ValidatorMiddleware(updateUser), userController.update)
	.get('/', userController.getUser)

router.post('/verify', 
	userController.verify)

export default router;

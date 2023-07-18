import { Router } from "express";
import { updateUser } from '../validators/User.validator'
import { ValidatorMiddleware } from "../../../middlewares";
import UserController from "../controllers/User.controller";
import { User } from '../../../models/index'

const userController = new UserController({model: User})
const router: Router = Router();


router.patch('/', 
	ValidatorMiddleware(updateUser))
	.get('/', userController.getUser)

export default router;

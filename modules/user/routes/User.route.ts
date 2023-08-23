import { Router } from "express";
import { getUser, updateUser } from '../validators/User.validator'
import { ValidatorMiddleware } from "../../../middlewares";
import UserController from "../controllers/User.controller";
import { User } from '../../../models/index'

const userController = new UserController({model: User})
const router: Router = Router();


router.patch('/', 
	ValidatorMiddleware(updateUser), userController.update)
	.get('/', ValidatorMiddleware(getUser), userController.getUser)

router.post('/verify', 
	userController.verify)

router.delete('/logout', 
	userController.logOut)

export default router;

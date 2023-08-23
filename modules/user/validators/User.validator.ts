import Joi, { string } from "joi";
import { objectIdValidator } from "../../../lib/validators/validators.lib";

const updateUser = {
    body : Joi.object({
        name: Joi.string().required(),
        branch: Joi.string().required(),
        gender: Joi.string().required()
    })     
}  

const getUser = {
    query : Joi.object({
        userId: Joi.custom(objectIdValidator)
    })     
}

export { updateUser, getUser }



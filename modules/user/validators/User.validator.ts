import Joi, { string } from "joi";

const updateUser = {
    body : Joi.object({
        name: Joi.string().required(),
        branch: Joi.string().required(),
        gender: Joi.number().min(0).max(2).required()
    })     
}    

export { updateUser }



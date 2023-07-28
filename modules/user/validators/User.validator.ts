import Joi, { string } from "joi";

const updateUser = {
    body : Joi.object({
        name: Joi.string().required(),
        branch: Joi.string().required(),
        gender: Joi.string().required()
    })     
}    

export { updateUser }



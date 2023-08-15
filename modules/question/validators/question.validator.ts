import Joi from "joi";
import { objectIdValidator } from "../../../lib/validators/validators.lib";
// fileId: Joi.custom(objectIdValidator).required()
const create = {
    body: Joi.object({
        title: Joi.string().required().min(2).max(200),
        output: Joi.string().required(),
        description: Joi.string().required(),
        code: Joi.string().required(),
    }).unknown(false)
}

const list = {
    query: Joi.object({
        page: Joi.number().required().min(0)
    }).unknown(false)
}

const get = {
    params: Joi.object({
        questionId: Joi.custom(objectIdValidator).required() 
    }).unknown(false)
}

const createAnswer = {
    params: Joi.object({
        questionId: Joi.custom(objectIdValidator).required()
    }).unknown(false),
    body: Joi.object({
        description: Joi.string().required(),
        code: Joi.string().required()
    }).unknown(false)
}

export {
    create,
    list,
    get,
    createAnswer
}



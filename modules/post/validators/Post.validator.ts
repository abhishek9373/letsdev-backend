import Joi from "joi";
import { objectIdValidator } from "../../../lib/validators/validators.lib";

const create = {
    body: Joi.object({
        fileId: Joi.custom(objectIdValidator).required(),
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: [Joi.string()]
    }).unknown(false)
}

const list = {
    query: Joi.object({
        page: Joi.number().required()
    }).unknown(false)
}

const likeDislike = {
    params: Joi.object({
        postId: Joi.custom(objectIdValidator).required(),
    }).unknown(false)
}

const listComments = {
    params: Joi.object({
        postId: Joi.custom(objectIdValidator).required(),
    }).unknown(false),
    query: Joi.object({
        page: Joi.number().required()
    }).unknown(false)
}

const createComment = {
    params: Joi.object({
        postId: Joi.custom(objectIdValidator).required(),
    }).unknown(false),
    body: Joi.object({
        text: Joi.string().required()
    })
}

export {
    create,
    list,
    likeDislike,
    createComment,
    listComments
}



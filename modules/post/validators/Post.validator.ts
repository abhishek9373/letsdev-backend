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

export {
    create,
    list
}


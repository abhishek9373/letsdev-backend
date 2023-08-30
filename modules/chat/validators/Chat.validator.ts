import Joi from "joi";

const list = {
    query: Joi.object({
        rid: Joi.string().required()
    }).unknown(false)
}

export {
    list
}
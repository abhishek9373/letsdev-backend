const Joi = require('joi');


const deviceInfoValidator = {
    body : Joi.object({
        phone : Joi.number().required().min(1111111111).max(9999999999),
        country : Joi.string().required(),
        deviceInfo : Joi.object({
            deviceId: Joi.string().required(),
            firebaseToken : Joi.string().required(),
            deviceModel : Joi.string().required(),
            deviceOS : Joi.string().required(),
            appVersion : Joi.string().required(),
        })
    })
}

const OTPResquestValidator = {
    body : Joi.object({
        phone : Joi.number().min(1000000000).max(9999999999).required(),
        deviceInfo : Joi.object({
            deviceId: Joi.string().required(),
            firebaseToken : Joi.string().required(),
            deviceModel : Joi.string().required(),
            deviceOS : Joi.string().required(),
            appVersion : Joi.string().required(),
        }),
        otp : Joi.number().min(100000).max(999999).required()
    })
}

export { deviceInfoValidator, OTPResquestValidator };
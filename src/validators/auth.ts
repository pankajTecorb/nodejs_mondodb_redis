import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string()
        .min(10)
        .max(10)
        .required()
        .messages({
            'string.empty': `Phone Number cannot be an empty field`,
            'string.min': `Phone Number should have a minimum length of {#limit}`,
            'string.max': `Phone Number should have a maximum length of {#limit}`,
            'any.required': `Phone Number is a required field`
        }),
    role: Joi.string().required().valid('user', 'vendor', 'delivery_boy'),   //user , vendor , delivery_boy
   
})

const accountVerificationSchema = Joi.object({
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string()
        .min(10)
        .max(10)
        .required()
        .messages({
            'string.empty': `Phone Number cannot be an empty field`,
            'string.min': `Phone Number should have a minimum length of {#limit}`,
            'string.max': `Phone Number should have a maximum length of {#limit}`,
            'any.required': `Phone Number is a required field`
        }),
    role: Joi.string().required().valid('user', 'vendor', 'delivery_boy' , 'Admin'),   //user , vendor , delivery_boy
})



const logInSchema = Joi.object({
    countryCode: Joi.string().required(),
    phoneNumber: Joi.string()
        .min(10)
        .max(10)
        .required()
        .messages({
            'string.empty': `Phone Number cannot be an empty field`,
            'string.min': `Phone Number should have a minimum length of {#limit}`,
            'string.max': `Phone Number should have a maximum length of {#limit}`,
            'any.required': `Phone Number is a required field`
        }),
    role: Joi.string().required().valid('user', 'vendor', 'delivery_boy' , 'Admin'),   //user , vendor , delivery_boy
   
})


export {
    signUpSchema,
    accountVerificationSchema,
    logInSchema
    
}
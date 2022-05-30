const joi = require('joi');

function userValidation(body) {
    const userValidationSignUp = joi.object({
        firstName: joi.string().min(2).max(20).required(),
        lastName: joi.string().min(2).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(2).max(20).required()
    })
    const userValidationLogin = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(2).max(20).required()
    })

    return{
        userValidationSignUp : userValidationSignUp.validate(body),
        userValidationLogin : userValidationLogin.validate(body)
    }
}
module.exports = userValidation;

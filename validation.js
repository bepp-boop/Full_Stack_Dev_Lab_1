const Joi = require('@hapi/joi');

const newUserValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        job: Joi.string().required(),
        id: Joi.number().required()
    });
    return schema.validate(data);
}

module.exports = { newUserValidation }

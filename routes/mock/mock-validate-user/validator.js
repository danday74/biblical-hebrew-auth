const Joi = require('joi')
const validate = require('express-validation')

const validator = {
  body: { // params, body, query, headers, cookies
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(3).max(15).required()
  }
}

module.exports = validate(validator)

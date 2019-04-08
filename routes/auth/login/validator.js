const Joi = require('joi')
const validate = require('express-validation')

const validator = {
  body: { // params, body, query, headers, cookies
    username: Joi.string().regex(/^[a-zA-Z0-9\u0590-\u05FF]{3,15}$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9\u0590-\u05FF]{3,15}$/).required()
  }
}

module.exports = validate(validator)

const config = require(appRoot + '/config')
const getRestrictedUser = require(appRoot + '/routes/_classes/get-restricted-user')
const jwt = require('jsonwebtoken')

const setCookie = (req, res, response) => {

  const user = response.body

  const token = jwt.sign(user, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
  res.cookie(config.jwt.cookieName, token, {
    maxAge: config.jwt.expiresIn * 1000,
    httpOnly: true,
    secure: req.secure
  })

  const restrictedUser = getRestrictedUser(user)
  return res.status(response.statusCode).json(restrictedUser)

}

module.exports = setCookie

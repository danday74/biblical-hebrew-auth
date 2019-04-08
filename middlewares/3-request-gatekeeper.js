const {find} = require('lodash')
const jwt = require('jsonwebtoken')
const config = require('../authServer.config')
const NO_AUTH_REQUIRED_URLS = require('./no-auth-required-urls')

const middleware = (req, res, next) => {

  const noAuthRequiredUrl = find(NO_AUTH_REQUIRED_URLS, noAuthRequiredUrl => {
    return req.url.startsWith(noAuthRequiredUrl.url) && noAuthRequiredUrl.method === req.method
  })
  if (noAuthRequiredUrl) return next()

  /* istanbul ignore next */
  if (req.url === '/mock-validate-user' && req.method === 'POST') {
    return next()
  }
  const token = req.cookies[config.jwt.cookieName]

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, config.jwt.secret, err => {
    if (err) {
      return res.sendStatus(401)
    } else {
      return next()
    }
  })
}

module.exports = middleware

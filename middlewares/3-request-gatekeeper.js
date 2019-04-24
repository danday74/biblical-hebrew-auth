const config = require('../config')
const jsonResponse = require(appRoot + '/routes/_classes/json-response')
const jwt = require('jsonwebtoken')
const noAuthRequiredUrls = require('./no-auth-required-urls')
const nodeAtob = require('../routes/_classes/node-atob')
const {find} = require('lodash')

const middleware = (req, res, next) => {

  const noAuthRequiredUrl = find(noAuthRequiredUrls, noAuthRequiredUrl => {
    return req.url.startsWith(noAuthRequiredUrl.url) && noAuthRequiredUrl.method === req.method
  })
  if (noAuthRequiredUrl) return next()

  /* istanbul ignore next */
  if (req.url === '/mock-validate-user' && req.method === 'POST') {
    return next()
  }
  const token = req.cookies[config.jwt.cookieName]

  if (!token) {
    return jsonResponse(res, 401)
  }

  jwt.verify(token, nodeAtob(config.jwt.secret), err => {
    if (err) {
      return jsonResponse(res, 401)
    } else {
      return next()
    }
  })
}

module.exports = middleware

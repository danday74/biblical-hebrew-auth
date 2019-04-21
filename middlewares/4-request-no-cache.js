const noCacheUrls = require('./no-cache-urls')
const {find} = require('lodash')

const middleware = (req, res, next) => {

  const noCacheUrl = find(noCacheUrls, noCacheUrl => {
    return req.url.startsWith(noCacheUrl.url) && noCacheUrl.method === req.method
  })
  if (noCacheUrl) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.header('Expires', '-1')
    res.header('Pragma', 'no-cache')
  }
  next()
}

module.exports = middleware

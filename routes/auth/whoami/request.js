const config = require(appRoot + '/config')
const getRestrictedUser = require(appRoot + '/routes/_classes/get-restricted-user')
const jwt = require('jsonwebtoken')
const validator = require('./validator')

const route = router => {
  router.route('/whoami')
    .get(validator, (req, res) => {

      // no need to handle errors since we know this token is valid
      const token = req.cookies[config.jwt.cookieName]
      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        const restrictedUser = getRestrictedUser(decoded)
        return res.status(200).json(restrictedUser)
      })
    })
}

module.exports = route

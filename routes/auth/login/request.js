const jwt = require('jsonwebtoken')
const rp = require('request-promise')
const config = require(appRoot + '/authServer.config')
const getRestrictedUser = require(appRoot + '/routes/_classes/getRestrictedUser')
const validator = require('./validator')

const route = router => {
  router.route('/login')
    .post(validator, (req, res) => {

      // NOTE: Switch to real endpoint when available
      // AND set config.mockValidateUserEnabled to false
      const options = {
        method: 'POST',
        // url: `${req.php}/mock-validate-user`,
        url: `${config.upstream}/validate-user`,
        body: {
          username: req.body.username,
          password: req.body.password
        },
        json: true,
        resolveWithFullResponse: true,
        timeout: config.timeout.upstream
      }

      rp(options).then(response => {

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

      }).catch(err => {

        let statusCode
        if (err.statusCode) statusCode = err.statusCode
        else if (err.message.includes('ESOCKETTIMEDOUT')) statusCode = 408
        else statusCode = 500

        return res.sendStatus(statusCode)
      })
    })
}

module.exports = route

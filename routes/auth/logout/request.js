const config = require(appRoot + '/config')
const jsonResponse = require(appRoot + '/routes/_classes/json-response')
const validator = require('./validator')

const route = router => {
  router.route('/logout')
    .post(validator, (req, res) => {

      res.cookie(config.jwt.cookieName, '', {
        maxAge: 0,
        httpOnly: true,
        secure: req.secure
      })
      return jsonResponse(res, 200)
    })
}

module.exports = route

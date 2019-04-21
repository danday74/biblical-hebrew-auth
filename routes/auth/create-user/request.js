const config = require(appRoot + '/config')
const jsonResponse = require(appRoot + '/routes/_classes/json-response')
const rp = require('request-promise')
const setCookie = require(appRoot + '/routes/_classes/set-cookie')
const validator = require('./validator')

/* istanbul ignore next */
const route = router => {
  router.route('/create-user')
    .post(validator, (req, res) => {

      const options = {
        method: 'POST',
        url: `${config.upstream}/create-user`,
        body: {
          username: req.body.username,
          password: req.body.password
        },
        json: true,
        resolveWithFullResponse: true,
        timeout: config.timeout.upstream
      }

      rp(options).then(response => {

        return setCookie(req, res, response)

      }).catch(err => {

        let statusCode
        if (err.statusCode) statusCode = err.statusCode
        else if (err.message.includes('ESOCKETTIMEDOUT')) statusCode = 408
        else statusCode = 500

        return jsonResponse(res, statusCode)
      })
    })
}

module.exports = route

const jsonResponse = require(appRoot + '/routes/_classes/json-response')
const validator = require('./validator')

const route = router => {
  router.route('/authenticated')
    .get(validator, (req, res) => {
      return jsonResponse(res, 200)
    })
}

module.exports = route

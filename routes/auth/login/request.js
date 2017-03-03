const validator = require('./validator');
const jwt = require('jsonwebtoken');
const config = require(appRoot + '/authServer.config');
const rp = require('request-promise');

let route = router => {
  router.route('/login')
    .post(validator, (req, res) => {

      // NOTE: Switch to real endpoint when available
      // AND set config.mockValidateUserEnabled to false
      let options = {
        method: 'POST',
        url: `${req.php}/mock-validate-user`,
        body: {
          username: req.body.username,
          password: req.body.password
        },
        json: true,
        timeout: config.timeout.upstream,
        resolveWithFullResponse: true
      };

      rp(options).then((response) => {

        let user = response.body;

        let token = jwt.sign(user, config.jwt.secret, {
          expiresIn: config.jwt.expiresIn
        });
        res.cookie(config.jwt.cookieName, token, {
          maxAge: config.jwt.expiresIn,
          httpOnly: true,
          secure: req.secure
        });

        return res.sendStatus(response.statusCode);

      }).catch((err) => {

        let statusCode;
        if (err.statusCode) statusCode = err.statusCode;
        else if (err.message.includes('ESOCKETTIMEDOUT')) statusCode = 408;
        else statusCode = 500;

        return res.sendStatus(statusCode);

      });

    });
};

module.exports = route;
const {cloneDeep} = require('lodash')

const getRestrictedUser = user => {

  user = cloneDeep(user)
  delete user.exp
  delete user.iat
  delete user.password

  return user
}

module.exports = getRestrictedUser

const getRestrictedUser = user => {
  // const properties = ['username', 'email']
  // return Object.keys(user)
  //   .filter(key => properties.includes(key))
  //   .reduce((obj, key) => {
  //     obj[key] = user[key]
  //     return obj
  //   }, {})
  return user
}

module.exports = getRestrictedUser

const cfg = require(appRoot + '/config')

// agent
const server = require(appRoot + '/server').http // or https
const supertest = require('supertest')
const agent = supertest.agent(server)

// expect
const chai = require('chai')
const expect = chai.expect

// 3rd party
const cookie = require('cookie')
const using = require('data-driven')

// custom
const user = require(appRoot + '/test/utdata/auth/login/user.json')
const VALID_USERNAME = 'Guest'
const VALID_PASSWORD = 'test'
const VALID_CREDENTIALS = {
  username: VALID_USERNAME,
  password: VALID_PASSWORD
}

const TestImports = {
  cfg,
  agent,
  expect,
  cookie,
  using,
  user,
  VALID_USERNAME,
  VALID_PASSWORD,
  VALID_CREDENTIALS
}

module.exports = TestImports

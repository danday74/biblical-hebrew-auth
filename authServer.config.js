const testRun = process.env.NODE_ENV === 'test'

const config = {
  logging: !testRun,
  // certDir: '/etc/ssl/letsencrypt',
  httpPort: (testRun) ? 5001 : /* istanbul ignore next */ 4001,
  // httpsPort: (testRun) ? 41109 : /* istanbul ignore next */ 51109,
  jwt: {
    cookieName: 'twj',
    expiresIn: 86400, // 24 hours
    secret: 'FLEDFRINTSTONE'
  },
  mockValidateUserEnabled: false,
  nockHost: 'localhost',
  timeout: {
    upstream: 9000
  },
  upstream: 'http://localhost:4002'
}

module.exports = config

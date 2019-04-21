const chai = require('chai')
const expect = chai.expect
const Logger = require('./logger')

describe('Logger', () => {

  it('getTimestamp()', () => {
    const timestamp = Logger.getTimestamp()
    expect(timestamp).to.match(/\d\d\/\d\d\/\d\d \d\d:\d\d:\d\d/)
  })

})

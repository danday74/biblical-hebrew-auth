const nodeAtob = secret => {
  return Buffer.from(secret, 'base64').toString()
}

module.exports = nodeAtob

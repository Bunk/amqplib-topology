const assertionUtils = require('./assertions')
const amqplib = require('amqplib-mocks')

module.exports = {
  amqplib,
  chai: assertionUtils.chai,
  assert: assertionUtils.assert
}

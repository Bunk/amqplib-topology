/* eslint-env mocha */
const { assert, amqplib } = require('../test/helpers')
const factory = require('./index')

describe('amqplib', () => {
  let lib, connection, channel

  beforeEach(async () => {
    connection = await amqplib.connect('amqp://localhost')
    channel = await connection.createChannel()
    lib = factory(channel)
  })

  context('given a dsl with only queues', () => {
    beforeEach(async () => {
      const dsl = {
        queues: {
          'test-queue': { durable: true, prefetch: 1 }
        }
      }
      await lib.assert(dsl)
    })

    it('should not assert any exchanges', () => {
      assert.notCalled(channel.assertExchange)
    })

    it('should assert the queues', () => {
      assert.calledOnce(channel.assertQueue)
    })

    it('should not assert any queue bindings', () => {
      assert.notCalled(channel.bindQueue)
    })

    it('should not assert any exchange bindings', () => {
      assert.notCalled(channel.bindExchange)
    })
  })

  context('given a dsl with an exchange to queue binding', () => {
    beforeEach(async () => {
      const dsl = {
        exchanges: {
          'test-exchange': {
            queues: {
              'test-queue': {}
            }
          }
        }
      }
      await lib.assert(dsl)
    })

    it('should assert the exchange', () => {
      assert.calledWith(channel.assertExchange, 'test-exchange')
    })

    it('should assert the queues', () => {
      assert.calledWith(channel.assertQueue, 'test-queue')
    })

    it('should assert the queue binding', () => {
      assert.calledWith(channel.bindQueue, 'test-queue', 'test-exchange')
    })

    it('should not assert any exchange bindings', () => {
      assert.notCalled(channel.bindExchange)
    })
  })

  context('given a dsl with an exchange subscription', () => {
    beforeEach(async () => {
      const dsl = {
        exchanges: {
          'test-exchange': {
            subscriptions: {
              'app-events': {
                type: 'topic',
                patterns: [ 'app.#', 'event.#' ]
              }
            }
          }
        }
      }
      await lib.assert(dsl)
    })

    it('should assert the exchange', () => {
      assert.calledWith(channel.assertExchange, 'test-exchange')
      assert.calledWith(channel.assertExchange, 'app-events')
    })

    it('should not assert any queues', () => {
      assert.notCalled(channel.assertQueue)
    })

    it('should not assert any queue bindings', () => {
      assert.notCalled(channel.bindQueue)
    })

    it('should not assert any exchange bindings', () => {
      assert.calledTwice(channel.bindExchange)
      assert.calledWith(channel.bindExchange, 'test-exchange', 'app-events', 'app.#')
      assert.calledWith(channel.bindExchange, 'test-exchange', 'app-events', 'event.#')
    })
  })

  afterEach(() => {
    amqplib.reset()
  })
})

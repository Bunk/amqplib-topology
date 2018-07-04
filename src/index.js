const _ = require('lodash')
const parser = require('rabbit-topology')

module.exports = (channel) => {
  return {
    async assert (dsl) {
      const topology = parser.parse(dsl)

      for (const def of _.values(topology.exchanges)) {
        const opt = _.omit(def, [ 'name', 'type' ])
        await channel.assertExchange(def.name, def.type, opt)
      }

      for (const def of _.values(topology.queues)) {
        const opt = _.omit(def, [ 'name' ])
        await channel.assertQueue(def.name, opt)
      }

      if (topology.bindings) {
        for (const def of topology.bindings.queues) {
          await channel.bindQueue(def.target, def.exchange, def.pattern)
        }

        for (const def of topology.bindings.exchanges) {
          await channel.bindExchange(def.target, def.exchange, def.pattern)
        }
      }

      return topology
    }
  }
}

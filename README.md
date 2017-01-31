# `amqplib-topology`

[![NPM Version][npm-image]][npm-url]
[![Build][ci-image]][ci-url]
[![Coverage][coverage-image]][coverage-url]

Asserts a Rabbit MQ topology using the amqp.node library.

## Usage:

```js
const amqp = require( "amqplib" );
const amqpTopology = require( "amqplib-topology" );

let ok = amqp.connect( rabbitUri );

ok = ok
	.then( connection => {
		return amqpTopology( connection ).assert( {
			exchanges: {
				"events": {
					"type": "fanout"
				}
			}
		} );
	} )
	.then( topology => console.log( "Topology created!", topology.exchanges.events ) )
	.catch( err => console.error( err ) );
```

[npm-image]: https://badge.fury.io/js/amqplib-topology.svg
[npm-url]: https://npmjs.org/package/amqplib-topology
[ci-image]: https://travis-ci.org/Bunk/amqplib-topology.svg?branch=master
[ci-url]: https://travis-ci.org/Bunk/amqplib-topology
[coverage-image]: https://coveralls.io/repos/github/Bunk/amqplib-topology/badge.svg
[coverage-url]: https://coveralls.io/github/Bunk/amqplib-topology

## amqplib-topology

Asserts a Rabbit MQ topology using the amqp.node library.

## Usage:

```js
const amqpTopology = require( "amqplib-topology" )( rabbitConfig );

let ok = amqpTopology.assert( {
	exchanges: {
		"events": {
			"type": "fanout"
		}
	}
} );

ok = ok
	.then( () => console.log( "Topology created!" ) )
	.catch( err => console.error( err ) );
```

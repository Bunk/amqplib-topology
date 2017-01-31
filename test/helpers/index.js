const assertionUtils = require( "./assertions" );
const amqplib = require( "amqplib-mocks" );

global.testHelpers = Object.assign( {
	amqplib,
	chai: assertionUtils.chai,
	assert: assertionUtils.assert
} );

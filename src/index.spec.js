/* eslint-env mocha */
const { amqplib } = testHelpers;
const factory = require( "./index" );

describe( "amqplib", () => {
	let lib, connection;

	beforeEach( async () => {
		connection = await amqplib.connect( "amqp://localhost" );
		lib = factory( connection );
	} );

	context( "given a valid dsl", () => {
		beforeEach( () => {
			const dsl = {
				exchanges: {},
				queues: {},
				bindings: {}
			};
			return lib.assert( dsl );
		} );

		it( "should assert all exchanges", () => {

		} );

		it( "should assert all queues", () => {

		} );

		it( "should assert all bindings", () => {

		} );
	} );

	afterEach( () => {
		amqplib.reset();
	} );
} );

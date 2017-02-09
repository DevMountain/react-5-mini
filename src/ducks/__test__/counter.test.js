import counter, { decrement, increment } from "../counter";

test( "decrement returns an object with a type of 'DECREMENT' and an amount property from params", () => {
	expect( decrement( 10 ) ).toEqual( { amount: 10, type: "DECREMENT" } );
	expect( decrement( 15 ) ).toEqual( { amount: 15, type: "DECREMENT" } );
} );

test( "increment returns an object with a type of 'INCREMENT' and an amount property from params.amount", () => {
	expect( increment( 10 ) ).toEqual( { amount: 10, type: "INCREMENT" } );
	expect( increment( 15 ) ).toEqual( { amount: 15, type: "INCREMENT" } );
} );

test( "counter returns the initial state if action and state are undefined", () => {
	expect( counter( undefined, {} ).currentValue ).toBe( 0 );
} );

test( "counter passed an 'INCREMENT' action adds action.amount to state.currentValue", () => {
	const nextState = counter( undefined, increment( 5 ) );
	expect( nextState.currentValue ).toBe( 5 );

	expect( counter( nextState, increment( 1 ) ).currentValue ).toBe( 6 );
} );

test( "counter does not mutate currentValue on 'INCREMENT'", () => {
	const state = { currentValue: 10, futureValues: [], previousValues: [] };

	counter( state, increment( 1 ) );

	expect( state.currentValue ).toBe( 10 );
} );

test( "counter passed an 'DECREMENT' action subtracts action.amount from state.currentValue", () => {
	const nextState = counter( undefined, decrement( 5 ) );
	expect( nextState.currentValue ).toBe( -5 );

	expect( counter( nextState, decrement( 1 ) ).currentValue ).toBe( -6 );
} );

test( "counter does not mutate currentValue on 'INCREMENT'", () => {
	const state = { currentValue: 10, futureValues: [], previousValues: [] };

	counter( state, decrement( 1 ) );

	expect( state.currentValue ).toBe( 10 );
} );

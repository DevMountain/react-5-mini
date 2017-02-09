import counter, { BLACK_DIAMOND, decrement, increment, redo, undo } from "../counter";

if ( BLACK_DIAMOND ) {
	test( "redo returns an object with a type of 'REDO'", () => {
		expect( redo() ).toEqual( { type: "REDO" } );
	} );

	test( "undo returns an object with a type of 'UNDO'", () => {
		expect( undo() ).toEqual( { type: "UNDO" } );
	} );

	test( "counter returns an initialState when state is undefined", () => {
		expect( counter( undefined, {} ) ).toEqual( {
			  currentValue: 0
			, futureValues: []
			, previousValues: []
		} );
	} );

	test( "counter does not mutate state on INCREMENT", () => {
		const state = {
			  currentValue: 10
			, futureValues: [ 1 ]
			, previousValues: [ 1 ]
		};

		counter( state, increment( 1 ) );

		expect( state ).toEqual( {
			  currentValue: 10
			, futureValues: [ 1 ]
			, previousValues: [ 1 ]
		} );
	} );

	test( "counter does not mutate state on DECREMENT", () => {
		const state = {
			  currentValue: 10
			, futureValues: [ 1 ]
			, previousValues: [ 1 ]
		};

		counter( state, decrement( 1 ) );

		expect( state ).toEqual( {
			  currentValue: 10
			, futureValues: [ 1 ]
			, previousValues: [ 1 ]
		} );
	} );

	test(
		"counter passed an INCREMENT action resets futureValues and adds the previous currentValue to previousValues"
		, () => {
		const state = {
			  currentValue: 9
			, futureValues: [ 11 ]
			, previousValues: [ 10, 11 ]
		};

		expect( counter( state, increment( 5 ) ) ).toEqual( {
			  currentValue: 14
			, futureValues: []
			, previousValues: [ 9, 10, 11 ]
		} );
	} );

	test(
		"counter passed an DECREMENT action resets futureValues and adds the previous currentValue to previousValues"
		, () => {
		const state = {
			  currentValue: 9
			, futureValues: [ 11 ]
			, previousValues: [ 10, 11 ]
		};

		expect( counter( state, decrement( 5 ) ) ).toEqual( {
			  currentValue: 4
			, futureValues: []
			, previousValues: [ 9, 10, 11 ]
		} );
	} );

	test(
		"counter passed an UNDO action places currentValue into futureValues and replaces it with previousValues[ 0 ]"
		, () => {
		const state = {
			  currentValue: 9
			, futureValues: [ 11 ]
			, previousValues: [ 10, 11 ]
		};

		expect( counter( state, undo() ) ).toEqual( {
			  currentValue: 10
			, futureValues: [ 9, 11 ]
			, previousValues: [ 11 ]
		} );
	} );

	test( "counter passed an UNDO action does not mutate state", () => {
		const state = {
			currentValue: 9
			, futureValues: [ 11 ]
			, previousValues: [ 10, 11 ]
		};

		counter( state, undo() );

		expect( state ).toEqual( {
			  currentValue: 9
			, futureValues: [ 11 ]
			, previousValues: [ 10, 11 ]
		} );
	} );

	test(
		"counter passed a REDO action places currentValue into previousValues and replaces it with futureValues[ 0 ]"
		, () => {
			const state = {
				  currentValue: 9
				, futureValues: [ 11 ]
				, previousValues: [ 10, 11 ]
			};

			expect( counter( state, redo() ) ).toEqual( {
				  currentValue: 11
				, futureValues: []
				, previousValues: [ 9, 10, 11 ]
			} );
		} );

	test( "counter passed a REDO action does not mutate state", () => {
		const state = {
			  currentValue: 9
			, futureValues: [ 11 ]
			, previousValues: [ 10, 11 ]
		};

		counter( state, redo() );

		expect( state ).toEqual( {
			  currentValue: 9
			, futureValues: [ 11 ]
			, previousValues: [ 10, 11 ]
		} );
	} );
} else {
	test( "Set the BLACK_DIAMOND variable in src/ducks/counter.js to true to see test results for the black diamond", () => {
		expect( true ).toBe( true );
	} );
}

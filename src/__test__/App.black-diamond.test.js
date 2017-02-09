import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";

import { BLACK_DIAMOND } from "../ducks/counter";

import { App } from "../App";

if ( BLACK_DIAMOND ) {
	test( "App calls props.redo on .redo click", () => {
		const redoSpy = sinon.spy();
		const app = shallow(
			<App
				currentValue={ 99 }
				decrement={ () => null }
				futureValues={ [ 1 ] }
				increment={ () => null }
				previousValues={ [] }
				redo={ redoSpy }
				undo={ () => null }
			/>
		);

		app
			.find( ".redo" )
			.first()
			.simulate( "click" );

		sinon.assert.calledOnce( redoSpy );
	} );

	test( "App calls props.undo on .undo click", () => {
		const undoSpy = sinon.spy();
		const app = shallow(
			<App
				currentValue={ 99 }
				decrement={ () => null }
				futureValues={ [] }
				increment={ () => null }
				previousValues={ [ 1 ] }
				redo={ () => null }
				undo={ undoSpy }
			/>
		);

		app
			.find( ".undo" )
			.first()
			.simulate( "click" );

		sinon.assert.calledOnce( undoSpy );
	} );

	test( ".redo is disabled if props.futureValues has a length of 0", () => {
		const app = shallow(
			<App
				currentValue={ 99 }
				decrement={ () => null }
				futureValues={ [] }
				increment={ () => null }
				previousValues={ [] }
				redo={ () => null }
				undo={ () => null }
			/>
		);

		const shouldBeDisabled = app.find( ".redo" ).first().props().disabled;
		expect( shouldBeDisabled ).toBe( true );

		app.setProps( { futureValues: [ 1 ] } );

		const shouldNotBeDisabled = app.find( ".redo" ).first().props().disabled;
		expect( shouldNotBeDisabled ).toBe( false );
	} );

	test( ".undo is disabled if props.previousValues has a length of 0", () => {
		const app = shallow(
			<App
				currentValue={ 99 }
				decrement={ () => null }
				futureValues={ [] }
				increment={ () => null }
				previousValues={ [] }
				redo={ () => null }
				undo={ () => null }
			/>
		);

		const shouldBeDisabled = app.find( ".undo" ).first().props().disabled;
		expect( shouldBeDisabled ).toBe( true );

		app.setProps( { previousValues: [ 1 ] } );

		const shouldNotBeDisabled = app.find( ".undo" ).first().props().disabled;
		expect( shouldNotBeDisabled ).toBe( false );
	} );
} else {
	test( "Set the BLACK_DIAMOND variable in src/ducks/counter.js to true to see test results for the black diamond", () => {
		expect( true ).toBe( true );
	} );
}

import React from "react";
import { shallow } from "enzyme";
import sinon from "sinon";

import { App } from "../App";

test( "App displays props.currentValue in .counter__current-value", () => {
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

	expect( app.find( ".counter__current-value" ).text() ).toBe( "99" );
} );

test( "App calls props.increment with an argument of 1 on +1 button click", () => {
	const incrementSpy = sinon.spy();
	const app = shallow(
		<App
			currentValue={ 5 }
			decrement={ () => null }
			futureValues={ [] }
			increment={ incrementSpy }
			previousValues={ [] }
			redo={ () => null }
			undo={ () => null }
		/>
	);

	app
		.find( ".increment-one" )
		.first()
		.simulate( "click" );

	sinon.assert.calledOnce( incrementSpy );
	expect( incrementSpy.firstCall.args[ 0 ] ).toBe( 1 );
} );

test( "App calls props.increment with an argument of 5 on +5 button click", () => {
	const incrementSpy = sinon.spy();
	const app = shallow(
		<App
			currentValue={ 5 }
			decrement={ () => null }
			futureValues={ [] }
			increment={ incrementSpy }
			previousValues={ [] }
			redo={ () => null }
			undo={ () => null }
		/>
	);

	app
		.find( ".increment-five" )
		.first()
		.simulate( "click" );

	sinon.assert.calledOnce( incrementSpy );
	expect( incrementSpy.firstCall.args[ 0 ] ).toBe( 5 );
} );

test( "App calls props.decrement with an argument of 1 on -1 button click", () => {
	const decrementSpy = sinon.spy();
	const app = shallow(
		<App
			currentValue={ 5 }
			decrement={ decrementSpy }
			futureValues={ [] }
			increment={ () => null }
			previousValues={ [] }
			redo={ () => null }
			undo={ () => null }
		/>
	);

	app
		.find( ".decrement-one" )
		.first()
		.simulate( "click" );

	sinon.assert.calledOnce( decrementSpy );
	expect( decrementSpy.firstCall.args[ 0 ] ).toBe( 1 );
} );

test( "App calls props.decrement with an argument of 5 on -5 button click", () => {
	const decrementSpy = sinon.spy();
	const app = shallow(
		<App
			currentValue={ 5 }
			decrement={ decrementSpy }
			futureValues={ [] }
			increment={ () => null }
			previousValues={ [] }
			redo={ () => null }
			undo={ () => null }
		/>
	);

	app
		.find( ".decrement-five" )
		.first()
		.simulate( "click" );

	sinon.assert.calledOnce( decrementSpy );
	expect( decrementSpy.firstCall.args[ 0 ] ).toBe( 5 );
} );

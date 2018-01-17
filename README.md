<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we'll create a small counter application using React and Redux. We'll also include extra functionality for undo/redo actions.

# Live Example

<a href="#">Click Me!</a>

<img src="https://raw.githubusercontent.com/DevMountain/redux-counter/master/SolutionPicture.png" />

## Setup

* `fork` and `clone` this repository. 
* `cd` into the project root.
* Run `npm install` to fetch the project dependencies.
* Run `npm start` to spin up a development server.

## Step 1

### Summary

In this step, we'll install some new dependencies, create a reducer, and create a Redux store.

### Instructions

* Install `redux` and `react-redux`
* Create an initial state `src/ducks/counter.js`
* Write a simple reducer in `src/ducks/counter.js`
* Create a Redux store in `src/store.js`

<details>

<summary> <code> ./src/ducks/counter.js </code> </summary>

```js
const initialState = { currentValue: 0 };

export default function counter( state = initialState, action ) {
	return state;
}
```

</details>

<details>

<summary> <code> ./src/store.js </code> </summary>

```js
import { createStore } from "redux";

import counter from "./ducks/counter";

export default createStore( counter );
```

</details>

## Step 2

**Summary**

Now that we have a Redux store, we need to make our application aware that it exists and connect relevant components.

**Instructions**

* Make the application aware of our Redux store using the React-Redux `Provider` component.
* Connect the `App` component to Redux.

**Detailed Instructions**

Begin in the root of application at `src/index.js` by importing the `Provider` component from React-Redux and `store` from `src/store.js`. Wrap the `App` component in a `Provider` component. Pass `store` as a prop to `Provider`. This will make our application aware of the Redux store and allow us to gain access to data.

Open up `src/App.js` so we can connect `App` to our application's state. To do this, we first need to import the aptly named `connect` function from `react-redux`. Then, underneath your `App` component definition, create a function `mapStateToProps` that takes a parameter `state`. This function will tell `connect` which pieces of application state we're interested in. Right now we want all of it, so just return `state`.

Using `connect`, we are going to "decorate" our component, which is a fancy way of saying that we are going to let it do things it wasn't able to before, such as access data in Redux. To do this we need to first create our decorator by invoking `connect` and passing in `mapStateToProps`. Once our decorator is created, we need to invoke it and pass in `App`, exporting the result by default. This is a little confusing at first, so check out the example below!

<details>

<summary>Decorator Example</summary>

```jsx
function mapStateToProps( state ) {
	return state;
}
const decorator = connect( mapStateToProps );
const decoratedComponent = decorator( App );
export default decoratedComponent;
```
This is usually shortened to

```jsx
function mapStateToProps( state ) {
	return state;
}
export default connect( mapStateToProps )( App );
```
___

</details>

Now that we're all wired up, we just need to make sure everything is working! Do this by `console.log`ing `this.props` at the top of `App`'s `render` method. You should see an output of `{ currentValue: 0 }`. Whew, that was a lot of setup! Luckily we only have to do most of this once per application.

<details>

<summary><b>Code Solution</b></summary>

<details>

<summary><code>src/index.js</code></summary>

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store";
import App from "./App";

ReactDOM.render(
	<Provider store={ store }>
		<App />
	</Provider>
	, document.getElementById( 'root' )
);
```

</details>

<details>

<summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

class App extends Component {
	render() {
		console.log( this.props );
		return (
			/* lots of jsx */
		);
	}
}

function mapStateToProps( state ) {
	return state;
}

export default connect( mapStateToProps )( App );
```

</details>

</details>

### Step 3

**Summary**

Now that our application is talking to Redux, we need to set up Redux to actually do the things we want it to do. We'll start by creating action types, creating action creators, and implementing increment/decrement logic.

**Instructions**

* Create `INCREMENT` and `DECREMENT` action types.
* Write action creators corresponding to `INCREMENT` and `DECREMENT`.
	* Each of these action creators should accept an `amount` parameter.
* Update the reducer to process these actions into state changes.

**Detailed Instructions**

We currently have state, but no way to do anything with it. To be able to access that data, we first need to create some action types. Action types describe to our reducer (`counter`) what has occurred when Redux receives an action. We'll start with two action types, each stored in its own variable. Create a variable named `INCREMENT` and set it equal to the string `"INCREMENT"`,  and a variable named `DECREMENT` set equal to the string `"DECREMENT"`. We use all capital names here to indicate that these values are constants that will never be altered by the application.

Following action types comes the action creators. In Redux, actions are plain objects containing a type (describing what happened) and any data that might be necessary to the action. Our first action creator will be a function named `increment` that takes in a parameter of `amount`. `increment` will return an object with two properties: `amount` - set equal to the `amount` parameter, and `type` set equal to the `INCREMENT` action type. Create a `decrement` function that mimics `increment`, the only difference being that `type` should now be equal to `DECREMENT`. Export both of these functions.

The last change we'll be making in our `counter.js` file will be updating the reducer to handle these actions. It is a core concept of Redux and state management that state is never mutated, meaning you should never say `state.currentValue++`. This means that each time `counter` is called we need to return a **new** state object from the action and values from the current state **without** changing the current state.

With that in mind, let's get started. First we need to determine what the reducer should do by looking at the action's type, a `switch` statement is perfect for this. If the action type is `INCREMENT`, we will return a new a state object where the `currentValue` property is equal to `state`'s `currentValue` property plus `action.amount`. If the action type is `DECREMENT` we will return a new state object where `currentValue` is equal to `state`'s `currentValue` property minus `action.amount`. Lastly, move the `return state` to the `switch` statement's `default` case.

<details>

<summary><b>Code Solution</b></summary>

<details>

<summary><code>src/ducks/counter.js</code></summary>

```javascript
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

const initialState = { currentValue: 0 };

export default function counter( state = initialState, action ) {
	switch ( action.type ) {
		case INCREMENT:
			return { currentValue: state.currentValue + action.amount };
		case DECREMENT:
			return { currentValue: state.currentValue - action.amount };
		default:
			return state;
	}
}

export function increment( amount ) {
	return { amount, type: INCREMENT };
}

export function decrement( amount ) {
	return { amount, type: DECREMENT };
}
```

</details>

</details>

### Step 4

**Summary**

Now that we can effectively manage application state, we need to wire up the `App` component so that it can dispatch actions to our reducer.

**Instructions**

* Import the `increment` and `decrement` action creators to `src/App.js`.
* Use `connect`'s `mapDispatchToProps` to place the action creators on `App`'s props.
* Attach the action creators to the appropriate buttons.

**Detailed Instructions**

Inside of `src/App.js`, import the `increment` and `decrement` action creators. To use these within our component, we need to do two things:

1. Place them onto the component's props
2. Wrap them in React-Redux's `dispatch` function - `dispatch` is the function used within Redux to indicate that something has happened and state needs to change.

Luckily `connect` allows us to do just that! Pass a second argument to `connect`, this argument should be an object comprised of our action creators. Connect will automatically wrap each method in `dispatch` and then place it on our component's props.

Now that we have access to all of the necessary and data and functions inside of `App`, we can connect to the UI and provide interactivity. Begin by destructuring `currentValue`, `decrement`, and `increment` from `this.props` at the top of `App`'s `render` method. Replace the static `0` inside of the `h1` with `currentValue`. In the button with the text "+1", change the callback function to invoke `increment` with an argument of `1`. Repeat this step for the "+5" button. Follow the same steps for the "-1" and "-5" buttons with the `decrement` function.

You should now be able to interact with all of the increment and decrement buttons and see their result update in the view.

<details>

<summary><b>Code Solution</b></summary>

<details>

<summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { decrement, increment } from "./ducks/counter";

class App extends Component {
	render() {
		const {
			  currentValue
			, decrement
			, increment
		} = this.props;

		return (
			<div className="app">
				<section className="counter">
					<h1 className="counter__current-value">{ currentValue }</h1>
					<div className="counter__button-wrapper">
						<button
							className="counter__button"
							onClick={ () => increment( 1 ) }
						>
							+1
						</button>
						<button
							className="counter__button"
							onClick={ () => increment( 5 ) }
						>
							+5
						</button>
						<button
							className="counter__button"
							onClick={ () => decrement( 1 ) }
						>
							-1
						</button>
						<button
							className="counter__button"
							onClick={ () => decrement( 5 ) }
						>
							-5
						</button>
						<br />
						<button
							className="counter__button"
							disabled={ true }
							onClick={ () => null }
						>
							Undo
						</button>
						<button
							className="counter__button"
							disabled={ true }
							onClick={ () => null }
						>
							Redo
						</button>
					</div>
				</section>
				<section className="state">
					<pre>
						{ JSON.stringify( this.props, null, 2 ) }
					</pre>
				</section>
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return state;
}

export default connect( mapStateToProps, { decrement, increment } )( App );

```

</details>

</details>

### Step 5 - **Black Diamond**

**Be sure to set the `BLACK_DIAMOND` variable in `src/ducks/counter.js` to `true` to allow for testing on this step**

**Summary**

In this step, we will implement undo/redo logic inside of the counter reducer.

**Instructions**

* Create `UNDO` and `REDO` action types.
* Write action creators for `UNDO` and `REDO`.
* Refactor `initialState` and `counter` to handle undo/redo logic.

**Detailed Instructions**

Open up `src/ducks/counter.js`. Create two new actions - `UNDO` and `REDO`. Create the corresponding action creators `undo` and `redo` alongside your other action creators. Because we will already have all the data we need on `state`, the actions returned by these action creators only need to have a `type` property. Change the `initialState` variable by adding two properties - `futureValues` and `previousValues`, both set to empty arrays.

Because we changed how `initialState` looks, we need to update how we handle existing actions before adding handlers for the new ones. Adjust both the `INCREMENT` and `DECREMENT` cases so that they return an object that looks something like this:
```javascript
{
	  currentValue: state.currentValue /* + or - */ action.amount
	, futureValues: []
	, previousValues: [ state.currentValue, ...state.previousValues ]
}
```

A few things to note:

* We are handling the change to `currentValue` exactly the same as before.
* We reset `futureValues` to an empty array, because if we have incremented or decremented since the last undo the redo stack is no longer valid.
* We save the previous state's `currentValue` into the `previousValues` array **without mutating** the previous state's values.

Now that fixing our old code is out of the way, let's write the logic for `UNDO` and `REDO` actions. Start by writing a case for `UNDO`. As always in a reducer, this case will return an object representing our updated state. This object should:

* Set `currentValue` equal to the previous state's `previousValues[ 0 ]`
* Set `futureValue` equal to an array containing the previous state's `currentValue` as well as any other `futureValues` that we're already on `state`.
* Set `previousValues` to a copy of the previous state's `previousValues` **without** the first index (because that value is now living at `currentValue`).

<details>

<summary>It should look something like this</summary>

```javascript
{
	  currentValue: state.previousValues[ 0 ]
	, futureValues: [ state.currentValue, ...state.futureValues ]
	, previousValues: state.previousValues.slice( 1, state.previousValues.length )
}
```

</details>

Once that is complete, we can add the logic for `REDO`. `REDO` will be handled exactly the same as `UNDO` was, only the names have changed. Anything that was done `previousValues` above should now be done to `futureValues` and vice versa.

All that is left now is to connect these functions to the `App` component and tie them to the appropriate buttons. Inside of `src/App.js`, import the `undo` and `redo` functions from `src/ducks/counter.js`. Edit the object passed as a second argument to `connect` to include these functions.

Destructure `undo`, `redo`, `futureValues`, and `previousValues` from `this.props`. Pass `undo` as the click handler to the Undo button, and change the `disabled` prop to be equal to `previousValues.length === 0` (so we don't accidentally undo when there are no previous values!). Pass `redo` as the click handler to the Redo button and change the `disabled` prop to be equal to `futureValues.length === 0`.

All done! You should now be able to increment and decrement, undo and redo, and see the values of state changing on the right side of the screen!

<details>

<summary><b>Code Solution</b></summary>

<details>

<summary><code>src/ducks/counter.js</code></summary>

```javascript
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const UNDO = "UNDO";
const REDO = "REDO";

const initialState = {
	  currentValue: 0
	, futureValues: []
	, previousValues: []
};

export default function counter( state = initialState, action ) {
	switch ( action.type ) {
		case INCREMENT:
			return {
				  currentValue: state.currentValue + action.amount
				, futureValues: []
				, previousValues: [ state.currentValue, ...state.previousValues ]
			};
		case DECREMENT:
			return {
				  currentValue: state.currentValue - action.amount
				, futureValues: []
				, previousValues: [ state.currentValue, ...state.previousValues ]
			};
		case UNDO:
			return {
				  currentValue: state.previousValues[ 0 ]
				, futureValues: [ state.currentValue, ...state.futureValues ]
				, previousValues: state.previousValues.slice( 1, state.previousValues.length )
			};
		case REDO:
			return {
				  currentValue: state.futureValues[ 0 ]
				, futureValues: state.futureValues.slice( 1, state.futureValues.length )
				, previousValues: [ state.currentValue, ...state.previousValues ]
			};
		default:
			return state;
	}
}

export function increment( amount ) {
	return { amount, type: INCREMENT };
}

export function decrement( amount ) {
	return { amount, type: DECREMENT };
}

export function undo() {
	return { type: UNDO };
}

export function redo() {
	return { type: REDO };
}

```

</details>

<details>

<summary><code>src/App.js</code></summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import { decrement, increment, redo, undo } from "./ducks/counter";

import "./App.css";

class App extends Component {
	render() {
		const {
			  currentValue
			, decrement
			, futureValues
			, increment
			, previousValues
			, redo
			, undo
		} = this.props;
		return (
			<div className="app">
				<section className="counter">
					<h1 className="counter__current-value">{ currentValue }</h1>
					<div className="counter__button-wrapper">
						<button
							className="counter__button"
							onClick={ () => increment( 1 ) }
						>
							+1
						</button>
						<button
							className="counter__button"
							onClick={ () => increment( 5 ) }
						>
							+5
						</button>
						<button
							className="counter__button"
							onClick={ () => decrement( 1 ) }
						>
							-1
						</button>
						<button
							className="counter__button"
							onClick={ () => decrement( 5 ) }
						>
							-5
						</button>
						<br />
						<button
							className="counter__button"
							disabled={ previousValues.length === 0 }
							onClick={ undo }
						>
							Undo
						</button>
						<button
							className="counter__button"
							disabled={ futureValues.length === 0 }
							onClick={ redo }
						>
							Redo
						</button>
					</div>
				</section>
				<section className="state">
					<pre>
						{ JSON.stringify( this.props, null, 2 ) }
					</pre>
				</section>
			</div>
		);
	}
}

function mapStateToProps( state ) {
	return state;
}

export default connect( mapStateToProps, { decrement, increment, redo, undo } )( App );
```

</details>

</details>

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
</p>

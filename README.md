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

<img src="https://github.com/DevMountain/react-5-mini/blob/solution/readme-assets/1.png" />

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

### Summary

In this step, we'll make our application aware that redux exists and connect the `App` component.

### Instructions

* Open `src/index.js`.
* Import `Provider` from `react-redux`.
* Import `store` from `./src/store.js`.
* Wrap the `App` component in the `Provider` component.
  * Add a `store` prop that equals our imported `store`.
* Open `./src/App.js`.
* Import `connect` from `react-redux`.
* Connect the `App` component to Redux.
  * Use a `mapStateToProps` function that takes in state.
    * Return `state` for now.

<details>

<summary> <code> ./src/index.js </code> </summary>

```js
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

<summary> <code> ./src/App.js </code> </summary>

```js
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

class App extends Component {
  render() {
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

<img src="https://github.com/DevMountain/react-5-mini/blob/solution/readme-assets/2.png" />

### Step 3

### Summary

In this step, we'll set up Redux to actually execute actions. We'll start by creating action types, creating action creators, and implementing increment/decrement logic.

### Instructions

* Create `INCREMENT` and `DECREMENT` action types.
* Write action creators corresponding to `INCREMENT` and `DECREMENT` action types.
  * Each of these action creators should accept an `amount` argument.
* Update the reducer to process these actions into state changes.
  * `INCREMENT` should increment `currentValue` by the given `amount`.
  * `DECREMENT` should decrement `currentValue` by the given `amount`.

<details>

<summary> <code> ./src/ducks/counter.js </code> </summary>

```js
const initialState = { currentValue: 0 };

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

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

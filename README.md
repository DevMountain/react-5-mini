# Redux Counter - Mini
<img src="https://raw.githubusercontent.com/DevMountain/redux-counter/master/SolutionPicture.png" />

### Setup
To begin, fork and clone this repository. Once it has finished downloading `cd` into the project root and run `npm i` to fetch the project dependencies. After they are fetched run `npm start` and a browser window will open at `http://localhost:3000` displaying a (non-functioning) counter app.

### The plan
Our goal with this mini project is to create a small counter application using React and Redux. Beyond the standard increment and decrement functionality, we also want to implement an undo/redo stack similar to what you see in most text editors.

### Step 1
**Summary**
Right now nothing works! That's because Redux will be handling all of our state management and we haven't wired it up yet. To get started we'll need to install some new dependencies, create a reducer, and create a Redux store.

**Instructions**
Install `redux` and `react-redux`, create an initial state and reducer in `src/ducks/counter.js`, and create a Redux store from that reducer in `src/store.js`.

**Detailed Instructions**

Begin by running `npm i redux react-redux --save` to install the required dependencies.

Open up `src/ducks/counter.js` and begin by creating a variable named `initialState`. `initialState` should be an object with one property, `currentValue`, set to `0`. This variable determines how we want our application state to look when the application first loads.

We interact with Redux via functions commonly called reducers. Reducer functions are where we will be processing all changes to our application's state. Each time a reducer is invoked Redux passes an object representing the current state and an "action" object that describes what prompted the state change. Because Redux doesn't have a representation of our state the first time it runs we must provide it with our `initialState`. With this in mind, let's write our first reducer function, it should

* Be named `counter`
* Take two parameters
	* `state` with a default value of `initialState`
	* `action`
* Return `state`

Right now it doesn't do much, but we'll come back to it once we have built some actions!

Next, we will need to create our Redux store in `src/store.js`. A Redux store is really just a big object that contains all of our application state data. Start by importing `createStore` from Redux and our `counter` reducer from `src/ducks/counter.js`.  Invoke `createStore` passing in `counter` and export the result by default.

<details>

<summary>**Code Solution**</summary>

<details>

<summary>`src/ducks/counter.js`</summary>
```js
const initialState = { currentValue: 0 };

export default function counter( state = initialState, action ) {
	return state;
}
```
</details>

<details>

<summary>`src/store.js`</summary>
```js
import { createStore } from "redux";

import counter from "./ducks/counter";

export default createStore( counter );
```
</details>

</details>

### Step 2

**Summary**

Now that we have a Redux store we need to make our application aware that it exists and connect relevant components.

**Instructions**
Make the application aware of our Redux store using the `Provider` component from React-Redux, connect the `App` component to Redux.

**Detailed Instructions**

Begin in the root of application at `src/index.js` by importing the `Provider` component from React-Redux and `store` from `src/store.js`. Wrap `App` in the `Provider` component, passing `store` as a prop to `Provider`. This will make our application aware of the Redux store and allow us to gain access to data.

Finally, we need to connect `App` to our application's state. To do this we first need to import the aptly named `connect` function from `react-redux`. Then, underneath your `App` component, create a function `mapStateToProps` that takes a parameter `state`. This function will tell `connect` which pieces of application state we're interested in. Right now we want all of it, so just return `state`.

Using `connect` we are going to "decorate" our component, which is a fancy way of saying that we are going to let it do things it wasn't able to before, such as access data in Redux. To do this we need to first create our decorator by invoking `connect` and passing in `mapStateToProps`. Once our decorator is created we need to invoke it and pass in `App`, exporting the result by default.

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

<summary>**Code Solution**</summary>

<details>

<summary>`src/index.js`</summary>

```
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

<summary>`src/App.js`</summary>

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

Now that our application is talking to Redux we need to set up Redux to actually do the things we want it to do. We'll start by creating action types, creating action creators, and implementing increment/decrement logic.

**Instructions**

Create  `INCREMENT` and `DECREMENT` action types, write corresponding action creator functions `increment` and `decrement`, which take an `amount` parameter, and update the reducer to process these actions into state changes.

**Detailed Instructions**

We currently have state, but no way to do anything with it. To be able to access that data we first need to create some action types. Action types describe to our reducer (`counter`) what has occurred when Redux receives an action. We'll start with two action types, each stored in its own variable. Create a variable named `INCREMENT` and set it equal to the string `"INCREMENT"`,  and a variable named `DECREMENT` set equal to the string `"DECREMENT"`. We use all capital names here to indicate that these values are constants that will never be altered by the application.

Following action types comes the action creators. In Redux, actions are plain objects containing a type (describing what happened) and any data that might be necessary to the action. Our first action creator will be a function named `increment` that takes in a parameter of `amount`. The function then returns an object with two properties: `amount` - set equal to the `amount` parameter, and `type` set equal to the `INCREMENT` action type.  Create a `decrement` function that mimics `increment`, the only difference being that `type` should now be equal to `DECREMENT`. Export both of these functions.

The last change we'll be making in our `counter.js` file will be updating the reducer to handle these actions. It is a core concept of Redux and state management that state is never mutated, meaning you should never say `state.currentValue++`. This means that each time `counter` is called we need to return a **new** state object from the action and values from the current state **without** changing the current state.

With that in mind, let's get started. First we need to determine what the reducer should do by looking at the action's type, a `switch` statement is perfect for this. If the action type is `INCREMENT` we will return a new a state object where the `currentValue` property is equal to the `state`'s `currentValue` property plus `action.amount`. If the action type is `DECREMENT` we will return a new state object where `currentValue` is equal to the current `state`'s `currentValue` property minus `action.amount`. Lastly, move the `return state` to the `switch` statement's `default` case.

<details>

<summary>**Code Solution**</summary<

<details>

<summary>`src/ducks/counter.js`</summary>

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

Now that we can effectively manage application state we need to wire up the `App` component so that it can dispatch actions to our reducer.

**Instructions**

Import the `increment` and `decrement` action creators to `App`, use `connect`'s `mapDispatchToProps` to place the action creators on props, attach the action creators to the appropriate buttons.

**Detailed Instructions**

Inside of `src/App.js` import the `increment` and `decrement` action creators. To use these within our component we need to do two things:

1. Place them onto the component's props
2. Wrap them in React-Redux's `dispatch` function - `dispatch` is the function used within Redux to indicate that something has happened and state needs to change.

Luckily `connect` allows us to do just that! Pass a second argument to `connect`, this argument should be an object comprised of our action creators. Connect will automatically wrap each method in `dispatch` and then place it on our component's props.

Now that we have access to all of the necessary and data and functions inside of `App` we can connect to the UI and provide interactivity. Begin by destructuring `currentValue`, `decrement`, and `increment` from `this.props` at the top of `App`'s `render` method. Replace the static `0` inside of the `h1` with `currentValue`. In the button with the text "+1", change the callback function to invoke `increment` with an argument of `1`. Repeat this step for the "+5" button. Follow the same steps for the "-1" and "-5" buttons with the `decrement` function.

You should now be able to interact with all of the increment and decrement buttons and see their result update in the view.

<details>

<summary>**Code Solution**</summary>

<details>

<summary>`src/App.js`</summary>

```jsx
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { decrement, increment, redo, undo } from "./ducks/counter";

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

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">

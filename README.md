# Redux Counter - Mini
<img src="https://raw.githubusercontent.com/DevMountain/redux-counter/master/SolutionPicture.png" />

### Setup
To begin, fork and clone this repository. Once it has finished downloading `cd` into the project root and run `npm i` to fetch the project dependencies. After they are fetched run `npm start` and a browser window will open at `http://localhost:3000` displaying a (non-functioning) counter app.

### The plan
Our goal with this mini project is to create a small counter application using React and Redux. Beyond the standard increment and decrement functionality, we also want to implement an undo/redo stack similar to what you see in most text editors.

### Step 1
**Summary**
Right now nothing works! That's because Redux will be handling all of our state management and we haven't wired it up yet. To get started we'll need to install some new dependencies, make our application aware of the Redux store, and connect our `App` component to Redux.

**Instructions**
Install `redux` and `react-redux`, add a dummy reducer function that just returns `{ test: true }` to `src/ducks/counter.js`,  add the Provider component to `index.js`, and connect the `App` component to Redux.

**Detailed Instructions**

Begin by running `npm i redux react-redux --save` to install the required dependencies.

Open up `src/ducks/counter.js` and export default a function named `counter`. Later on this function will be where we manage our application state, but for now let's just have it return an object of `{ test: true }` to make sure everything gets properly connected.

Next, we will need to open up `src/store.js` and import two things: `createStore` from Redux, and the `counter` function written above. To create our application store we need to invoke `createStore` passing in `counter`, be sure to export the result by default. The store we are creating here is really nothing more than a big object that holds our application's state.

After the above is complete we need to make our application aware of the Redux store. Go to `src/index.js` and import `Provider` from `react-redux` as well as the `store` we just created. Wrap the root component (in this case `App`) in the `Provider` component, with `store` as a prop.

Finally, we need to connect `App` to our application's state. To do this we first need to import the aptly named `connect` function from `react-redux`. Then, underneath your `App` component, create a function `mapStateToProps` that takes a parameter `state`. This function will tell `connect` which pieces of state we're interested in. Right now we want all of it, so just return `state`.

Using `connect` we are going to "decorate" our component, which is a fancy way of saying that we are going to let it do things it wasn't able to before, such as access data on state. To do this we need to first create our decorator by invoking `connect` and passing in `mapStateToProps`. Once our decorator is created we need to invoke it and pass in `App`, exporting the result by default.

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

Now that we're all wired up, we just need to make sure everything is working! Do this by `console.log`ing `this.props.test` at the top of `App`'s `render` method. You should see an output of `true`. Whew, that was a lot of setup! Luckily we only have to do most of this once per application.
<details>
<summary>**Code Solution**</summary>

```js
// src/ducks/counter.js
export default function counter() {
	return state;
}
```

```js
// src/store.js
import { createStore } from "redux";

import counter from "./ducks/counter";

export default createStore( counter );
```

```jsx
// src/index.js
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

```jsx
// src/App.js
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

class App extends Component {
	render() {
		console.log( this.props.test );
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

### Step 2
**Summary**
Now that our application is talking to Redux we need to set up Redux to actually do the things we want it to do. We'll start by creating an initial state, creating action types, creating action creators, and implementing increment/decrement logic.

**Instructions**
Create an `initialState` object with a property `currentValue` set equal to 0, create `INCREMENT` and `DECREMENT` action types, write corresponding action creator functions `increment` and `decrement`, which take an `amount` parameter, and update the reducer to process these actions into state changes.

**Detailed Instructions**
Start in `src/ducks/counter.js`. Right now our reducer function `counter` doesn't do much, and it certainly isn't a counter. Our first step is to create an initial state, the way we want our data to look when the application first loads. Create a variable named `initialState` and set it equal to an object with one property `currentValue`, which is set to 0.

Next, update `counter` to take two parameters: `state`, which defaults to `initialState`, and `action`. Then return `state` instead of the `{ test: true }` object from the previous step. Now when our application initializes Redux will have our initial value of `currentValue`.

We now have a real state, but no way to do anything with it. To be able to access that data we first need to create some action types. Action types describe to our reducer (`counter`) what has occurred when Redux receives an action. We'll start with two action types, each stored in its own variable. Create a variable named `INCREMENT` and set it equal to the string `"INCREMENT"`,  and a variable named `DECREMENT` set equal to the string `"DECREMENT"`. We use all capital names here to indicate that these values are constants that will never be altered by the application.

Following action types comes the action creators. In Redux, actions are plain objects containing a type (describing what happened) and any data that might be necessary to the action. Our first action creator will be a function named `increment` that takes in a parameter of `amount`. The function then returns an object with two properties: `amount` - set equal to the `amount` parameter, and `type` set equal to the `INCREMENT` action type.  Create a `decrement` function that mimics `increment`, the only difference being that `type` should now be equal to `DECREMENT`. Export both of these functions.

The last change we'll be making in our `counter.js` file will be updating the reducer to handle these actions. Our `counter` reducer takes two parameters, `state` and `action`. `state` is the value of our application state and `action` will be an object from one of our action creators. It is a core concept of Redux and state management that state is never mutated, meaning you should never say `state.currentValue = newValue` or `state.values.push( newValue )`. This means that each time that `counter` is called we need to return a **new** state object based on the action and values from the current state **without** changing the current state.

With that in mind, let's get started. First we need to determine what the reducer should do by looking at the action's type, a `switch` statement is perfect for this. If the action type is `INCREMENT` we will return a new a state object where the `currentValue` property is equal to the current state's `currentValue` property plus `action.amount`. If the action type is `DECREMENT` we will return a new state object where `currentValue` is equal to the current state's `currentValue` property minus `action.amount`. Lastly, move the `return state;` to the `switch` statement's `default` case.

All that's left in this step is to wire up `App` to dispatch these actions. Inside of `src/App.js` import your `increment` and `decrement` action creator functions. We need these passed as props to `App`, so we are going to create another function underneath `mapStateToProps`. Create the function `mapDispatchToProps` taking in a parameter `dispatch`. `dispatch` is a function provided by Redux that allows us to send an action to the reducer. `mapDispatchToProps` should return an object with two properties: `increment` and `decrement`. Both of these properties should be functions that take in an `amount` parameter and call `dispatch` passing in the return value from an action creator. For example: `dispatch( increment( amount ) );`.

Pass `mapDispatchToProps` as a second argument to the existing `connect` function. What this is doing is placing functions on our component's props to allow for easily dispatching actions to Redux. If you `console.log( this.props );` you should now see the `currentValue` at 0, as well as your `increment` and `decrement` functions.

<details>
<summary>**Code Solution**</summary>

```javascript
// src/ducks/counter.js
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

```jsx
// src/App.js
import React, { Component } from "react";
import { connect } from "react-redux";
import { decrement, increment } from "./ducks/counter";

import "./App.css";

class App extends Component {
	render() {
		console.log( this.props );
		return (
			/* lots of JSX */
		);
	}
}

function mapStateToProps( state ) {
	return state;
}

function mapDispatchToProps( dispatch ) {
	return {
		  decrement( amount ) {
			dispatch( decrement( amount ) );
		}
		, increment( amount ) {
			dispatch( increment( amount ) );
		}
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( App );
```

</details>

### Step 3

**Summary**

In this step we will connect our work from above to the provided React UI, allowing for incrementing and decrementing the value on state. Currently our counter is statically set to `0` and all of our click handlers return `null`, we'll need to update these to use the functions created in the previous step. All of our work in this step will happen in `src/App.js`.

**Detailed Instructions**

We'll start by grabbing the data we need from `this.props`. At the top of `App`'s `render` method, destructure `currentValue`, `increment`, and `decrement` from props. Get the easy part out of the way first and replace the static `0` in the `h1` tag with `currentValue`.

Now we need to make use of our action creators. In the button with the text "+1", change the callback function to invoke `increment` with an argument of `1`. Repeat this step for the "+5" button. Follow the same steps for the "-1" and "-5" buttons with the `decrement` function.

You should now be able to interact with all of the increment and decrement buttons and see their result update in the view.

<details>
<summary>**Code Solution**</summary>

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

# Redux Counter - Mini
<img src="https://raw.githubusercontent.com/DevMountain/redux-counter/master/SolutionPicture.png" />

### Setup
To begin, fork and clone this repository. Once it has finished downloading `cd` into the project root and run `npm i` or `yarn` to fetch the project dependencies. After they are fetched run `npm start` and a browser window will open at `http://localhost:3000` displaying a (non-functioning) counter app.

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

**Detailed Instructions**
Start in `src/ducks/counter.js`. Right now our reducer function `counter` doesn't do much, and it certainly isn't a counter. Our first step is to create an initial state, the way we want our data to take when the application first loads. Create a variable named `initialState` and set it equal to an object with one property `currentValue`, which is set to 0.

Next, update `counter` to take two parameters: `state`, which defaults to `initialState`, and `action`. Then return `state` instead of the `{ test: true }` object from the previous step. Now when our application initializes Redux will have our initial value of `currentValue`.

We now have a real state, but no way to do anything with it. To be able to access that data we first need to create some action types. Action types describe to our reducer (`counter`) what has occurred when Redux receives an action. We'll start with two action types, each stored in its own variable. Create a variable named `INCREMENT` and set it equal to the string `"INCREMENT"`,  and a variable named `DECREMENT` set equal to the string `"DECREMENT"`. We use all capital names here to indicate that these values are constants that will never be altered by the application.

Following action types comes the action creators. In Redux, actions are plain objects containing a type (describing what happened) and any data that might be necessary to the action. Our first action creator will be a function named `increment` that takes in a parameter of `amount`. The function then returns an object with two properties: `amount` - set equal to the `amount` parameter, and `type` set equal to the `INCREMENT` action type.  

## Contributions

### Contributions

#### 
 
If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

### Copyright

#### 

© DevMountain LLC, 2016. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<img src="https://devmounta.in/img/logowhiteblue.png" width="250">
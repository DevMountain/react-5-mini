<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we'll create a small counter application using React and Redux. We'll also include extra functionality for undo/redo actions.

# Live Example

<a href="https://devmountain.github.io/react-5-mini/">Click Me!</a>

<img src="https://github.com/DevMountain/react-5-mini/blob/solution/readme-assets/5.png" />

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

### Solution

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

### Solution

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

## Step 3

### Summary

In this step, we'll set up Redux to actually execute actions. We'll start by creating action types, creating action creators, and implementing increment/decrement logic.

### Instructions

* Open `./src/ducks/counter.js`.
* Create `INCREMENT` and `DECREMENT` action types.
* Write action creators corresponding to `INCREMENT` and `DECREMENT` action types.
  * Each of these action creators should accept an `amount` argument.
* Update the reducer to process these actions into state changes.
  * `INCREMENT` should increment `currentValue` by the given `amount`.
  * `DECREMENT` should decrement `currentValue` by the given `amount`.

### Solution

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

## Step 4

### Summary

In this step, we'll wire up the `App` component so that it can dispatch actions to our reducer.

### Instructions

* Open `./src/App.js`.
* Import the `increment` and `decrement` action creators.
* Use `connect`'s `mapDispatchToProps` to place the action creators on `App`'s props.
* Update the `.counter_button` buttons to call `increment` or `decrement` with the correct `amount`.

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```js
import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";

import { decrement, increment } from "./ducks/counter";

class App extends Component {
  render() {
    const { currentValue, decrement, increment } = this.props;

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

<br />

<img src="https://github.com/DevMountain/react-5-mini/blob/solution/readme-assets/3g.gif" />

## Step 5

### Summary

In this step, we'll implement undo/redo logic into our reducer.

### Instructions

* Open `./src/ducks/counter.js`.
* Create `UNDO` and `REDO` action types.
* Write action creators for `UNDO` and `REDO`.
* Refactor `initialState` and `counter` to handle undo/redo logic.

### Solution

<details>

<summary> <code> ./src/ducks/counter.js </code> </summary>

```js
const initialState = {
  currentValue: 0,
  futureValues: [],
  previousValues: []
};

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const UNDO = "UNDO";
const REDO = "REDO";

export default function counter( state = initialState, action ) {
  switch ( action.type ) {
    case INCREMENT:
      return {
        currentValue: state.currentValue + action.amount, 
        futureValues: [],
        previousValues: [ state.currentValue, ...state.previousValues ]
      };
    case DECREMENT:
      return {
        currentValue: state.currentValue - action.amount,
        futureValues: [],
        previousValues: [ state.currentValue, ...state.previousValues ]
      };
    case UNDO:
      return {
        currentValue: state.previousValues[ 0 ],
        futureValues: [ state.currentValue, ...state.futureValues ],
        previousValues: state.previousValues.slice( 1 )
      };
    case REDO:
      return {
        currentValue: state.futureValues[ 0 ],
        futureValues: state.futureValues.slice( 1 ),
        previousValues: [ state.currentValue, ...state.previousValues ]
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

## Step 6

### Summary 

In this step, we'll import `undo` and `redo` action creators into our `App.js` and hook them up their respective buttons.

### Instructions

* Open `./src/App.js`.
* Import `undo` and `redo` action creators.
* Add `undo` and `redo` to `mapDispatchToProps`.
* Destrucuture `undo` and `redo` from `props`.
* Hook up the `undo` and `redo` buttons to their respective action creators.

### Solution

<details>

<summary> <code> ./src/App.js </code> </summary>

```js
import React, { Component } from "react";
import { connect } from "react-redux";

import { decrement, increment, redo, undo } from "./ducks/counter";

import "./App.css";

class App extends Component {
  render() {
    const { 
      currentValue, decrement, futureValues,
      increment, previousValues, redo, undo
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

<br />

<img src="https://github.com/DevMountain/react-5-mini/blob/solution/readme-assets/4g.gif" />

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>

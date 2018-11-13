import React, { Component } from "react";
import store, { INCREMENT, DECREMENT, UNDO, REDO } from "./store.js";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: store.getState()
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.undo = this.undo.bind(this);
    this.redo = this.redo.bind(this);
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        store: store.getState()
      });
    });
  }

  increment(amount) {
    store.dispatch({ amount, type: INCREMENT });
  }
  decrement(amount) {
    store.dispatch({ amount, type: DECREMENT });
  }
  undo() {
    store.dispatch({ type: UNDO });
  }
  redo() {
    store.dispatch({ type: REDO });
  }
  render() {
    const {
      currentValue,
      futureValues,
      previousValues
    } = this.state.store;

    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{currentValue}</h1>
          <div className="counter__button-wrapper">
            <button className="counter__button" onClick={() => this.increment(1)}>
              +1
            </button>
            <button className="counter__button" onClick={() => this.increment(5)}>
              +5
            </button>
            <button className="counter__button" onClick={() => this.decrement(1)}>
              -1
            </button>
            <button className="counter__button" onClick={() => this.decrement(5)}>
              -5
            </button>
            <br />
            <button
              className="counter__button"
              disabled={previousValues.length === 0}
              onClick={this.undo}
            >
              Undo
            </button>
            <button
              className="counter__button"
              disabled={futureValues.length === 0}
              onClick={this.redo}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.state.store, null, 2)}</pre>
        </section>
      </div>
    );
  }
}

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
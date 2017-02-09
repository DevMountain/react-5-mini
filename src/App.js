import React, { Component } from "react";

import "./App.css";

export class App extends Component {
	render() {
		return (
			<div className="app">
				<section className="counter">
					<h1 className="counter__current-value">{ 0 }</h1>
					<div className="counter__button-wrapper">
						<button
							className="counter__button"
							onClick={ () => null }
						>
							+1
						</button>
						<button
							className="counter__button"
							onClick={ () => null }
						>
							+5
						</button>
						<button
							className="counter__button"
							onClick={ () => null }
						>
							-1
						</button>
						<button
							className="counter__button"
							onClick={ () => null }
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

export default App;

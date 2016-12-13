import React from "react";
import classNames from "classnames";
import style from "./TerminalStyle";

export default class Terminal extends React.Component {
	constructor( props ) {
		super( props );
		this.state = { currentLine: 0 };
		this.updateCurrentLine = this.updateCurrentLine.bind( this );
	}

	componentDidMount() {
		document.addEventListener( "keydown", this.updateCurrentLine );
	}

	componentWillUnmount() {
		document.removeEventListener( "keydown", this.updateCurrentLine );
	}

	updateCurrentLine( e ) {
		const {output} = this.props;
		let { currentLine } = this.state;
		if ( e.keyCode === 40 ) { // down
			currentLine = currentLine < output.length - 1 ? ++currentLine : currentLine;
		}
		if ( e.keyCode === 38 ) { // up
			currentLine = currentLine > 0 ? --currentLine : currentLine;
		}
		this.setState( { currentLine } );
	}

	render() {
		const { title, output } = this.props;

		return (
			<div style={ style.container }>
				<header style={ style.header }>
					<nav style={ style.nav }>
						<button style={ { ...style.button, ...style.buttonClose } }></button>
						<button style={ { ...style.button, ...style.buttonMinimize } }></button>
						<button style={ { ...style.button, ...style.buttonExpand } }></button>
					</nav>
					<div style={ style.title }>{ title }</div>
				</header>
				<section style={ style.main }>
						{ output.reduce( ( memo, line, index ) => {
							if ( index <= this.state.currentLine ) {
								memo.push( <div key={ index } className="fragment">{ line }</div> );
							}
							return memo;
						}, [] ) }
				</section>
			</div>
		);
	}
}

Terminal.propTypes = {
	output: React.PropTypes.array
};

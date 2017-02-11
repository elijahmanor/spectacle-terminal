import React from "react";
import classNames from "classnames";
import style from "./TerminalStyle";

export default class Terminal extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			currentLine: {
				index: props.showFirstEntry ? 0 : null,
				iteration: null
			},
			isCollapsed: false,
			isMaximized: false
		};
	}

	componentDidMount() {
		document.addEventListener( "keydown", this.updateCurrentLine );
		document.addEventListener( "keydown", this.toggleMaximize );
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( this.mainRef ) {
			this.mainRef.scrollTop = this.mainRef.scrollHeight;
		}
	}

	componentWillUnmount() {
		document.removeEventListener( "keydown", this.updateCurrentLine );
		document.removeEventListener( "keydown", this.toggleMaximize );
	}

	toggleMaximize = ( e ) => {
		if ( e.altKey && e.keyCode === 77 ) {
			this[ `handle${ this.state.isMaximized ? "Minimize" : "Expand" }` ]();
		}
	}
	
	goDown( line ) {
		const { output } = this.props;

		if ( line.index !== null ) {
			let newIndex = line.index < output.length - 1 ? line.index + 1 : line.index;
			const nextLine = line.iteration !== null ? output[ line.index ] : output[ newIndex ];
			if ( Array.isArray( nextLine ) ) {
				if ( line.iteration !== null ) {
					line.iteration = line.iteration < nextLine.length - 1 ? ++line.iteration : null;
					if ( line.iteration === null ) {
						line.index = newIndex;
					}
				} else {
					line.index = newIndex;
					line.iteration = 0;
				}
			} else {
				line.index = newIndex;
				line.iteration = null;
			}
		} else {
			line = { index: 0 };
		}
		return line;
	}

	goUp( line ) {
		const { showFirstEntry } = this.props;

		if ( line.index > 0 ) {
			line.index--;
		} else if ( line.index === 0 ) {
			line.index = showFirstEntry ? 0 : null;
		}
		
		return line;
	}

	updateCurrentLine = ( e ) => {
		let { currentLine } = this.state;
		if ( e.keyCode === 40 ) {
			currentLine = this.goDown( currentLine );
		} else if ( e.keyCode === 38 ) {
			currentLine = this.goUp( currentLine );
		}
		this.setState( { currentLine } );
	}

	handleClose = () => {
		this.setState( { isCollapsed: !this.state.isCollapsed } );
	}

	handleMinimize = () => {
		this.setState( { isMaximized: false } );
	}

	handleExpand = () => {
		this.setState( { isMaximized: true } );
		this.terminalRef.closest( ".spectacle-content" ).style.transform = "none";
	}

	renderMain() {
		const { output } = this.props;
		const { isMaximized, currentLine } = this.state;

		return 	<section ref={ elem => { this.mainRef = elem; }}
			style={ Object.assign( {}, style.main, isMaximized ? style.mainMaximized : {} ) }>
				{ currentLine.index !== null && output.reduce( ( memo, line, index ) => {
					if ( index <= currentLine.index ) {
						if ( Array.isArray( line ) ) {
							const iteration = currentLine.iteration !== null ? currentLine.iteration : line.length - 1;
							memo.push( <div key={ index } className="fragment">{ line[ iteration ] }</div> );
						} else {
							memo.push( <div key={ index } className="fragment">{ line }</div> );
						}
					}
					return memo;
				}, [] ) }
		</section>;
	}

	render() {
		const { title } = this.props;
		const { isMaximized, isCollapsed } = this.state;

		return (
			<div style={ !isMaximized ? style.container : style.containerMaximized }
				ref={ elem => { this.terminalRef = elem; }}>
				<header style={ style.header }>
					<nav style={ style.nav }>
						<button onClick={ this.handleClose } style={ { ...style.button, ...style.buttonClose } }></button>
						<button onClick={ this.handleMinimize }style={ { ...style.button, ...style.buttonMinimize } }></button>
						<button onClick={ this.handleExpand } style={ { ...style.button, ...style.buttonExpand } }></button>
					</nav>
					<div style={ style.title }>{ title }</div>
				</header>
				{ !isCollapsed && this.renderMain() }
			</div>
		);
	}
}

Terminal.propTypes = {
	output: React.PropTypes.array,
	showFirstEntry: React.PropTypes.bool
};

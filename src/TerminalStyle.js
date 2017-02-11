export default {
	container: {
		display: "flex",
		flexDirection: "column",
	},
	containerMaximized: {
		position: "absolute",
		top: "1rem",
		right: "1rem",
		bottom: "3rem",
		left: "1rem",
	},
	header: {
		position: "relative",
		padding: "10px",
		backgroundColor: "#E0E9F0",
		borderTopLeftRadius: "10px",
		borderTopRightRadius: "10px",
		boxShadow: "inset 0px -3px 10px 0px rgba(0, 0, 0, 0.2)"
	},
	nav: {
		display: "flex",
		textAlign: "left"
	},
	title: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		fontSize: "0.58em"
	},
	button: {
		border: "none",
		borderRadius: "50%",
		height: "15px",
		width: "15px",
		marginRight: "5px"
	},
	buttonClose: {
		backgroundColor: "#EE5057"
	},
	buttonMinimize: {
		backgroundColor: "#DEC612"
	},
	buttonExpand: {
		backgroundColor: "#33B969"
	},
	main: {
		padding: "15px",
		backgroundColor: "#303539",
		color: "white",
		minHeight: "400px",
		fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
		fontSize: "0.58em",
		direction: "ltr",
		textAlign: "left",
		whiteSpace: "pre",
		wordSpacing: "normal",
		wordBreak: "normal",
		wordWrap: "normal",
		lineHeight: "1.5",
		tabSize: "4",
		hyphens: "none",
		height: "100%",
		maxHeight: "400px",
		overflow: "auto"
	},
	mainMaximized: {
		height: "100%",
		maxHeight: "none"
	}
};

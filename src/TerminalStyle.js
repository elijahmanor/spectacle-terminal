export default {
  container: {
    position: "relative",
    fontSize: "1.75vw",
    minWidth: "75vw",
    maxWidth: "75vw",
    left: "50%",
    transform: "translateX(-50%)"
  },
  containerMaximized: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    bottom: "5rem",
    left: "1rem",
    fontSize: "1.9vw"
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
    textAlign: "left",
    height: "2vw",
    alignItems: "center"
  },
  title: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "1.75vw"
  },
  button: {
    border: "none",
    borderRadius: "50%",
    height: "1.5vw",
    width: "1.5vw",
    marginRight: "1vw"
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
    height: "50vh",
    fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: "1.5",
    tabSize: "4",
    hyphens: "none",
    overflow: "auto"
  },
  mainMaximized: {
    height: "100%",
    maxHeight: "none"
  }
};

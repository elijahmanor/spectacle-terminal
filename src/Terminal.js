import React from "react";
import classNames from "classnames";
import style from "./TerminalStyle";

export default class Terminal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLine: {
        index: props.showFirstEntry ? 0 : null,
        iteration: null
      },
      isCollapsed: false,
      isMaximized: props.isMaximized,
      isAutoScroll: true
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.updateCurrentLine);
    document.addEventListener("keydown", this.toggleMaximize);
    this.terminalRef.closest(".spectacle-content").style.transform = "none";
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.mainRef) {
      if (this.state.isAutoScroll) {
        this.mainRef.scrollTop = this.mainRef.scrollHeight;
      } else if (this.state.currentLine.scrollTo) {
        this.mainRef.scrollTop = this.state.currentLine.scrollTo;
      }
    }
    this.terminalRef.closest(".spectacle-content").style.transform = "none";
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.updateCurrentLine);
    document.removeEventListener("keydown", this.toggleMaximize);
  }

  toggleMaximize = e => {
    if (e.altKey && e.keyCode === 77) {
      this[`handle${this.state.isMaximized ? "Minimize" : "Expand"}`]();
    }
  };

  goDown(line) {
    const { output } = this.props;
    if (line.index != null) {
      let newIndex = line.index < output.length - 1 ? line.index + 1 : line.index;
      let nextLine = line.iteration != null ? output[line.index] : output[newIndex];
      if (Array.isArray(nextLine)) {
        if (line.iteration != null) {
          line.iteration = line.iteration < nextLine.length - 1 ? ++line.iteration : null;
          if (line.iteration == null) {
            line.index = newIndex;
          }
        } else {
          line.index = newIndex;
          line.iteration = 0;
        }
        nextLine = line.iteration != null ? nextLine[line.iteration] : nextLine;
      } else {
        line.index = newIndex;
        line.iteration = null;
        nextLine = output[line.index];
      }
      line.isAutoScroll = nextLine.isAutoScroll != null ? nextLine.isAutoScroll : true;
      line.isSolo = nextLine.isSolo != null ? nextLine.isSolo : false;
      line.scrollTo = nextLine.scrollTo != null ? nextLine.scrollTo : null;
      line.note = nextLine.note;
    } else {
      line = { index: 0 };
      if (Array.isArray(output[line.index])) {
        line.iteration = 0;
      }
    }
    return line;
  }

  goUp(line) {
    const { showFirstEntry, output } = this.props;

    if (line.index > 0) {
      line.index--;
    } else if (line.index === 0) {
      line.index = showFirstEntry ? 0 : null;
    }
    const previousLine = output[line.index];
    if (previousLine) {
      line.isAutoScroll = previousLine.isAutoScroll != null ? previousLine.isAutoScroll : true;
      line.isSolo = previousLine.isSolo != null ? previousLine.isSolo : false;
      line.scrollTo = previousLine.scrollTo != null ? previousLine.scrollTo : null;
      line.note = previousLine.note;
    }

    return line;
  }

  updateCurrentLine = e => {
    let { currentLine } = this.state;
    if (e.keyCode === 40) {
      currentLine = this.goDown(currentLine);
    } else if (e.keyCode === 38) {
      currentLine = this.goUp(currentLine);
    }
    this.setState({
      currentLine,
      isAutoScroll: currentLine.isAutoScroll
    });
  };

  handleClose = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  handleMinimize = () => {
    this.setState({ isMaximized: false });
  };

  handleExpand = () => {
    this.setState({ isMaximized: true });
    this.terminalRef.closest(".spectacle-content").style.transform = "none";
    document.querySelector("button[data-radium]").closest("div").style.display = "none";
  };

  renderLines() {
    const { output } = this.props;
    const { currentLine } = this.state;

    if (!currentLine.isSolo) {
      return output.reduce((memo, line, index) => {
        if (
          (index <= currentLine.index && !line.isSolo) ||
          (currentLine.index === 0 && index === 0)
        ) {
          if (Array.isArray(line)) {
            const iteration =
              currentLine.iteration != null && currentLine.index === index
                ? currentLine.iteration
                : line.length - 1;
            memo.push(
              <div key={`${index}-${iteration}`} className="fragment">
                {line[iteration].output || line[iteration]}
              </div>
            );
          } else {
            memo.push(
              <div key={index} className="fragment">
                {line.output || line}
              </div>
            );
          }
        }
        return memo;
      }, []);
    } else {
      const line = output[currentLine.index];
      if (currentLine.scrollTo) {
        this.mainRef.scrollTop = currentLine.scrollTo;
      } else {
        this.mainRef.scrollTop = 0;
      }
      return (
        <div key={`${currentLine.index}-clear`} className="fragment">
          {line.output || line}
        </div>
      );
    }
  }

  renderMain() {
    const { output } = this.props;
    const { isMaximized, currentLine } = this.state;
    return (
      <section
        className="Terminal-main"
        ref={elem => {
          this.mainRef = elem;
        }}
        style={Object.assign({}, style.main, isMaximized ? style.mainMaximized : {})}
      >
        {currentLine.index != null && this.renderLines()}
      </section>
    );
  }

  renderNote() {
    const { currentLine } = this.state;
    return (
      <div
        className="Terminal-note"
        style={{
          position: "absolute",
          top: "1vw",
          left: "15vw",
          right: "15vw",
          backgroundColor: "white",
          borderRadius: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          border: "solid 1px #303539"
        }}
      >
        {currentLine.note}
      </div>
    );
  }

  render() {
    const { title } = this.props;
    const { isMaximized, isCollapsed, currentLine } = this.state;

    return (
      <div
        className="Terminal"
        style={!isMaximized ? style.container : style.containerMaximized}
        ref={elem => {
          this.terminalRef = elem;
        }}
      >
        <header style={style.header} className="Terminal-header">
          <nav style={style.nav}>
            <button onClick={this.handleClose} style={{ ...style.button, ...style.buttonClose }} />
            <button
              onClick={this.handleMinimize}
              style={{ ...style.button, ...style.buttonMinimize }}
            />
            <button
              onClick={this.handleExpand}
              style={{ ...style.button, ...style.buttonExpand }}
            />
          </nav>
          <div style={style.title}>{title}</div>
        </header>
        {!isCollapsed && this.renderMain()}
        {currentLine.note && this.renderNote()}
      </div>
    );
  }
}

Terminal.propTypes = {
  output: React.PropTypes.array,
  showFirstEntry: React.PropTypes.bool,
  isMaximized: false
};

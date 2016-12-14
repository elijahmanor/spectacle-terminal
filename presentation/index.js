// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Fill,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Import custom component
import Interactive from "../assets/interactive";

import CodeSlide from "spectacle-code-slide";
import Terminal from "spectacle-terminal";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");

const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  primary: "#ff4081"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["zoom", "slide"]} transitionDuration={500}>
          <Slide transition={["zoom"]} bgColor="primary">
            <Heading size={1} fit lineHeight={1} textColor="black">
              spectacle-terminal
            </Heading>
            <Heading size={1} lineHeight={1} fit>
              Terminal React Component for the Spectacle Slide Deck
            </Heading>
            <Link href="https://github.com/elijahmanor/spectacle-terminal">
              <Text bold caps textColor="tertiary">View on Github</Text>
            </Link>
            <Text textSize="1em" margin="20px 0px 0px" bold>Hit Your Right Arrow To Begin!</Text>
          </Slide>
          <Slide transition={["slide"]} bgColor="black" notes="You can even put notes on your slide. How awesome is that?">
            <Heading size={2} caps textColor="tertiary">Install</Heading>
            <CodePane
              lang="jsx"
              source={require("raw!../assets/install.example")}
              margin="20px auto"
            />
          </Slide>
          <Slide transition={["zoom", "fade"]} bgColor="primary" notes="<ul><li>talk about that</li><li>and that</li></ul>">
            <Heading size={2} caps textColor="tertiary">Usage</Heading>
            <CodePane
              lang="jsx"
              source={require("raw!../assets/usage.example")}
              margin="20px auto"
            />
          </Slide>
          <Slide transition={["spin", "slide"]} bgColor="primary">
            <Heading size={2} caps textColor="tertiary">Demo</Heading>
            <Text lineHeight={1.5}>Use Up &amp; Down Arrows</Text>
            <Terminal title="1. elijahm@elijahm: ~(zsh)" output={[
              "npm test",
              <div style={{ color: "#33B969"}}>TOTAL: 174 SUCCESS</div>,
              <div>
                <div>=============================== Coverage summary ===============================</div>
                <div style={{ color: "#DEC612"}}>Statements   : 51.29% ( 278/542 )</div>
                <div style={{ color: "#EE5057"}}>Branches     : 38.78% ( 95/245 )</div>
                <div style={{ color: "#EE5057"}}>Functions    : 46.21% ( 61/132 )</div>
                <div style={{ color: "#DEC612"}}>Lines        : 52.69% ( 274/520 )</div>
                <div>================================================================================</div>
              </div>]}
            />
          </Slide>
          <Slide transition={["spin", "slide"]} bgColor="tertiary">
            <Heading size={1} caps fit lineHeight={1.5} textColor="primary">
              Made by Elijah Manor
            </Heading>
            <Link href="http://twitter.com/elijahmanor">@elijahmanor</Link>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

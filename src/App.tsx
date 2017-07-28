import * as React from "react";
import { HandView, ButtonBar, GameView } from "./BjViews";
import { Hand, Card, Game } from "./bj";

interface AppProps {}

interface AppState {
  g: Game;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      g: new Game()
    };
  }

  eh = {
    onDealClick: () => {
      this.setState({ g: this.state.g.deal() });
    },
    onHitClick: () => {
      this.setState({ g: this.state.g.hit() });
    },
    onStayClick: () => {
      this.setState({ g: this.state.g.stay() });
    }
  };

  render() {
    return (
      <div>
        <GameView g={this.state.g} eh={this.eh} />
      </div>
    );
  }
}

export default App;

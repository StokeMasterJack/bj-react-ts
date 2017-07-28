import * as React from "react";
import { Hand, Game } from "./bj";

export function HandView({ h }: { h: Hand }) {
  const style = {
    margin: "1rem",
    padding: "1rem",
    background: "#DDDDDD",
    width: "10rem",
    height: "10rem"
  };
  return (
    <div style={style}>
      <div>
        <b>
          {h.name} Hand
        </b>
      </div>
      <div>
        {h.cards.map(c =>
          <div key={c.id}>
            {c.name}
          </div>
        )}
      </div>
      <div>
        <b>
          {h.points} Points
        </b>
      </div>
    </div>
  );
}

export interface Events {
  onDealClick: () => void;
  onHitClick: () => void;
  onStayClick: () => void;
}

export function ButtonBar({ eh }: { eh: Events }) {
  return (
    <div>
      <button onClick={eh.onDealClick}>Deal</button>
      <button onClick={eh.onHitClick}>Hit</button>
      <button onClick={eh.onStayClick}>Stay</button>
    </div>
  );
}




export function GameView({g, eh}:{g:Game,eh:Events}) {

    const style = {
        display: "flex"
    }

    return <div>
        <h1>Blackjack JS</h1>
        <ButtonBar eh={eh}/>
        <div style={style}>
            <HandView h={g.ph}/>
            <HandView h={g.dh}/>
        </div>
    </div>
}



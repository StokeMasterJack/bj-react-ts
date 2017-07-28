import * as React from "react";
import * as moment from "moment";
import * as Row from "jsxstyle/Row";
import * as Cookies from "js-cookie";
import * as ReactDOM from "react-dom";
import App from "./App";
import { f1 } from "./util-js";
import { f2 } from "./util-ts";
import { Card, Hand, Deck, Game } from "./bj";


// f1(2, 2, { a: true, b: 3 });
// f2(2, 2, { a: 22, b: 33 });

// let c1:Card | null | undefined;
// let c2:Card;

// const d = new Deck();
// const h1 = new Hand("Player");
// const c1 = d.take();
// if (c1) {
//   h1.add(c1);
// } else {
//   console.log("need to reshuffle");
// }

// const g = new Game();
// g.print();

console.log(moment().week());

Cookies.set("age","83");

ReactDOM.render(
  <Row>
    {Cookies.get("age")}
    <App />
    <App />
  </Row>,
  document.getElementById("root") as HTMLElement
);

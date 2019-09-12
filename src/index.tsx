import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const renderToDom = (location: Location) => {
    const pathname = location.pathname;
    ReactDOM.render(<App path={pathname}/>, document.getElementById("root"));
};

renderToDom(window.location);

window.addEventListener("popstate", () => {
    renderToDom(window.location);
});

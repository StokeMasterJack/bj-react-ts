import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


const renderToDom = (location: Location) => {

    const pathname = location.pathname;
    console.log("pathname: ", pathname);

    const params = new URLSearchParams(location.search);

    ReactDOM.render(<App path={pathname}/>, document.getElementById("root"));
};

renderToDom(window.location);

window.addEventListener("popstate", () => {
    renderToDom(window.location);
});

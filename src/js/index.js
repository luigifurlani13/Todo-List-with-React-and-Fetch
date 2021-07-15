//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include bootstrap npm library into the bundle
import "bootstrap";

//include your index.scss file into the bundle
import "../styles/index.scss";

//import your own components
import { Home } from "./component/home.js";

//render your react application

let secs = 1;

const interval = setInterval(() => {
	if (secs == 10) {
		clearInterval(interval);
	}
	ReactDOM.render(<Home seconds={secs} />, document.querySelector("#app"));
	secs++;
}, 1000);

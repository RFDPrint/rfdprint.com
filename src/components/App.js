import React from "react";
import logo from "../logo.svg";
import MenuNav from "./MenuNav.js";



function App() {
	return (
		<div className="App" id="react-content">
			<div id="nav-menu">
					</div>
			<header className="App-header wrapper">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					RFDPrint.com is being rebuilt to be faster, better and
					awesomer!! Thank you for your patience.
				</p>
				<h2>Call 815-797-9508 at anytime to speak to someone.</h2>
				<a
					className="App-link"
					href="https://www.alignable.com/rockford-il/rfdprint"
				>
					Click here to visit Alignable for more information on
					products and services of RFDPrint
				</a>
			</header>
		</div>
	);
}

export default App;

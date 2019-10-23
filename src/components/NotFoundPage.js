import React, { Component } from "react";
import logo from "../logo.svg";

export default class NotFoundPage extends Component {
	render() {
		return (
			<div>
				<div className="App" id="react-content">
					<div id="nav-menu"></div>
					<header className="App-header wrapper">
						<p>Not Found</p>

						<a
							className="App-link"
							href="https://www.alignable.com/rockford-il/rfdprint">
							Click here to visit Alignable for more information
							on products and services of RFDPrint
						</a>
					</header>
				</div>
			</div>
		);
	}
}

import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Header extends Component {
	render() {
		return (
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/approvals">Approvals</Link>
					</li>
				</ul>
			</div>
		);
	}
}

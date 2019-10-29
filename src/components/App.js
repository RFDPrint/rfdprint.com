import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
//import MenuNav from "./MenuNav.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Content from "./Content";
window.store = store;

export default class App extends Component {
	render() {
		return (
			<div>
				<Provider store={store}>
					<Router>
						<Header />
						<Content />
					</Router>
				</Provider>
			</div>
		);
	}
}

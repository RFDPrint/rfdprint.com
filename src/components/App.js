import React from "react";
//import MenuNav from "./MenuNav.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Approvals from "./Approvals";
import NotFoundPage from "./NotFoundPage";
import ApprovalDashboard from "./ApprovalDashboard";

import Content from "./Content";

function App() {
	return (
		<div>
			<Router>
				<Header />
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/approvals/:id" component={Approvals} />
					<Route
						path="/approvals"
						exact
						component={ApprovalDashboard}
					/>
					<Route component={NotFoundPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

import React, { Component } from "react";
import dbcloud from "../firebase/dbcloud";
import { connect } from "react-redux";
import { getData } from "../redux/actions";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter
} from "react-router-dom";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import Agreement from "./Agreement";
import Design from "./Design";
import ApprovalDashboard from "./ApprovalDashboard";
import Login from "./Login";

class Content extends Component {
	constructor(props) {
		super(props);
		this.state = { user: null };

		this.authListener = this.authListener.bind(this);
	}

	authListener() {
		dbcloud.auth().onAuthStateChanged(user => {
			if (user) {
				console.log(user);
				this.setState({ user });
			} else {
				this.setState({ user: null });
			}
		});
	}

	componentDidMount() {
		const dataLoaded = this.props.dataLoaded;
		if (!dataLoaded) {
			console.log("Exe getData function");
			this.props.getData();
		}
		this.authListener();
	}

	render() {
		console.log(this.props.agreements);
		console.log("Data Loaded? " + this.props.dataLoaded);
		return (
			<div>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/agreements/:id" component={Agreement} />
					<Route path="/designs/:id" component={Design} />
					<Route path="/designs/:id" component={Design} />
					<Route
						path="/agreements"
						exact
						component={ApprovalDashboard}
					/>
					<Route
						path="/designs"
						exact
						component={ApprovalDashboard}
					/>
					<Route
						path="/approvals"
						exact
						component={this.state.user ? ApprovalDashboard : Login}
					/>
					<Route component={NotFoundPage} />
				</Switch>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		agreements: state.agreements.data,
		designs: state.designs.data,
		dataLoaded: state.dataLoaded.data
	};
};
export default withRouter(
	connect(
		mapStateToProps,
		{ getData }
	)(Content)
);

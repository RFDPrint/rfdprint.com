import React, { Component } from "react";
import {
	BrowserRouter as Route,
	useParams,
	withRouter
} from "react-router-dom";
import dbcloud from "../firebase/dbcloud";

import AgreementCards from "./AgreementCards";
import DesignCards from "./DesignCards";
import Document from "./DocumentContent";
import DocumentSubmitForm from "./DocumentSubmitForm";

import { connect } from "react-redux";
import { getData } from "../redux/actions";

class ApprovalDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	logout() {
		dbcloud.auth().signOut();
	}

	render() {
		const dataLoaded = this.props.dataLoaded;
		return dataLoaded ? (
			<div>
				<Document
					leftCol={<AgreementCards data={this.props.agreements} />}
					rightCol={<DesignCards data={this.props.designs} />}
				/>
				<DocumentSubmitForm />;
				<div style={{ textAlign: "center" }}>
					<h1>You Are Logged In</h1>
					<button onClick={this.logout}>Logout</button>
				</div>
			</div>
		) : null;
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
	)(ApprovalDashboard)
);

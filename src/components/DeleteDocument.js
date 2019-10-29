import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteAgreement, deleteDesign } from "../redux/actions";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	withRouter
} from "react-router-dom";

class DeleteDocument extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	deleteDocument() {}

	render() {
		return (
			<div>
				<button onClick={this.props.deleteDocument()}>
					Delete Document
				</button>
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
		{ deleteAgreement, deleteDesign }
	)(DeleteDocument)
);

import React, { Component } from "react";
import {
	BrowserRouter as Route,
	useParams,
	withRouter
} from "react-router-dom";

import { connect } from "react-redux";
import { deleteAgreement } from "../redux/actions";

import NotFoundPage from "./NotFoundPage";
import DocumentHeader from "./DocumentHeader";
import DocumentContent from "./DocumentContent";
import DeleteDocument from "./DeleteDocument";
import HomePage from "./HomePage";

import templateData from "../data/TemplateData.json";
import { parse_colomun_data, template_dynamic_input } from "./util";

class Agreement extends Component {
	constructor(props) {
		super(props);

		this.state = { data: templateData };
	}

	render() {
		const { id } = this.props.match.params;

		let activeRecord = [];
		activeRecord = this.props.agreements.filter(item => item.id == id);
		if (activeRecord.length > 0) {
			return activeRecord.map(doc => {
				const stringsToReplace = {
					PRODUCT: doc.product,
					DURATION: doc.duration,
					PRICE: doc.price
				};
				return (
					<div>
						<DocumentHeader
							docId={doc.id}
							title={doc.title}
							subtitle={doc.subTitle}
							approverName={doc.name}
						/>
						<DocumentContent
							leftCol={parse_colomun_data(
								this.state.data.leftColumn,
								stringsToReplace
							)}
							rightCol={parse_colomun_data(
								this.state.data.rightColumn,
								stringsToReplace
							)}
						/>
						<div>
							<button
								onClick={() =>
									this.props.deleteAgreement(doc.id)
								}>
								Delete Document
							</button>
						</div>
					</div>
				);
			});
		} else {
			return <HomePage />;
		}
	}
}
const mapStateToProps = state => {
	return {
		agreements: state.agreements.data
	};
};
export default withRouter(
	connect(
		mapStateToProps,
		{ deleteAgreement }
	)(Agreement)
);

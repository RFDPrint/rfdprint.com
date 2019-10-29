import React, { Component } from "react";
import {
	BrowserRouter as Route,
	useParams,
	withRouter
} from "react-router-dom";

/*Components*/
import Document from "./Document";
import NotFoundPage from "./NotFoundPage";
import Design from "./Design";
import DocumentHeader from "./DocumentHeader";

/*Template Data*/
import templateData from "../data/TemplateData.json";

/*Functions*/
import { parse_colomun_data, template_dynamic_input } from "./util";
import { firebaseFindParam } from "../firebase/dataRetrieval";

import { connect } from "react-redux";

const mapStateToProps = state => {
	return { agreements: state.agreements };
};

class Agreement extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: templateData,
			redirect: false,
			templateParts: [],
			documentInfo: [],
			templateReplaceStrings: {},
			foundRecordByParam: []
		};
	}

	getUniqueDocumentData() {
		const { id } = this.props.match.params;
		firebaseFindParam(this.setState.bind(this), id, "agreements");
	}

	componentDidMount() {
		this.getUniqueDocumentData();
		template_dynamic_input(this.setState.bind(this), "standard");
	}

	render() {
		let docInfo = [];
		let templatePart = [];
		docInfo = this.state.documentInfo;
		templatePart = this.state.templateParts;

		const Agreement = ({ agreements }) => (
			<div>
				<ul>
					{agreements.map(doc => (
						<li key={doc.id}>{doc.title}</li>
					))}
				</ul>
			</div>
		);

		if (!this.state.redirect) {
			return (
				<div key="doc.id">
					<div className="wrapper">
						<DocumentHeader
							title={this.props.agreements.title}
							subtitle={templatePart.subTitle}
							approverName={docInfo.name}
						/>
						<Document
							key={docInfo.id}
							leftCol={parse_colomun_data(
								this.state.data.leftColumn,
								this.state.templateReplaceStrings
							)}
							rightCol={parse_colomun_data(
								this.state.data.rightColumn,
								this.state.templateReplaceStrings
							)}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<NotFoundPage />
				</div>
			);
		}
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		null
	)(Agreement)
);

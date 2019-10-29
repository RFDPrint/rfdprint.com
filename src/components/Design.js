import React, { Component } from "react";
import {
	BrowserRouter as Route,
	useParams,
	withRouter
} from "react-router-dom";
import dbcloud from "../firebase/dbcloud";

/*Components*/
import Document from "./Document";
import NotFoundPage from "./NotFoundPage";
import DesignImage from "./DesignImage";
import DocumentHeader from "./DocumentHeader";

/*Template Data*/
import templateData from "../data/TemplateData.json";

/*Functions*/
import { parse_colomun_data, template_dynamic_input } from "./util";
import { firebaseFindParam } from "../firebase/dataRetrieval";

class Design extends Component {
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

	firebaseFindParam = id => {
		let aprvDocument = [];
		let templateParts = {};
		let docInformation = {};
		const db = dbcloud.firestore();

		db.collection("designs")
			.where("id", "==", id)
			.limit(1)
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					console.log("No matching documents.");
					this.setState({
						redirect: true
					});
					return;
				}

				snapshot.forEach(doc => {
					aprvDocument.push(doc.data());
				});
				templateParts = {
					type: aprvDocument[0].templateType,
					title: aprvDocument[0].title
				};
				docInformation = {
					id: aprvDocument[0].id,
					imageURL: aprvDocument[0].imageURL
				};
				this.setState({
					signature: aprvDocument,
					documentInfo: docInformation,
					templateParts: templateParts
				});
			})
			.catch(err => {
				console.log("Error getting documents", err);
			});
	};

	getUniqueDocumentData() {
		const { id } = this.props.match.params;
		this.firebaseFindParam(id);
	}

	componentDidMount() {
		this.getUniqueDocumentData();
		template_dynamic_input(
			this.setState.bind(this),
			this.state.templateParts.type
		);
	}

	render() {
		let docInfo = [];
		let templatePart = [];
		docInfo = this.state.documentInfo;
		templatePart = this.state.templateParts;

		if (!this.state.redirect) {
			return (
				<div key="doc.id">
					<div className="wrapper">
						<DocumentHeader
							title={templatePart.title}
							subtitle={templatePart.subTitle}
							approverName={docInfo.name}
						/>
						<DesignImage imageURL={docInfo.imageURL} />
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
export default withRouter(Design);
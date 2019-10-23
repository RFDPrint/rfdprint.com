import React, { Component } from "react";
import {
	BrowserRouter as Route,
	useParams,
	withRouter
} from "react-router-dom";

/*Components*/
import dbcloud from "../firebase/dbcloud";
import Document from "./Document";
import NotFoundPage from "./NotFoundPage";
import Design from "./Design";
import DocumentHeader from "./DocumentHeader";

/*Template Data*/
import templateData from "../data/TemplateData.json";
import templateReplace from "../data/StringsToReplace.json";

/*Functions*/
import { parse_colomun_data } from "./util";
import { firebaseFindParam } from "../firebase/dataRetrieval";

class Approval extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: templateData,
			redirect: false,
			templateParts: [],
			documentInfo: [],
			templateReplaceStrings: {}
		};
	}

	getImage(image) {
		const storage = dbcloud.storage().ref();
		let { state } = this;
		storage
			.child(`images/approvals/${image}.png`)
			.getDownloadURL()
			.then(url => {
				state["image"] = url;
				this.setState(state);
			})
			.catch(error => {
				console.log(error);
			});
	}

	template_dynamic_input(args) {
		const standardReplace = templateReplace.standardStringsToReplace;
		const shortReplace = templateReplace.shortStringsToReplace;

		switch (args.type) {
			case "standard":
				this.setState({
					templateReplaceStrings: standardReplace
				});
				break;
			case "short":
				this.setState({
					templateReplaceStrings: shortReplace
				});
				break;
			default:
				this.setState({
					templateReplaceStrings: standardReplace
				});
		}
	}

	noRecordFound() {
		this.setState({
			redirect: true
		});
	}

	firebaseLoad() {
		const { id } = this.props.match.params;
		let aprvDocument = [];
		let templateParts = {};
		let docInformation = {};
		const db = dbcloud.firestore();

		let citiesRef = db.collection("approval-docs");
		let query = citiesRef
			.where("id", "==", id)
			.limit(1)
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					console.log("No matching documents.");
					this.noRecordFound();
					return;
				}

				snapshot.forEach(doc => {
					aprvDocument.push(doc.data());
				});

				templateParts = {
					type: aprvDocument[0].templateType,
					title: aprvDocument[0].title,
					subTitle: aprvDocument[0].subtitle
				};
				docInformation = {
					id: aprvDocument[0].id,
					date: aprvDocument[0].date,
					name: aprvDocument[0].name,
					signature: aprvDocument[0].signature,
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
	}

	componentDidMount() {
		this.firebaseLoad();
		this.template_dynamic_input(this.state.templateParts);
	}

	render() {
		const { id } = this.props.match.params;
		//const { path, url } = this.props.match;
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
						<Design imageURL={docInfo.imageURL} />
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
export default withRouter(Approval);

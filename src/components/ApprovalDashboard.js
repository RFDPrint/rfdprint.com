import React, { Component } from "react";
import {
	BrowserRouter as Route,
	useParams,
	withRouter,
	Link
} from "react-router-dom";
import dbcloud from "../firebase/dbcloud";

export default class ApprovalDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};
		this.firebaseLoad();
	}
	firebaseLoad() {
		let documents = [];
		const db = dbcloud.firestore();

		db.settings({});

		db.collection("approval-docs")
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(doc => {
					documents.push(doc.data());
				});
				this.setState({
					data: documents
				});
			});
	}

	componentDidMount() {}

	render() {
		const { path, url } = this.props.match;
		return (
			<div>
				{this.state.data.map(doc => (
					<ul>
						<li>
							<Link to={path + "/" + doc.id}>{doc.title}</Link>
						</li>
					</ul>
				))}
			</div>
		);
	}
}

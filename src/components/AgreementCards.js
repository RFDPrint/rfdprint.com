import React, { Component } from "react";
import { connect } from "react-redux";
import {
	BrowserRouter as Route,
	useParams,
	withRouter,
	Link
} from "react-router-dom";

class AgreementCards extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<ul>
					{this.props.agreements.map(doc => (
						<li key={doc.id}>
							<Link id={doc.id} to={"/agreements/" + doc.id}>
								{doc.title}{" "}
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { agreements: state.agreements.data };
};

export default withRouter(
	connect(
		mapStateToProps,
		null
	)(AgreementCards)
);

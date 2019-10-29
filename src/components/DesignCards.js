import React, { Component } from "react";
import { connect } from "react-redux";
import {
	BrowserRouter as Route,
	useParams,
	withRouter,
	Link
} from "react-router-dom";

class DesignCards extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<ul>
					{this.props.designs.map(doc => (
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
	return { designs: state.designs.data };
};

export default withRouter(
	connect(
		mapStateToProps,
		null
	)(DesignCards)
);

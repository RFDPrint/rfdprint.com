import React, { Component } from "react";

export default class DocumentHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="document__header">
				<h1 className="document__header__title">{this.props.title}</h1>
				<h3 className="document__header__subtitle">
					{this.props.subtitle}
				</h3>
				<h3 className="document__header__subtitle">
					Approver: {this.props.approverName}
				</h3>
			</div>
		);
	}
}

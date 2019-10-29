import React, { Component } from "react";

export default class DesignImage extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<img
					className="design__image"
					src={this.props.imageURL}
					alt={this.props.imageAlt}
				/>
			</div>
		);
	}
}

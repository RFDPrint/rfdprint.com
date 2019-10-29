import React, { Component } from "react";

export default class DocumentContent extends Component {
	render() {
		return (
			<div>
				<div className="document">
					<div className="document__left-col">
						{this.props.leftCol}
					</div>
					<div className="document__right-col">
						{this.props.rightCol}
					</div>
				</div>
			</div>
		);
	}
}

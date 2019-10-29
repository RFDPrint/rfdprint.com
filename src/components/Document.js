import React, { Component } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentContent from "./DocumentContent";
export default class Document extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<DocumentHeader />
				<DocumentContent />
			</div>
		);
	}
}

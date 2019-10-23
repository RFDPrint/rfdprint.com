import React, { Component } from "react";
import info from "../temp-date.json";

export default class LeftColData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: info
		};
	}
	render() {
		return (
			<div>
				{this.state.data.leftColumn.map(item => {
					<h1>Title</h1>;
					item;
				})}
			</div>
		);
	}
}

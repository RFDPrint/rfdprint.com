import React, { Component } from "react";
import sanitizeHtml from "sanitize-html";

class SanitizeHTML extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.events();
	}
	events() {
		this.theProcess();
	}
	theProcess() {
		const unprocessed = "<p>Test Test Test</p>";
		const clean = sanitizeHtml(unprocessed, {
			allowedTags: ["b", "i", "em", "strong", "a"],
			allowedAttributes: {
				a: ["href"]
			}
		});
		return <div dangerouslySetInnerHTML={{ __html: clean }} />;
	}
}
export default SanitizeHTML;

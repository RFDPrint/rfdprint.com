import React from "react";
import sanitizeHtml from "sanitize-html";
import templateReplace from "../data/StringsToReplace.json";

export const template_dynamic_input = (setState, templateType) => {
	const standardReplace = templateReplace.standardStringsToReplace;
	const shortReplace = templateReplace.shortStringsToReplace;
	let templateStringsToReplace = {};
	switch (templateType) {
		case "standard":
			templateStringsToReplace = standardReplace;
			break;
		case "short":
			templateStringsToReplace = shortReplace;

			break;
		default:
			templateStringsToReplace = standardReplace;
	}
	setState({
		templateReplaceStrings: templateStringsToReplace
	});
};

export const processHTML = html => {
	const unprocessed = html;
	const clean = sanitizeHtml(unprocessed, {
		allowedTags: ["h1", "h2", "h3", "p", "strong"],
		allowedAttributes: {}
	});
	return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};

export const replaceAll = (str, mapObj) => {
	if (mapObj) {
		let result = new RegExp(Object.keys(mapObj).join("|"), "g");

		return str.replace(result, function(matched) {
			return mapObj[matched];
		});
	}
};

const template_string_replace = (content, templateReplaceStrings) => {
	var replacedString = "";
	replacedString = replaceAll(content, templateReplaceStrings);
	return replacedString;
};

export const parse_colomun_data = (columnData, templateReplaceStrings) => {
	var data = [];
	var colomnParagraphs = [];
	columnData.map(item => {
		data = `<h3> ${item.header} </h3>
				 <p> ${item.text} </p>`;

		colomnParagraphs.push(data);
	});
	colomnParagraphs = colomnParagraphs.join(" ");
	let output = "";
	output = template_string_replace(colomnParagraphs, templateReplaceStrings);
	output = processHTML(output);

	return output;
};

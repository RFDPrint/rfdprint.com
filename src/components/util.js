import React from "react";
import sanitizeHtml from "sanitize-html";

export const processHTML = html => {
	const unprocessed = html;
	const clean = sanitizeHtml(unprocessed, {
		allowedTags: ["h1", "h2", "h3", "p", "strong"],
		allowedAttributes: {}
	});
	return <div dangerouslySetInnerHTML={{ __html: clean }} />;
};

export const replaceAll = (str, mapObj) => {
	let result = new RegExp(Object.keys(mapObj).join("|"), "g");

	return str.replace(result, function(matched) {
		return mapObj[matched];
	});
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

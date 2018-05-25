var asciidoctor = require('asciidoctor.js')();
require('asciidoctor-docbook.js')();

var fs = require('fs');

var nodePandoc = require('node-pandoc')

// Take file name as parameter, load it somehow.
var fileName = process.argv[2];
if (typeof (fileName) == "undefined") {
	console.log("Error - no arguments specified.");
	console.log('Parameter is: ' + fileName);
	return;
}

fs.readFile(__dirname + '/' + fileName, function (err, data) {
	if (err) {
		throw err;
	}
	// console.log(data.toString());
	var docbook = asciidoctor.convert(data, {
		attributes: {
			backend: 'docbook5',
			doctype: 'book'
		},
		header_footer: true
	});
	// console.log(docbook);


	let src = './word.docx';

	// Arguments can be either a single String or in an Array
	let args = '-f docbook -t epub -o output/200.epub';

	// Set your callback function
	const callback = (err, result) => {

		if (err) console.error('Oh Nos: ', err)
		return console.log(result), result
	}

	// Call pandoc
	nodePandoc(docbook, args, callback);
});

var asciidoctor = require('asciidoctor.js')();
require('asciidoctor-docbook.js')();

var fs = require('fs');

var nodePandoc = require('node-pandoc')

// Take file name as parameter, load it somehow.
var filePath = process.argv[2];
var newFileName = process.argv[3];

if (typeof (filePath) == "undefined" || typeof (newFileName) == "undefined") {
	console.log("Error - missing arguments.");
	return;
}

fs.readFile(__dirname + '/' + filePath, function (err, data) {
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
	let args = '-f docbook -t epub -o output/' + newFileName + '.epub';

	// Call pandoc
	nodePandoc(docbook, args, (err) => {
		if (err) console.log('Error during conversion!');
		console.log('Done!');
	});
});

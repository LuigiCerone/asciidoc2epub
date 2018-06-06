var asciidoctor = require('asciidoctor.js')();
require('asciidoctor-docbook.js')();

var fs = require('fs');

var nodePandoc = require('node-pandoc');
var path = require("path");

// Take file name as parameter and the file's name.
var filePath = process.argv[2];
var newFileName = process.argv[3];

if (typeof (filePath) == "undefined") {
	console.log("Error - missing arguments.");
	return;
}

// If epub's name is not specified use the name of asciidoc book.
if (typeof (newFileName) == "undefined") {
	newFileName = path.basename(filePath, path.extname(filePath));
	console.log(`New file will be named ${newFileName}.epub`);
}

fs.readFile(__dirname + '/' + filePath, (err, data) => {
	if (err) throw err;
	// console.log(data.toString());
	var docbook = asciidoctor.convert(data, {
		attributes: {
			backend: 'docbook5',
			doctype: 'book'
		},
		header_footer: true
	});
	// console.log(docbook);

	// Check directory existence.
	let directory = __dirname + '/' + 'output/';
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory);
	}

	// Arguments can be either a single String or in an Array.
	let args = '-f docbook -t epub -o output/' + newFileName + '.epub --quiet';

	// Call pandoc
	nodePandoc(docbook, args, (err) => {
		err ? console.log('Error during conversion!') : console.log('Done!');
	});
});

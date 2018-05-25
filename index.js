var asciidoctor = require('asciidoctor.js')();
require('asciidoctor-docbook.js')();

var fs = require('fs');
var pandoc = require('simple-pandoc');


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

	fs.writeFile("output/199.epub", docbook, function (err) {
		if (err) {
			return console.log(err);
		}

		var docbook2epub = pandoc('docbook', 'epub');
		const inputStream = fs.createReadStream('output/199.epub');
		const outputStream = fs.createWriteStream('index.md');
		docbook2epub.stream(inputStream).pipe(outputStream);
		// docbook2epub(docbook).then((epub) => {
		// 	let text = epub.toString();
	});



	// 	// const outputStream = fs.createWriteStream('output/2.epub');
	// 	// docbook2epub.stream(text).pipe(outputStream);
	// 	// console.log(text);

	// });
});

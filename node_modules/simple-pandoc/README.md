# simple-pandoc [![Build Status](https://travis-ci.org/noraesae/simple-pandoc.svg?branch=master)](https://travis-ci.org/noraesae/simple-pandoc)

A thin and simple pandoc wrapper function

## Introduction

`simple-pandoc` provides probably the thinest and simplest Node.js binding for
[pandoc](http://pandoc.org). It just wraps the [`pandoc`](http://pandoc.org/README.html)
command into JavaScript APIs.

It focuses on a very simple use case, and may not provide complicated
functionalities. If they are needed, please check out
[other libraries](https://www.npmjs.com/browse/keyword/pandoc) on npm.

## Install

`simple-pandoc` doesn't provide `pandoc` in itself. Please be sure to install
pandoc in your machine and place the binary in `$PATH`. To install pandoc,
please refer to the [Installing](http://pandoc.org/installing.html) section
in the pandoc documentation.

To install `simple-pandoc`, use npm.

```
$ npm install simple-pandoc
```

## API

Please import `simple-pandoc` with ES Modules or CommonJS.

```js
const pandoc = require('simple-pandoc');
```

##### Initialize a converter

`pandoc(from, to)`

- `from`: `String` a format specified in the pandoc [documentation](http://pandoc.org/README.html#general-options)
- `to`: `String` a format specified in the pandoc [documentation](http://pandoc.org/README.html#general-options)


- return: `Function` a converter function

Example:

```js
const htmlToMarkdown = pandoc('html', 'markdown');
```

##### Convert with a Promise API

`converter(content)`

- `content`: `String|Buffer` content in the `from` format to be converted

- return: `Promise<Buffer>` promised content in the `to` format

Example:

```js
const htmlToMarkdown = pandoc('html', 'markdown');

htmlToMarkdown(fs.readFileSync('index.html'))
  .then(md => {
    console.log(md.toString());
  });
```

Even better with [async/await](https://github.com/tc39/ecmascript-asyncawait):

```js
const htmlToMarkdown = pandoc('html', 'markdown');

async function convert() {
  const html = fs.readFileSync('index.html');
  const md = await htmlToMarkdown(html);
  console.log(md.toString());
}

convert();
```

##### Convert with streams

`converter.stream(readStream)`

- `readStream`: [`Readable`](https://nodejs.org/api/stream.html#stream_class_stream_readable)
  a stream conveying content in the `from` format

- return: [`Readable`](https://nodejs.org/api/stream.html#stream_class_stream_readable)
  a stream conveying converted content in the `to` format

Example:

```js
const htmlToMarkdown = pandoc('html', 'markdown');

const inputStream = fs.createReadStream('index.html');
const outputStream = fs.createWriteStream('index.md');
htmlToMarkdown.stream(inputStream).pipe(outputStream);
```

## License

MIT © [Jun](http://github.com/noraesae)
